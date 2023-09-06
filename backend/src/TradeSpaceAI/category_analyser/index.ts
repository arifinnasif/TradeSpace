import get_model from './mobilenet';
import fs from 'fs';
import * as tf from '@tensorflow/tfjs-node';


const img = fs.readFileSync('myImage.jpg');

const test = async () => {

    const str = "motor";


    // const b = Buffer.from(img, 'base64')
    // get the tensor
    const t = tf.node.decodeJpeg(img);


    // Classify the image.
    const predictions = await (await get_model()).classify(t, 10);

    const focused_predictions = predictions.filter((p) => p.className.includes(str));

    if (focused_predictions.length > 0) {
        return true;
    }

    return false;
}

test();