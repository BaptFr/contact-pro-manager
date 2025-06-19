const contactApiService = require("../services/contactApiService");


// VOIR informations complète d'un contact (recupère un contact du User)
module.exports.showContact = async (req, res) => {
  try {
    let contact = await contactApiService.getContact({ _id: req.params.id });
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    //Affiche View infos contact
    res.render('item', { contact });
  } catch (error) {
    res.status(400).json( { status: 400, message: error.message });
  }
};


//Formulaire MODIFIER un contact (recupère un contact du User)
module.exports.renderEditForm = async (req, res) => {
  try {
    //Vérif du User session avant redirect modification du contact
    let contact = await contactApiService.getContact({ _id: req.params.id });
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    //Affichage form de modifs
    return res.render('edit-item',{ contact, message: '' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: 400, message: error.message });
}
}


//Formulaire AJOUTER de contact ( récupère le user)
module.exports.renderAddForm = async (req, res) => {
    try {
      //Vérif du User session redirect form  ajout du contact
      let user = req.session.user;
      if(!user){
        return res.redirect('/connection')
      }
      return res.render('add-item', { user, message: '' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ status: 400, message: error.message });
    }
}


//SUPPRIMER contact
module.exports.deleteContact = async (req, res) => {
  try {
    await contactApiService.deleteContact({ _id: req.params.id });
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la suppression du contact");
  }
};

