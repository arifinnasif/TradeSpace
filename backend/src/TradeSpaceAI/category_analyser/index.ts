import { classifier } from './classifier';

export const exif_analyser = async (image_url: string, category_str: string) => {

    const best_probability = await classifier(image_url, category_str);



    // console.log(exif_data);

    const category_verdict = {
        specified_category_probability: best_probability
    }

    // console.log(exif_verdict);

    return category_verdict;

}