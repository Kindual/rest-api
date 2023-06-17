const sgMail = require('@sendgrid/mail')
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async(data) => {
    const email = {...data, from: 'chubych.viktor@ukr.net',};
    await sgMail.send(email);
    return true;
}

module.exports = sendEmail;

// const email = {
//   to: 'jakob.skovron@gmail.com',
//   from: 'chubych.viktor@ukr.net',
//   subject: 'Test mail',
//   html: '<p><strong>Hello, Viktore!</strong></p>'
// }

// sgMail.send(email)
//   .then(() => console.log('Email send success'))
//   .catch((error) => console.log(error.message))

// 

// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: 'smtp.meta.ua',
//   port: 465, // (25, 465, 2525)
//   secure: true,
//   auth: {
//     user: 'chubych.viktor.work@meta.ua',
//     pass: META_PASSWORD,
//   }
// }

// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: 'jakob.skovron@gmail.com',
//   from: 'chubych.viktor.work@meta.ua',
//   subject: 'Test mail',
//   html: '<p><strong>Hello, Viktore!</strong></p>'
// }

// transport.sendMail(email)
//   .then(() => console.log('Email send success'))
//   .catch((error) => console.log(error.message))

// 
