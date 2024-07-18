const { Promise } = require("mongoose");
const login = require("../models/login.model");

const login1= {


  getAlllogin: async function () {
    return await login.find();
  },

  save: async function (loginObject) {
    return await login.create(loginObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await login.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await login.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update login.....
  updatelogin: function (id, topic) {
    login.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete login.......
  deletelogin: function (id)
 {
    return new Promise((resolve, reject) => {
      login.findByIdAndDelete(id, function (err, doc) {
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


module.exports = login1;