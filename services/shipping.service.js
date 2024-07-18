const { Promise } = require("mongoose");
const shipping = require("../models/shipping.model");

const shipping1= {


  getAllshipping: async function () {
    return await shipping.find();
  },

  save: async function (shippingObject) {
    return await shipping.create(shippingObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await shipping.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await shipping.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update shipping.....
  updateshipping: function (id, topic) {
    shipping.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete shipping.......
  deleteshipping: function (id)
 {
    return new Promise((resolve, reject) => {
      shipping.findByIdAndDelete(id, function (err, doc) {
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


module.exports = shipping1;