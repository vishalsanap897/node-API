const express = require("express");
const router = express.Router();
const CourseService = require("../services/course.service");

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", (req, res) => {
  res.send("Courses API 1.0");
});

router.get("/all", async (req, res) => {
  let result = await CourseService.getAllCourse();
  res.status(200).send({
    status: 200,
    success: true,
    data: result,
    message: "Course fetched successfully",
  });
});

//update course
router.put("/update/:id", (req, res) => {
  console.log("Routes", req.params.id);
  try {
    const result = CourseService.updateCourse(req.params.id, req.body);
    res.send({
      status: 204,
      data: req.params.id,
      success: true,
      message: "Updated succefully",
    });
  }
  catch (err) {
    res.send({
      status: 500,
      data: undefined,
      success: true,
      message: err,
    });
  };
});


//find by name
router.get("/find", (req, res) => {
  CourseService.findByName(req.query.name)
    .then((data) => {
      res.status(200).send({
        status: 200,
        success: true,
        data: data,
        message: "Course fetched successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        success: false,
        data: null,
        message: "Internal server error",
      });
    });
});

//post course
router.post("/", (req, res) => {

  CourseService.save(req.body)
    .then(function (data) {
      res.status(200).send({
        status: 200,
        success: true,
        data: data,
        message: "fetched course successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        success: false,
        data: null,
        message: "Internal server error",
      });
    });
});


//delete course
router.delete("/delete/:id", async (req, res) => {
  const result = await CourseService.deleteCourse(req.params.id);
  console.log(result);
  res.send({ 
    messsage: 'data deleted',
     data: result,
      success: true 
    });
});



module.exports = router;
