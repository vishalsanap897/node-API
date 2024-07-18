const { Promise } = require("mongoose");
const address = require("../models/address.model");

const address1= {


  getAlladdress: async function () {
    return await address.find();
  },

  save: async function (addressObject) {
    return await address.create(addressObject);
  },


  findByid: async function(id) {
    try {
      const doc = await address.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },


 //find by name
  findByName: async function (name) {
    const data = await address.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },
    

  //update address.....
  updateaddress: function (id, topic) {
    address.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete address.......
  deleteaddress: function (id)
 {
    return new Promise((resolve, reject) => {
      address.findByIdAndDelete(id, function (err, doc) {
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


module.exports = address1;