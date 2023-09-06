import { detect_harmful_link } from './harmful_link_detector';
import { detect_profanity } from './profanity_detector';

export const threat_score_profanity = 3;
export const threat_score_harmful_link = 5;

export const nlp_analyser = (text_to_check: string) => {
    let threat_score = 0;

    const nlp_verdict = {
        has_banned_words: detect_profanity(text_to_check),
        has_harmful_links: detect_harmful_link(text_to_check)
    }

    if (nlp_verdict.has_banned_words) {
        threat_score += threat_score_profanity;
    }

    if (nlp_verdict.has_harmful_links) {
        threat_score += threat_score_harmful_link;
    }


    return {
        threat_score: threat_score,
        verdict: nlp_verdict
    };

}