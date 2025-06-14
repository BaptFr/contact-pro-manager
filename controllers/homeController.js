

exports.showHome = (req, res) => {
    res.render("connection", {
        title: "Accueil",
        message: "Bienvenue sur le site !"
    });
};