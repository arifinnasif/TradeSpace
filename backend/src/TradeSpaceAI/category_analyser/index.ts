import { classifier } from './classifier';

export const threat_score_categorical_mismatch = 10;

export const category_analyser = async (image_url: string, category_str: string) => {

    const best_probability = await classifier(image_url, category_str);



    // console.log(exif_data);

    const category_verdict = {
        specified_category_probability: best_probability
    }

    // console.log(exif_verdict);

    return {
        threat_score: threat_score_categorical_mismatch * (1 - best_probability),
        verdict: category_verdict,
    };

}