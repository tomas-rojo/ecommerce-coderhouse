const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true},
  phone_number: { type: String, required: true},
  email: { type: String, required: true, unique: true, trim: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]},
  password: { type: String, required: true },
  profile_img: { type: String, default: 'new_profile.png' },
  role: { type: String, default: 'user' }
},
  {
    versionKey: false,
  });

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
