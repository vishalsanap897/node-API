
const app = require('./index')
const config  =require('./config/config')

const port = config.PORT;
console.log('checking the port',port)
app.listen(port, () => 
  console.log(`Server is listening on port ${port}.`)
)