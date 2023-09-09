import {
    category_analyser,
    threat_score_categorical_mismatch
} from "./category_analyser";

import {
    exif_analyser,
    threat_score_downloaded_image,
    threat_score_stale_image,
    threat_score_tampered_image
} from "./exif_analyser";

import {
    nlp_analyser,
    threat_score_harmful_link,
    threat_score_profanity
} from "./natural_language_analyser";

import { load_words } from "./natural_language_analyser/profanity_detector";
import { load_model } from "./category_analyser/mobilenet";


// active loader
export const initiate_ts_ai = async () => {
    if (!process.env.ENABLE_TRADESPACE_AI) {
        console.log('\x1b[31m%s\x1b[0m', 'TradeSpaceAI Did Not Turn On 🪫');
        console.log('\x1b[0m', '');
        return;
    }
    await load_model();
    load_words();
    console.log('\x1b[36m%s\x1b[0m', 'TradeSpaceAI Turned On ⚡');
    console.log('\x1b[0m', '');
}



// AI Verdict
export const ai_judge = async (ad: any) => {
    if (!process.env.ENABLE_TRADESPACE_AI) {
        return {
            weighted_threat_score: -1,
            exif_verdict: null,
            category_verdict: null,
            nlp_verdict: null
        }
    }

    let total_possible_threat_score = 0;

    if (ad.is_sell_ad) {
        total_possible_threat_score =
            threat_score_downloaded_image
            + threat_score_stale_image
            + threat_score_tampered_image
            + threat_score_categorical_mismatch;
    }

    total_possible_threat_score += threat_score_profanity;
    total_possible_threat_score += threat_score_harmful_link;


    const ad_image_url = ad.images[0];
    const ad_category = ad.category_name;
    const ad_description = ad.description;
    const ad_freshness_threshold_millis = 1000 * 60 * 60 * 24 * 1; // 1 day

    let exif_verdict = null;
    let category_verdict = null;
    let nlp_verdict = null;

    let weighted_threat_score = 0;

    if (ad.is_sell_ad) {
        exif_verdict = await exif_analyser(ad_image_url, ad_freshness_threshold_millis);
        weighted_threat_score += exif_verdict.threat_score;
        category_verdict = await category_analyser(ad_image_url, ad_category);
        weighted_threat_score += category_verdict.threat_score;
    }
    nlp_verdict = await nlp_analyser(ad_description);
    weighted_threat_score += nlp_verdict.threat_score;

    weighted_threat_score = weighted_threat_score / total_possible_threat_score;

    const ai_verdict = {
        weighted_threat_score: weighted_threat_score,
        exif_verdict: exif_verdict.verdict,
        category_verdict: category_verdict.verdict,
        nlp_verdict: nlp_verdict.verdict
    }


    return ai_verdict;
}
