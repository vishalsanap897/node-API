const { Promise } = require("mongoose");
const subcategories = require("../models/subcategories.model");

const subcategories1= {


  getAllsubcategories: async function () {
    return await subcategories.find();
  },

  save: async function (subcategoriesObject) {
    return await subcategories.create(subcategoriesObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await subcategories.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await subcategories.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update subcategories.....
  updatesubcategories: function (id, topic) {
    subcategories.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete subcategories.......
  deletesubcategories: function (id)
 {
    return new Promise((resolve, reject) => {
        subcategories.findByIdAndDelete(id, function (err, doc) {
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


module.exports = subcategories1;