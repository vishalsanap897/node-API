const { Promise } = require("mongoose");
const assignment = require("../models/assignment.model");

const assignment1= {


  getAllassignment: async function () {
    return await assignment.find();
  },

  save: async function (assignmentObject) {
    return await assignment.create(assignmentObject);
  },


   //find by name
   findByName: async function (name) {
    const data = await assignment.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },


  findByid: async function(id) {
    try {
      const doc = await assignment.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update assignment.....
  updateassignment: function (id, topic) {
    assignment.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete assignment.......
  deleteassignment: function (id)
 {
    return new Promise((resolve, reject) => {
      assignment.findByIdAndDelete(id, function (err, doc) {
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


module.exports = assignment1;