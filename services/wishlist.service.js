const { Promise } = require("mongoose");
const wishlist = require("../models/wishlist.model");

const wishlist1= {


  getAllwishlist: async function () {
    return await wishlist.find();
  },

  save: async function (wishlistObject) {
    return await wishlist.create(wishlistObject);
  },

 //find by name
 findByName: async function (name) {
  const data = await wishlist.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},

  findByid: async function(id) {
    try {
      const doc = await wishlist.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update wishlist.....
  updatewishlist: function (id, topic) {
    wishlist.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete wishlist.......
  deletewishlist: function (id)
 {
    return new Promise((resolve, reject) => {
      wishlist.findByIdAndDelete(id, function (err, doc) {
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


module.exports = wishlist1;