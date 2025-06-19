
//Error 500

//Formulaire ajout de contact
module.exports.renderAddForm = async (req, res) => {
    try {
        //Vérif avant ajout au User
        const user = req.session.user;
        if(!user){
            return res.redirect('/connection')
        }
       
        return res.render('add-item', { user, message: '' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: error.message });
    }
}

//Informations complète d'un contct
module.exports.showContact = async (req, res) => {
  try {
    const contact = await contactApiService.getContact({ _id: req.params.id });
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    //Affiche View infos contact
    res.render('item', { contact });  
  } catch (error) {
    res.status(500).send('Error during informations recuperation');
  }
};