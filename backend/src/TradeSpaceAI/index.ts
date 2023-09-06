import { category_analyser } from "./category_analyser";
import { exif_analyser } from "./exif_analyser";
import { nlp_analyser } from "./natural_language_analyser";

export const ai_judge = async (ad: any) => {
    const ad_image_url = ad.image1;
    const ad_category = ad.category;
    const ad_description = ad.description;
    const ad_freshness_threshold_millis = 1000 * 60 * 60 * 24 * 1; // 1 day

    const exif_verdict = await exif_analyser(ad_image_url, ad_freshness_threshold_millis);
    const category_verdict = await category_analyser(ad_image_url, ad_category);
    const nlp_verdict = await nlp_analyser(ad_description);

    const ai_verdict = {
        exif_verdict: exif_verdict,
        category_verdict: category_verdict,
        nlp_verdict: nlp_verdict
    }


    return ai_verdict;
}
