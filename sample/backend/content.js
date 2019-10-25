'use-strict'
const mongoose = require('mongoose');


// {
//   "rtsp-url": "rtsp://234511351313:5554",
//   "cameraNumber": 02,
//   "postion": [34.26565, 9.666589],
//   "street-name": "anzingr str. 145"
// }

const contentSchema = new mongoose.Schema({
  contentId: {
    type: Number
  },
  title: {
    type: String
  },
  body: {
    type: String
  },
  imgsrc: {
    type: String
  },
});



const contentConfiguration = mongoose.model('contents', contentSchema, "contents");
module.exports = contentConfiguration;
