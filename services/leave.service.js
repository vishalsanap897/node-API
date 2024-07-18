const { Promise } = require("mongoose");
const leave = require("../models/leave.model");

const leave1= {


  getAllleave: async function () {
    return await leave.find();
  },

  save: async function (leaveObject) {
    return await leave.create(leaveObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await leave.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await leave.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update leave.....
  updateleave: function (id, topic) {
    leave.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete leave.......
  deleteleave: function (id)
 {
    return new Promise((resolve, reject) => {
      leave.findByIdAndDelete(id, function (err, doc) {
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


module.exports = leave1;