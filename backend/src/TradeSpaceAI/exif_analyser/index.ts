import { ExifImage, ExifData } from 'exif';
import got from 'got';

const image_url = 'https://firebasestorage.googleapis.com/v0/b/tradespace-89597.appspot.com/o/uploads%2Fads%2FmyImage.jpg?alt=media&token=5be3bbd4-de3f-4094-8f52-31e48c1f2641'
// const image_url = 'https://firebasestorage.googleapis.com/v0/b/tradespace-89597.appspot.com/o/uploads%2Fads%2F0ac14cb8-cca3-4e40-abc9-151add505e4d.jpg?alt=media&token=6828bf03-b48f-4a45-81d7-62d3d7c7f68f'

import Request from 'request';
const request = Request.defaults({ encoding: null });
import axios from 'axios';
// import fetch from "node-fetch";

const ExifImageWrapper = (buffer: Buffer) => {
    return new Promise<ExifData>((resolve, reject) => {
        new ExifImage(buffer, (error: { message: string; }, exif_data: any) => {
            if (error) {
                reject(error.message)
            }
            else {
                resolve(exif_data)
            }
        });
    })
}



// returns true if exif data is present ie image not downloaded from internet or tampered with
const check_exif = async (image_url: string) => {
    let model: string = '';
    let make: string = '';

    const response = await axios.get(image_url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, "utf-8");


    // let fimg = await fetch(image_url)
    // let buffer = Buffer.from(await fimg.arrayBuffer())
    // console.log(buffer)
    // request.get(image_url, (err: any, res: any, body: any) => {
    // got the image with into a buffer named body
    try {

        // new ExifImage(buffer, (error: { message: string; }, exif_data: any) => {
        //     if (error) {
        //         model = '';
        //         make = '';

        //     }
        //     else {
        //         model = exif_data.image.Model;
        //         make = exif_data.image.Make;
        //         console.log(exif_data)
        //         console.log(model)
        //         console.log(make)

        //     }

        // });

        // const custom_promise = new Promise((resolve, reject) => {
        //     new ExifImage(buffer, (error: { message: string; }, exif_data: any) => {
        //         if (error) {
        //             model = '';
        //             make = '';
        //             reject(error.message)
        //         }
        //         else {
        //             model = exif_data.image.Model;
        //             make = exif_data.image.Make;
        //             console.log(exif_data)
        //             console.log(model)
        //             console.log(make)
        //             resolve(exif_data)
        //         }

        //     });
        // })

        const foo = await ExifImageWrapper(buffer);

        console.log(foo.image.Make)

        return true;


    } catch (error: any) {
        return false;
    }

}

check_exif(image_url).then((res) => {
    console.log(res)
})

