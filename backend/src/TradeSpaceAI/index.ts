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
    load_model();
    load_words();
}



// AI Verdict
export const ai_judge = async (ad: any) => {

    const total_possible_threat_score =
        threat_score_downloaded_image
        + threat_score_stale_image
        + threat_score_tampered_image
        + threat_score_profanity
        + threat_score_harmful_link
        + threat_score_categorical_mismatch;

    const ad_image_url = ad.image1;
    const ad_category = ad.category;
    const ad_description = ad.description;
    const ad_freshness_threshold_millis = 1000 * 60 * 60 * 24 * 1; // 1 day

    const exif_verdict = await exif_analyser(ad_image_url, ad_freshness_threshold_millis);
    const category_verdict = await category_analyser(ad_image_url, ad_category);
    const nlp_verdict = await nlp_analyser(ad_description);

    const weighted_threat_score = (
        exif_verdict.threat_score
        + category_verdict.threat_score
        + nlp_verdict.threat_score)
        /
        total_possible_threat_score;

    const ai_verdict = {
        weighted_threat_score: weighted_threat_score,
        exif_verdict: exif_verdict.verdict,
        category_verdict: category_verdict.verdict,
        nlp_verdict: nlp_verdict.verdict
    }


    return ai_verdict;
}
