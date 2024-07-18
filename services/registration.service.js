const { Promise } = require("mongoose");
const registration = require("../models/registration.model");

const registration1= {


  getAllregistration: async function () {
    return await registration.find();
  },

  save: async function (registrationObject) {
    return await registration.create(registrationObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await registration.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await registration.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update registration.....
  updateregistration: function (id, topic) {
    registration.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete registration.......
  deleteregistration: function (id)
 {
    return new Promise((resolve, reject) => {
      registration.findByIdAndDelete(id, function (err, doc) {
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


module.exports = registration1;