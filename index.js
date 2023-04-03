const express = require("express");
const cors = require('cors');
// const coursesRoutes = require("./routes/courses.routes");

const db = require("./config/db");
const app = express();
app.use(cors())

const bodyParser = require("body-parser");
const appRoute = require("./routes/app.route")
const course=require("./routes/course.routes")

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello everyone!");
});
app.use("/app",appRoute)
app.use("/course",course)

// app.use("/course", coursesRoutes);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app;
