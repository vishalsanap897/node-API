const { Promise } = require("mongoose");
const user = require("../models/user.model");

const user1= {


  getAlluser: async function () {
    return await user.find();
  },

  save: async function (userObject) {
    return await user.create(userObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await user.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await user.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update user.....
  updateuser: function (id, topic) {
    user.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete user.......
  deleteuser: function (id)
 {
    return new Promise((resolve, reject) => {
      user.findByIdAndDelete(id, function (err, doc) {
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


module.exports = user1;