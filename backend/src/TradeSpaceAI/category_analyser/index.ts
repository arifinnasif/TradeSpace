import * as mobilenet from '@tensorflow-models/mobilenet';
import fs from 'fs';
import * as tf from '@tensorflow/tfjs-node';


const img = fs.readFileSync('myImage.jpg');

const test = async () => {
    // Load the model.
    const model = await mobilenet.load();

    // const b = Buffer.from(img, 'base64')
    // get the tensor
    console.log("loaded");
    const t = tf.node.decodeJpeg(img);


    // Classify the image.
    const predictions = await model.classify(t);

    console.log('Predictions: ');
    console.log(predictions);
}

test();