const { Promise } = require("mongoose");
const Collection = require("../models/app.model");

const app= {


  getAllCollection: async function () {
    return await Collection.find();
  },

  save: async function (CollectionObject) {
    return await Collection.create(CollectionObject);
  },

  //update Collection.....
  updateCollection: function (id, topic) {
    Course.findByIdAndUpdate(id, topic, { new: true }, function (err, doc) {
      if (err) {
        console.log("error ", err)
        return false;
      } else {
        console.log("data ", doc);
        return doc
      }
    });
  },
  //Delete Collection.......
  deleteCollection: function (id)
 {
    return new Promise((resolve, reject) => {
      Course.findByIdAndDelete(id, function (err, doc) {
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


module.exports = app;