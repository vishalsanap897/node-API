const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;

const organizationSchema = new mongoose.Schema({
    app_id: { type: ObjectId, ref: 'app', required: true },
   
},{strict: false,timestamps:true });

organizationSchema.methods.organizationID = function () {
    return new Promise((resolve, reject) => {
      try {
        this.organizationID = new Date().getTime();
        resolve(true);
      } catch (error) {
        reject(error)
      }
    })
  };

module.exports = mongoose.model("organization", organizationSchema);
