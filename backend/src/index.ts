
// https://stackoverflow.com/questions/58684642/should-i-call-dotenv-in-every-node-js-file
import * as dotenv from "dotenv";
dotenv.config();

import app from "./app";

const { PORT } = require("./constants")

app.get("/", (req, res) => {
    res.send("<h1>TradeSpace: A Market That Simplifies :)</h1>");
});

app.listen(PORT, () => {
    console.log("server started on port " + PORT);
});

import { ExifImage } from 'exif';

try {

    new ExifImage({ image: 'myImage.jpg' }, function (error: { message: string; }, exifData: any) {
        if (error)
            console.log('Error: ' + error.message);
        else
            console.log(exifData); // Do something with your data!
    });
} catch (error: any) {
    console.log('Error: ' + error.message);
}