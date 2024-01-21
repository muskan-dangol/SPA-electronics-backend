const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, unique: true, lowerCase: true },
  email: { type: String, unique: true, lowerCase: true },
  password: String,
});

userSchema.pre("save", async function (next) {
  const user = this;
  // generating a salt
  const salt = await bcrypt.genSalt(10);
  // hash (encrypt ) our password using the salt
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  next();
});

userSchema.methods.comparePassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
