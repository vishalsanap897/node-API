const { Promise } = require("mongoose");
const apollo = require("../models/apollo.model");

const apollo1= {


  getAllapollo: async function () {
    return await apollo.find();
  },

  save: async function (apolloObject) {
    return await apollo.create(apolloObject);
  },

  
 //find by name
 findByName: async function (name) {
  const data = await apollo.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},
 

  findByid: async function(id) {
    try {
      const doc = await apollo.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update apollo.....
  updateapollo: function (id, topic) {
    apollo.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete apollo.......
  deleteapollo: function (id)
 {
    return new Promise((resolve, reject) => {
      apollo.findByIdAndDelete(id, function (err, doc) {
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


module.exports = apollo1;