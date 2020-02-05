
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let express = require("express");

let app = express();
let config = require("config");
let mongoose = require("mongoose");
let user = require("./routes/userRoutes")
let auth = require("./routes/auth/auth");
let mailer = require("./routes/mailer");
let forgetepassword = require("./routes/forget.password");



let port = process.env.port || 4600;
app.use(express.json())

if(!config.get("apitoken"))
{
    process.exit(1);
}

mongoose
    .connect("mongodb://localhost/HHD", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`connected successfully`))
    .catch((error) => console.log(`something went wrong ${error.message}`));

app.listen(port, () => console.log(`connected to port`));


app.use("/api", user);

app.use("/api/userlogin", auth);
app.use("/api" , mailer);
app.use("/api", forgetepassword);
