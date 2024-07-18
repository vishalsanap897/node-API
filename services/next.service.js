const { Promise } = require("mongoose");
const next = require("../models/next.model");

const next1= {


  getAllnext: async function () {
    return await next.find();
  },

  save: async function (nextObject) {
    return await next.create(nextObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await next.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await next.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update next.....
  updatenext: function (id, topic) {
    next.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete next.......
  deletenext: function (id)
 {
    return new Promise((resolve, reject) => {
      next.findByIdAndDelete(id, function (err, doc) {
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


module.exports = next1;