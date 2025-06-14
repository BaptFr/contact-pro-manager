
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const userApiRoute = require('./routes/userApiRoute');
const contactApiRoute = require('./routes/contactApiRoute');
const homeRoute = require('./routes/homeRoute');

const path = require('path')

//App express
const app = express();
//Env
dotenv.config();

//Config pour views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//ParserAPI
app.use(bodyParser.json());

//Configuration session (avant routes)
app.use(session({
    secret: 'une_chaine_secrete_pour_la_session',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }  // 1 heure
}));







//Connexion MongoDB
mongoose.connect(process.env.MONGO_CONNECTION)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((e) => console.log('Connexion à MongoDB échouée ! ' + e));

//URL de départ des routes de l'api
app.use("/api/user", userApiRoute);
app.use("/api/contact", contactApiRoute);
app.use("/", homeRoute);

//Port lancement server
app.listen(process.env.PORT, () => {
    console.log(`Le serveur est démarré sur le port ${process.env.PORT} !`);
});

