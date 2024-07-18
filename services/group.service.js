const { Promise } = require("mongoose");
const group = require("../models/group.model");

const group1= {


  getAllgroup: async function () {
    return await group.find();
  },

  save: async function (groupObject) {
    return await group.create(groupObject);
  },

  getGroupByUserId(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const group1 = await group.find({ "user_id": user_id }).exec();

        resolve({
          status: 200,
          success: true,
          data: group1,
          message: "fetched data sucessfully",
        });

      } catch (error) {
        console.log(error);
        reject({
          status: 500,
          success: false,
          message: "Server Error",
        });
      }
    });
  },



   //find by name
   findByName: async function (name) {
    const data = await group.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await group.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update group.....
  updategroup: function (id, topic) {
    group.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete group.......
  deletegroup: function (id)
 {
    return new Promise((resolve, reject) => {
      group.findByIdAndDelete(id, function (err, doc) {
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


module.exports = group1;