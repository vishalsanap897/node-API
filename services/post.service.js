const { Promise } = require("mongoose");
const post = require("../models/post.model");

const post1= {


  getAllpost: async function () {
    return await post.find();
  },

  save: async function (postObject) {
    return await post.create(postObject);
  },

   //find by name
   findByName: async function (name) {
    const data = await post.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  findByid: async function(id) {
    try {
      const doc = await post.findById(id);
      console.log("dataa ", doc);
      return doc;
    } catch (err) {
      console.log("error ", err);
      return false;
    }
  },

  //update post.....
  updatepost: function (id, topic) {
    post.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete post.......
  deletepost: function (id)
 {
    return new Promise((resolve, reject) => {
      post.findByIdAndDelete(id, function (err, doc) {
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


module.exports = post1;