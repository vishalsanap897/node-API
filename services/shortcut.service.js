const { Promise } = require("mongoose");
const shortcut = require("../models/shortcut.model");

const shortcut1= {


  getAllshortcut: async function () {
    return await shortcut.find();
  },

  save: async function (shortcutObject) {
    return await shortcut.create(shortcutObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await shortcut.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await shortcut.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update shortcut.....
  updateshortcut: function (id, topic) {
    shortcut.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete shortcut.......
  deleteshortcut: function (id)
 {
    return new Promise((resolve, reject) => {
      shortcut.findByIdAndDelete(id, function (err, doc) {
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


module.exports = shortcut1;