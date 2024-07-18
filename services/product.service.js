const { Promise } = require("mongoose");
const product = require("../models/product.model");

const product1= {


  getAllproduct: async function () {
    return await product.find();
  },

  save: async function (productObject) {
    return await product.create(productObject);
  },

 //find by name
 findByName: async function (name) {
  const data = await product.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},

  findByid: async function(id) {
    try {
      const doc = await product.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update product.....
  updateproduct: function (id, topic) {
    product.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete product.......
  deleteproduct: function (id)
 {
    return new Promise((resolve, reject) => {
      product.findByIdAndDelete(id, function (err, doc) {
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


module.exports = product1;