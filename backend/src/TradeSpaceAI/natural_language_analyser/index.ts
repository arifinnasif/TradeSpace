import { detect_harmful_link } from './harmful_link_detector';
import { detect_profanity } from './profanity_detector';

export const nlp_analyser = (text_to_check: string) => {


    const nlp_verdict = {
        has_banned_words: detect_profanity(text_to_check),
        has_harmful_links: detect_harmful_link(text_to_check)
    }


    return nlp_verdict;

}