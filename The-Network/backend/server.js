const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("../backend/routes");
const Models = require("../backend/models/index");

var PORT = 4202;
const router = express.Router();
const app = express()
app.use(cors());
app.use(bodyParser.json());


// Serve only the static files form the dist directory
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

/* final catch-all route to index.html defined last */
app.get('/*', (req, res) => {
    res.sendFile('/Users/michaelmariea/Desktop/personal-projects/The-Network/The-Network/src/index.html');
  })

app.use(routes);

app.listen(PORT, () => {
    console.log(`The Networks Server running on PORT ${PORT}!`);
})
