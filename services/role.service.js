const { Promise } = require("mongoose");
const role = require("../models/role.model");

const role1= {


  getAllrole: async function () {
    return await role.find();
  },

  save: async function (roleObject) {
    return await role.create(roleObject);
  },

 //find by name
 findByName: async function (name) {
  const data = await role.find({
    name: { $regex : '.*'+ name + '.*', $options:'i'} ,
  });
  return data;
},

  findByid: async function(id) {
    try {
      const doc = await role.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update role.....
  updaterole: function (id, topic) {
    role.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete role.......
  deleterole: function (id)
 {
    return new Promise((resolve, reject) => {
      role.findByIdAndDelete(id, function (err, doc) {
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


module.exports = role1;