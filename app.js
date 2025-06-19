
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const userApiRoute = require('./routes/userApiRoute');
const contactApiRoute = require('./routes/contactApiRoute');
const contactViewRoute = require('./routes/contactViewRoute');
const authRoute = require('./routes/authRoute');

const path = require('path')

//App express
const app = express();
//Env
dotenv.config();

//Config moteur templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Parser Formulaire et données
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configuration session (avant routes)
app.use(session({
    secret: process.env.SESSION_SECRET,
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
app.use("/", authRoute);

//View
app.use('/contact', contactViewRoute);


//Port lancement server
app.listen(process.env.PORT, () => {
    console.log(`Le serveur est démarré sur le port ${process.env.PORT} !`);
});