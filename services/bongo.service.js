const { Promise } = require("mongoose");
const bongo = require("../models/bongo.model");

const bongo1= {


  getAllbongo: async function () {
    return await bongo.find();
  },

  save: async function (bongoObject) {
    return await bongo.create(bongoObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await bongo.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await bongo.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update bongo.....
  updatebongo: function (id, topic) {
    bongo.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete bongo.......
  deletebongo: function (id)
 {
    return new Promise((resolve, reject) => {
      bongo.findByIdAndDelete(id, function (err, doc) {
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


module.exports = bongo1;