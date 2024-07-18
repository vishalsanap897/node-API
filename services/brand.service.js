const { Promise } = require("mongoose");
const brand = require("../models/brand.model");

const brand1= {


  getAllbrand: async function () {
    return await brand.find();
  },

  save: async function (brandObject) {
    return await brand.create(brandObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await brand.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await brand.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update brand.....
  updatebrand: function (id, topic) {
    brand.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete brand.......
  deletebrand: function (id)
 {
    return new Promise((resolve, reject) => {
      brand.findByIdAndDelete(id, function (err, doc) {
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


module.exports = brand1;