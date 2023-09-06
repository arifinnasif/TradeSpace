
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

