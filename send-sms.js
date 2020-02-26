require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

var numbersToMessage = ["+2349070822819", "+2348052949159", "+2348139259326", "+2347082080230"] 
// The numbers are gotten from Dbase.. These are demo numbers that need to be verified for twilio trial accounts

var numbersToMessageForTrial = ["+2349070822819"]
// NOTE You have to verify all the numbers unless you upgrade your account

const client = require('twilio')(accountSid, authToken);

numbersToMessageForTrial.forEach( number => {
  var message = client.messages
  .create({
     body: 'This is to notify you that your train will take-off within 30 minutes',
     from: process.env.NOTIFY_PHONE_NUMBER,
     to: number
   })
  .then(message => console.log(message.sid))
  .done()
})

// const client = require('twilio')(accountSid, authToken);

// client.notify.services(notifyServiceSid)
//   .notifications.create({
//     toBinding: JSON.stringify([
//       binding_type: 'sms', address: '** First phone number here **',
//       binding_type: 'sms', address: '** Second phone number here **',
//       // This also works for iOS, Android, and FB Messenger.
//       // You can mix and match binding_type in the toBinding.
//     ]),
//     body: 'You just sent your first message with the Passthrough API!'
//   })
//   .then(notification => console.log(notification.sid))
//   .catch(error => console.log(error));


  