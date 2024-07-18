const { Promise } = require("mongoose");
const lession = require("../models/lession.model");

const lession1= {


  getAlllession: async function () {
    return await lession.find();
  },

  save: async function (lessionObject) {
    return await lession.create(lessionObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await lession.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await lession.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },


  //update lession.....
  updatelession: function (id, topic) {
    lession.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete lession.......
  deletelession: function (id)
 {
    return new Promise((resolve, reject) => {
      lession.findByIdAndDelete(id, function (err, doc) {
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


module.exports = lession1;