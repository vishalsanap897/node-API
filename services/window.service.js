const { Promise } = require("mongoose");
const window = require("../models/window.model");

const window1= {


  getAllwindow: async function () {
    return await window.find();
  },

  save: async function (windowObject) {
    return await window.create(windowObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await window.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await window.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update window.....
  updatewindow: function (id, topic) {
    window.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete window.......
  deletewindow: function (id)
 {
    return new Promise((resolve, reject) => {
      window.findByIdAndDelete(id, function (err, doc) {
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


module.exports = window1;