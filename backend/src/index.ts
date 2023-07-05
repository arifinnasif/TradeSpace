import app from "./app";

const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>TradeSpace: A Market That Simplifies :)</h1>");
    });

app.listen(port, () => {
    console.log("server started on port " + port);
    });