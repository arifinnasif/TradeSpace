const image_url = 'https://firebasestorage.googleapis.com/v0/b/tradespace-89597.appspot.com/o/uploads%2Fads%2FmyImage.jpg?alt=media&token=5be3bbd4-de3f-4094-8f52-31e48c1f2641'
// const image_url = 'https://firebasestorage.googleapis.com/v0/b/tradespace-89597.appspot.com/o/uploads%2Fads%2F0ac14cb8-cca3-4e40-abc9-151add505e4d.jpg?alt=media&token=6828bf03-b48f-4a45-81d7-62d3d7c7f68f'


import { extract_necessary_exif } from './exif_extractor';

export const exif_analyser = async () => {

    const exif_data = await extract_necessary_exif(image_url);



    console.log(exif_data);

}


exif_analyser();