const { Promise } = require("mongoose");
const offer = require("../models/offer.model");

const offer1= {


  getAlloffer: async function () {
    return await offer.find();
  },

  save: async function (offerObject) {
    return await offer.create(offerObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await offer.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await offer.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update offer.....
  updateoffer: function (id, topic) {
       offer.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete offer.......
  deleteoffer: function (id)
 {
    return new Promise((resolve, reject) => {
      offer.findByIdAndDelete(id, function (err, doc) {
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


module.exports = offer1;