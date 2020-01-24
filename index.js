let express = require("express");

let app = express();
let mongoose = require("mongoose");
let port = process.env.port || 4800;
app.use(express.json());
mongoose
    .connect("mongodb://localhost/HHD", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`connected successfully`))
    .catch((error) => console.log(`something went wrong ${error.message}`));

app.listen(port, () => console.log(`connected to port`))
