const { Promise } = require("mongoose");
const folder = require("../models/folder.model");

const folder1= {


  getAllfolder: async function () {
    return await folder.find();
  },

  save: async function (folderObject) {
    return await folder.create(folderObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await folder.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await folder.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update folder.....
  updatefolder: function (id, topic) {
    folder.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete folder.......
  deletefolder: function (id)
 {
    return new Promise((resolve, reject) => {
      folder.findByIdAndDelete(id, function (err, doc) {
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


module.exports = folder1;