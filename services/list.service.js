const { Promise } = require("mongoose");
const list = require("../models/list.model");

const list1= {


  getAlllist: async function () {
    return await list.find();
  },

  save: async function (listObject) {
    return await list.create(listObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await list.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await list.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update list.....
  updatelist: function (id, topic) {
    list.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete list.......
  deletelist: function (id)
 {
    return new Promise((resolve, reject) => {
      list.findByIdAndDelete(id, function (err, doc) {
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


module.exports = list1;