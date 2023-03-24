// const serverless = require('serverless-http');
const cors = require('cors');
const app = require('./index')
const config  =require('./config/config')
const port = config.PORT;

app.use(cors({
    origin: "*",
  }));

console.log('checking the port',port)
app.listen(port, () => 
  console.log(`Server is listening on port ${port}.`)
)
module.exports.handler = app;