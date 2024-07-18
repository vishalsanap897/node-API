const { Promise } = require("mongoose");
const vehicals = require("../models/vehicals.model");

const vehicals1= {


  getAllvehicals: async function () {
    return await vehicals.find();
  },

  save: async function (vehicalsObject) {
    return await vehicals.create(vehicalsObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await vehicals.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await vehicals.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update vehicals.....
  updatevehicals: function (id, topic) {
    vehicals.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete vehicals.......
  deletevehicals: function (id)
 {
    return new Promise((resolve, reject) => {
      vehicals.findByIdAndDelete(id, function (err, doc) {
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


module.exports = vehicals1;