import { Meteor } from 'meteor/meteor';

import '../imports/api/sensorreadings.js';

Meteor.startup(() => {
  // code to run on server at startup
  process.env.MAIL_URL = 'smtp://postmaster@sandbox5dd9b9e891e44553b9520226a08cfce1.mailgun.org:dab49c637fd857cba95b40b883fc0101@smtp.mailgun.org:587';


    // Email.send({
    //   to: "ovunc.ozturk@gmail.com",
    //   from: "floraiot@gmail.com",
    //   subject: "Water Alert",
    //   text: "The contents of our email in plain text.",
    // });
});
