const { Promise } = require("mongoose");
const Bag = require("../models/Bag.model");

const Bag1= {


  getAllBag: async function () {
    return await Bag.find();
  },

  save: async function (BagObject) {
    return await Bag.create(BagObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await Bag.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await Bag.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update Bag.....
  updateBag: function (id, topic) {
    Bag.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete Bag.......
  deleteBag: function (id)
 {
    return new Promise((resolve, reject) => {
      Bag.findByIdAndDelete(id, function (err, doc) {
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


module.exports = Bag1;