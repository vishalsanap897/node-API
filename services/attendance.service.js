const { Promise } = require("mongoose");
const attendance = require("../models/attendance.model");

const attendance1= {


  getAllattendance: async function () {
    return await attendance.find();
  },

  save: async function (attendanceObject) {
    return await attendance.create(attendanceObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await attendance.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await attendance.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update attendance.....
  updateattendance: function (id, topic) {
    attendance.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete attendance.......
  deleteattendance: function (id)
 {
    return new Promise((resolve, reject) => {
      attendance.findByIdAndDelete(id, function (err, doc) {
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


module.exports = attendance1;