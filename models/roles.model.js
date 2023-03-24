const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;

const rolesSchema = new mongoose.Schema({


},{strict: false });

rolesSchema.methods.rolesID = function () {
    return new Promise((resolve, reject) => {
      try {
        this.roles_id = new Date().getTime();
        resolve(true);
      } catch (error) {
        reject(error)
      }
    })
  
  };

module.exports = mongoose.model("roles", rolesSchema);


