const User = require('../models/user');
const bcrypt = require('bcrypt');


exports.authenticate = async (email, password) => {
    const user = await User.findOne({ email });
    if(!user) return null;
    // comparaison  (doc:  const match = await bcrypt.compare(password, user.passwordHash));
    const valid = await bcrypt.compare(password, user.password);
    if(valid){
        return user;
    }else{
        return null;
    };
}