import { ExifImage, ExifData } from 'exif';
import axios from 'axios';


// original library has a bug where it does not handle buffer properly
// also it does not have a promise wrapper
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

interface NecessaryExifType {

    model: string;
    make: string;
    image_software: string;
    create_date: Date;
    modify_date: Date;

}

// returns true if exif data is present ie image not downloaded from internet or tampered with
const extract_necessary_exif = async (image_url: string): Promise<NecessaryExifType> => {

    const response = await axios.get(image_url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, "utf-8");



    try {
        const exif_data = await ExifImageWrapper(buffer);

        console.log(exif_data.image.Make)

        return {
            model: exif_data.image.Model,
            make: exif_data.image.Make,
            image_software: exif_data.image.Software,
            create_date: new Date(exif_data.exif.CreateDate),
            modify_date: new Date(exif_data.image.ModifyDate),
        }


    } catch (error: any) {
        return null;
    }

}

export { extract_necessary_exif }



