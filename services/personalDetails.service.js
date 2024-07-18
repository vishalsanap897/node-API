const { Promise } = require("mongoose");
const personalDetails = require("../models/personalDetails.model");

const personalDetails1= {


  getAllpersonalDetails: async function () {
    return await personalDetails.find();
  },

  save: async function (personalDetailsObject) {
    return await personalDetails.create(personalDetailsObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await personalDetails.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await personalDetails.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update personalDetails.....
  updatepersonalDetails: function (id, topic) {
    personalDetails.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete personalDetails.......
  deletepersonalDetails: function (id)
 {
    return new Promise((resolve, reject) => {
      personalDetails.findByIdAndDelete(id, function (err, doc) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  },



};


module.exports = personalDetails1;