import * as mobilenet from '@tensorflow-models/mobilenet';




let model: mobilenet.MobileNet = null;


// active loader
export const load_model = async () => {
    console.log("active loading mobilenet model");
    model = await mobilenet.load();
    console.log("active loaded mobilenet model");
}


// singleton
const get_model = async () => {
    if (model == null) {
        console.log("lazy loading mobilenet model");
        model = await mobilenet.load();
        console.log("lazy loaded mobilenet model");
        console.log("caution: if you see this message twice then you are in trouble");
        return model;
    }
    else {
        console.log("mobilenet model already loaded");
        return model;
    }
}

export default get_model;

