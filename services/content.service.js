const { Promise } = require("mongoose");
const content = require("../models/content.model");

const content1= {


  getAllcontent: async function () {
    return await content.find();
  },

  save: async function (contentObject) {
    return await content.create(contentObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await content.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await content.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update content.....
  updatecontent: function (id, topic) {
    content.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete content.......
  deletecontent: function (id)
 {
    return new Promise((resolve, reject) => {
      content.findByIdAndDelete(id, function (err, doc) {
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


module.exports = content1;