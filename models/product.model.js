const mongoose = require("mongoose")

const productSchema =new mongoose.Schema({
  // course_id: {
  //   type: Number,
  //   required: true
  // },
  // },
  // title: {
  //   type: String,
  //   required: true
  // description: {
  //   type: String,
  //   required: false
  // },
  // no_of_lessons: {
  //   type: Number,
  //   required: false
  // },
  // author: {
  //   type: String,
  //   required: false
  // },
  // tags: [{
  //   type: String,
  //   required: false
  // }]
  
},
{strict:false});


module.exports = mongoose.model("product",productSchema)