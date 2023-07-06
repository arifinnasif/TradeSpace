import app from "./app";

const { PORT } = require("./constants")

app.get("/", (req, res) => {
    res.send("<h1>TradeSpace: A Market That Simplifies :)</h1>");
    });

app.listen(PORT, () => {
    console.log("server started on port " + PORT);
    });