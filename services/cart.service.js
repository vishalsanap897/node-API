const { Promise } = require("mongoose");
const cart = require("../models/cart.model");

const cart1= {


  getAllcart: async function () {
    return await cart.find();
  },

  save: async function (cartObject) {
    return await cart.create(cartObject);
  },

 //find by name
 findByName: async function (name) {
  const data = await cart.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},

  findByid: async function(id) {
    try {
      const doc = await cart.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },


  //update cart.....
  updatecart: function (id, topic) {
    cart.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete cart.......
  deletecart: function (id)
 {
    return new Promise((resolve, reject) => {
      cart.findByIdAndDelete(id, function (err, doc) {
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


module.exports = cart1;