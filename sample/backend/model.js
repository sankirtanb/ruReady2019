'use-strict'
const mongoose = require('mongoose');


// {
//   "rtsp-url": "rtsp://234511351313:5554",
//   "cameraNumber": 02,
//   "postion": [34.26565, 9.666589],
//   "street-name": "anzingr str. 145"
// }

const contentRecSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  contentId: {
    type: Object
  },
  recStrength: {
    type: Object
  }
});



const content_users = mongoose.model('users', contentRecSchema, "users");
module.exports = content_users;
