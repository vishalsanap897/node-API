const Course = require("../models/course.model");
const course = {


  getAllCourse: async function () {
    return await Course.find();
  },

  save: async function (courseObject) {
    return await Course.create(courseObject);
  },

  findByid: async function(id)
 {
  try {
    const doc = await Course.findById(id)
;
    console.log("dataa ", doc);
    return doc;
    
  } catch (err) {
    console.log("error ", err);
    return false;
  }
},


  //find by name
  findByName: async function (name) {
    const data = await Course.find({
      name: { $regex : '.*'+ name + '.*', $options:'i'} ,
    });
    return data;
  },

  // delete course
  deleteCourse: function(id) {
    return new Promise((resolve, reject) => {
      Course.findByIdAndDelete(id, function(err, doc) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  },
  
  
  updateCourse: async function(id, topic) {
    Course.findByIdAndUpdate(id, topic, {new: true}, function(err, doc){
      if(err){
        console.log("error ", err)
        return false;
      } else {
        console.log("dataa ",doc);
        return doc
      }
    });
  },
};



module.exports = course;

