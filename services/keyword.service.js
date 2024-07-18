const { Promise } = require("mongoose");
const keyword = require("../models/keyword.model");

const keyword1= {


  getAllkeyword: async function () {
    return await keyword.find();
  },

  save: async function (keywordObject) {
    return await keyword.create(keywordObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await keyword.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await keyword.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update keyword.....
  updatekeyword: function (id, topic) {
    keyword.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete keyword.......
  deletekeyword: function (id)
 {
    return new Promise((resolve, reject) => {
      keyword.findByIdAndDelete(id, function (err, doc) {
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


module.exports = keyword1;