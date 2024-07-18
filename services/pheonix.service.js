const { Promise } = require("mongoose");
const pheonix = require("../models/pheonix.model");

const pheonix1= {


  getAllpheonix: async function () {
    return await pheonix.find();
  },

  save: async function (pheonixObject) {
    return await pheonix.create(pheonixObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await pheonix.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await pheonix.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update pheonix.....
  updatepheonix: function (id, topic) {
    pheonix.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete pheonix.......
  deletepheonix: function (id)
 {
    return new Promise((resolve, reject) => {
      pheonix.findByIdAndDelete(id, function (err, doc) {
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


module.exports = pheonix1;