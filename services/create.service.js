const { Promise } = require("mongoose");
const create = require("../models/create.model");

const create1= {


  getAllcreate: async function () {
    return await create.find();
  },

  save: async function (createObject) {
    return await create.create(createObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await create.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await create.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update create.....
  updatecreate: function (id, topic) {
    create.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete create.......
  deletecreate: function (id)
 {
    return new Promise((resolve, reject) => {
      create.findByIdAndDelete(id, function (err, doc) {
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


module.exports = create1;