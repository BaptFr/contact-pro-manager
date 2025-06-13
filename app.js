const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userApiRoute = require('./routes/userApiRoute');
const contactApiRoute = require('./routes/contactApiRoute');

//App express
const app = express;
//Env
dotenv.config();
//ParserAPI
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_CONNECTION)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((e) => console.log('Connexion à MongoDB échouée ! ' + e));

//Url de départ des routes de l'api
app.use("/api/user", userApiRoute);
app.use("/api/contact", contactApiRoute);

//Port lancement server
app.listen(process.env.PORT, () => {
    console.log(`Le serveur est démarré sur le port ${process.env.PORT} !`);
});