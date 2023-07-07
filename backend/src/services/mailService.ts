import nodeMailer from 'nodemailer';
const { EMAIL_HOST, USER_EMAIL, USER_PASSWORD, SERVICE } = require('../constants/index');



// reusable transporter object
// do transported.sendMail() to send email
const transporter = nodeMailer.createTransport({
    host: EMAIL_HOST,
    service: SERVICE,
    port: 587,
    secure: true,
    auth: {
        user: USER_EMAIL,
        pass: USER_PASSWORD
    }
});




// ------------------ email verification during registration ------------------


