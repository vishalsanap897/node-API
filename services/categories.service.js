const { Promise } = require("mongoose");
const categories = require("../models/categories.model");

const categories1= {


  getAllcategories: async function () {
    return await categories.find();
  },

  save: async function (categoriesObject) {
    return await categories.create(categoriesObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await categories.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await categories.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update categories.....
  updatecategories: function (id, topic) {
    categories.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete categories.......
  deletecategories: function (id)
 {
    return new Promise((resolve, reject) => {
        categories.findByIdAndDelete(id, function (err, doc) {
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


module.exports = categories1;