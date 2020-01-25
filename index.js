let express = require("express");

let app = express();
let mongoose = require("mongoose");
let user = require("./routes/userRoutes")
let port = process.env.port || 4600;
app.use(express.json());
mongoose
    .connect("mongodb://localhost/HHD", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`connected successfully`))
    .catch((error) => console.log(`something went wrong ${error.message}`));

app.listen(port, () => console.log(`connected to port`));
app.use("/api", user);
