const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// the twilio client config
const client = require('twilio')(accountSid, authToken);

// The numbers are gotten from Dbase.. These are demo numbers that need to be verified for twilio trial accounts
// NOTE You have to verify all the numbers unless you upgrade your account

module.exports = function sendNotify(message, numbers) {
  return new Promise((resolve, reject) => {
    numbers.forEach(number => {
      //! all the message get propagated concurrently => no wating for the other
      client.messages
        .create({
          body: message,
          from: process.env.NOTIFY_PHONE_NUMBER,
          to: number
        })
        .then(res => console.log(res.sid))
        // ! do more error handling
        .catch(err => console.log(err))
        .done();
    });
    resolve(true);
  });
};
