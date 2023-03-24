const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 4000,
  // MONGODB_URL: 'mongodb://172.31.19.164:27017/baap',
  LOCAL_MONGODB_URL: 'mongodb://127.0.0.1:27017/baap',
  // ENV: 'DEV',
  ENV: 'local',
  JWT_SECRET: process.env.JWT_SECRET || 'baapsecret',
  JWT_SECRET_KEY: 'this is baap secret key"',
  TOKEN_HEADER_KEY: 'some header',
  authkey: process.env.accessKeyId || '5ccc2a15ba5bc353',
  OTP: 282812,
  sender: 6119,
  country_code: +91,
  //secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
}
