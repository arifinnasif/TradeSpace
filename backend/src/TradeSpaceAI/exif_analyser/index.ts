import { extract_necessary_exif } from './exif_extractor';

const threat_score_downloaded_image = 10;
const threat_score_tampered_image = 8;
const threat_score_stale_image = 5;

export const exif_analyser = async (image_url: string, freshness_threshold_millis: number) => {

    const exif_data = await extract_necessary_exif(image_url);

    let threat_score = 0;

    // console.log(exif_data);

    const exif_verdict = {
        is_image_downloaded: exif_data.make === undefined || exif_data.model === undefined || exif_data.image_software === undefined,
        is_image_tampered: exif_data.create_date > exif_data.modify_date || exif_data.create_date < exif_data.modify_date,
        is_image_stale: (exif_data.create_date.getTime() - (new Date().getTime())) > freshness_threshold_millis
    }

    // console.log(exif_verdict);

    if (exif_verdict.is_image_downloaded) {
        threat_score += threat_score_downloaded_image;
    }

    if (exif_verdict.is_image_tampered) {
        threat_score += threat_score_tampered_image;
    }

    if (exif_verdict.is_image_stale) {
        threat_score += threat_score_stale_image;
    }

    return {
        threat_score: threat_score,
        verdict: exif_verdict,
    };

}