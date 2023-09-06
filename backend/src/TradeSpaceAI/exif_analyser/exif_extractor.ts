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

        // const delta = to_gmt_date(exif_data.exif.CreateDate) - to_gmt_date(exif_data.image.ModifyDate);

        return {
            model: exif_data.image.Model,
            make: exif_data.image.Make,
            image_software: exif_data.image.Software,
            create_date: to_gmt_date(exif_data.exif.CreateDate),
            modify_date: to_gmt_date(exif_data.image.ModifyDate),
        }


    } catch (error: any) {
        return null;
    }

}

const to_gmt_date = (arg: string) => {
    const date_string = '2023:09:06 02:22:49';
    const [date_part, time_part] = date_string.split(' ');

    // Split the date and time parts

    const [year, month, day] = date_part.split(':').map(Number);
    const [hours, minutes, seconds] = time_part.split(':').map(Number);

    // Create a Date object

    const date_object = new Date(year, month - 1, day, hours, minutes, seconds);

    // Note: Month in JavaScript's Date object is 0-based, so we subtract 1 from the month.

    return date_object;
}

export { extract_necessary_exif }



