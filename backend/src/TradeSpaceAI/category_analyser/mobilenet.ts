import * as mobilenet from '@tensorflow-models/mobilenet';




let model: mobilenet.MobileNet = null;

const get_model = async () => {
    if (model == null) {
        console.log("loading mobilenet model");
        model = await mobilenet.load();
        console.log("loaded mobilenet model");
        console.log("caution: if you see this message twice then you are in trouble");
        return model;
    }
    else {
        console.log("mobilenet model already loaded");
        return model;
    }
}

export default get_model;

