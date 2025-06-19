

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
        return res.status(500).json({ status: 500, message: error.message });
    }
}
