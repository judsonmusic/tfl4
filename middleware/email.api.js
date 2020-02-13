var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

if (process.env.NODE_ENV == "development" || 1==1) {
  var smtpConfig = {
    service: 'Gmail',
    auth: {
      user: 'trainforlife.help@gmail.com',
      pass: 'Tfldev1!!'
    }}
//   var smtpConfig = {
//     host: 'smtp.gmail.com',
//     port: 587,
//     //secure: true, // use SSL
//     //requireTLS: true,
//     auth: {
//       user: 'trainforlife.help@gmail.com',
//       pass: 'Tfldev1!!'
//     }
//   };

}

var transporter = nodemailer.createTransport(smtpConfig);


//send email.
router.post('/', function (req, res) {
  console.log('***Attempting to send email: ', req.body, smtpConfig, process.env.NODE_ENV);

  var processCount = 1;

  if (typeof req.body.title === "undefined") {
    req.body.title = "Hello!";
  }

  req.body.emails.forEach(function (to, i, array) {

    var toEmail;
    if (typeof to != 'string') {
      toEmail = to.email;
    } else {
      toEmail = to;
    }
    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: 'info@trainforlifeamerica.com', // sender address
      to: toEmail, // list of receivers //rgabriel@skoolaide.com
      subject: 'A message from Train For Life America', // Subject line
      //bcc: "judsonmusic@me.com",
      //text: 'Hello world', // plaintext body
      html: '<table width="100%">' +
        '<thead>' +
        '<tr>' +
        '<th><img src="http://www.trainforlifeamerica.com/assets/images/logo.png"/></th>' +
        '</tr>' +
        '</thead>' +
        '<tbody style="background-color: #efefef">' +
        '<tr>' +
        '<td style="background-color: #337ab7; color:#ffffff; padding: 20px; height:100px">' +
        '<h1>' + req.body.title + '</h1>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="padding: 20px;">' +
        '<div style="min-height: 400px;">' + req.body.message + '</div>' +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="background-color: #444444; color:#ffffff; padding: 20px;">' +
        '&copy 2018 TFL' +
        '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>'
    };

    //console.log('The options for this email:',  mailOptions);


    // send mail with defined transport object
    //console.log('Sending the email');
    transporter.sendMail(mailOptions, function (err, res2) {
      if (err) {
        //console.log('There was an error sending the email: ', err);
        res.status(500).send(err);
        //process.exit(0);
      } else {
        //this is the response from sending mail...
        //if we have gotten to the end of the process count....
        //console.log(processCount, req.body.emails.length);
        console.log('@@@The email length...', req.body.emails.length);
        if (processCount == req.body.emails.length || req.body.emails.length == 1) {
          //we are done...
          processCount = 1;
          res.status(200).send({
            success: true,
            message: "Messages sent!",
            emails: req.body.emails,
            response: res2
          });
        } else {
          processCount++; //everytime we send an email this goes. up for example, 5 addreses come in.
        }
        console.log('>>>>>>>> Email sent to:', mailOptions.to);
        //process.exit(0);
        //logger.log("info", 'Message sent: ' + info.response);

      }

    });

  });//end of the for each...

});

module.exports = router;
