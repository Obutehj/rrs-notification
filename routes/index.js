const express = require('express');
const router = express.Router();
// controller
const sendNotify = require('../controller/send-sms');
// endpoints
// root
router.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'hello from the notify servies' })
    .end();
});

// send notification
router.post('/send-notification', async (req, res) => {
  const { message, numbers } = req.body;
  if (!message || !numbers) {
    const error = new Error('you must have a message and numbers');
    console.log(error);
    res
      .status(400)
      .json({ status: 'error', error: error.message })
      .end();
  }
  // note your numbers in the body of the post request should be an array of regiistered numbers
  // ["+2349070822819", "+2348052949159", "+2348139259326", "+2347082080230"] these are verified numbers
  if (numbers instanceof Array)
    try {
      await sendNotify(message, numbers);
      console.log('message sent');
      res
        .status(201)
        .json({ status: 'success', data: 'message sent' })
        .end();
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ status: 'error', error: err.message })
        .end();
    }
  else {
    const err = new Error('numbers must be of type array');
    console.log(err);
    res
      .status(400)
      .json({ status: 'error', error: err.message })
      .end();
  }
});

module.exports = router;
