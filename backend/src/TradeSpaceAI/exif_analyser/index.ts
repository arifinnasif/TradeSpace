import { ExifImage } from 'exif';
import got from 'got';

const image_url = 'https://firebasestorage.googleapis.com/v0/b/tradespace-89597.appspot.com/o/uploads%2Fads%2FmyImage.jpg?alt=media&token=5be3bbd4-de3f-4094-8f52-31e48c1f2641'

import Request from 'request';
const request = Request.defaults({ encoding: null });



// returns true if exif data is present ie image not downloaded from internet or tampered with
const check_exif = async (image_url: string) => {
    let model: string = '';
    let make: string = '';
    request.get(image_url, (err: any, res: any, body: any) => {
        // got the image with into a buffer named body
        try {

            const foo = new ExifImage(body, (error: { message: string; }, exif_data: any) => {
                if (error) {
                    model = '';
                    make = '';
                }
                else {
                    model = exif_data.image.Model;
                    make = exif_data.image.Make;
                    // return make;
                }

            });

            console.log(foo)
        } catch (error: any) {
            model = '';
            make = '';
        }
    });

    if (model === '' || make === '') {
        return false;
    } else {
        return true;
    }
}

console.log(check_exif(image_url))

