const { Promise } = require("mongoose");
const fees = require("../models/fees.model");

const fees1= {


  getAllfees: async function () {
    return await fees.find();
  },

  save: async function (feesObject) {
    return await fees.create(feesObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await fees.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await fees.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update fees.....
  updatefees: function (id, topic) {
    fees.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete fees.......
  deletefees: function (id)
 {
    return new Promise((resolve, reject) => {
      fees.findByIdAndDelete(id, function (err, doc) {
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


module.exports = fees1;