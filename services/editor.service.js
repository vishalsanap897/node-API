const { Promise } = require("mongoose");
const editor = require("../models/editor.model");

const editor1= {


  getAlleditor: async function () {
    return await editor.find();
  },

  save: async function (editorObject) {
    return await editor.create(editorObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await editor.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await editor.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update editor.....
  updateeditor: function (id, topic) {
    editor.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete editor.......
  deleteeditor: function (id)
 {
    return new Promise((resolve, reject) => {
      editor.findByIdAndDelete(id, function (err, doc) {
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


module.exports = editor1;