const { Promise } = require("mongoose");
const student = require("../models/student.model");

const student1= {


  getAllstudent: async function () {
    return await student.find();
  },

  save: async function (studentObject) {
    return await student.create(studentObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await student.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await student.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update student.....
  updatestudent: function (id, topic) {
    student.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete student.......
  deletestudent: function (id)
 {
    return new Promise((resolve, reject) => {
      student.findByIdAndDelete(id, function (err, doc) {
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


module.exports = student1;