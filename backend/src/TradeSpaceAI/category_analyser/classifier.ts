import get_model from './mobilenet';
import fs from 'fs';
import * as tf from '@tensorflow/tfjs-node';
import axios from 'axios';


// returns the probability of that the image belongs to a category
const classifier = async (image_url: string, category_str: string) => {
    const response = await axios.get(image_url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, "utf-8");


    let tensor: tf.Tensor3D;

    // check image type
    // then convert to tensor
    if (image_url.includes("jpg") || image_url.includes("jpeg")) {
        tensor = tf.node.decodeJpeg(buffer);
    } else if (image_url.includes("png")) {
        tensor = tf.node.decodePng(buffer);
    } else {
        return 0;
    }


    // Classify the image.
    const predictions = await (await get_model()).classify(tensor, 10);

    const focused_predictions = predictions.filter((p) => p.className.includes(category_str));

    if (focused_predictions.length > 0) {
        return focused_predictions[0].probability;
    }

    return 0;
}

