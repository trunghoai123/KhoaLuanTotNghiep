const nodemailer = require('nodemailer');

// host của google - gmail
const mailHost = 'smtp.gmail.com'
// 587 là một cổng tiêu chuẩn và phổ biến trong giao thức SMTP
const mailPort = 587

const transporter = nodemailer.createTransport({
	host: mailHost,
    port: mailPort,
	secure: false,
	service: 'gmail',
	auth: {
	  user: process.env.GMAIL,
	  pass: process.env.PASSWORD_APP
	}
  });

module.exports = transporter;