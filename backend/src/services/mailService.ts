import nodeMailer from 'nodemailer';
const { EMAIL_HOST, USER_EMAIL, APP_PASSWORD , SERVICE } = require('../constants/index');



// reusable transporter object
// do transported.sendMail() to send email
const transporter = nodeMailer.createTransport({
    host: EMAIL_HOST,
    service: SERVICE,
    port: 465,
    secure: true,
    auth: {
        user: USER_EMAIL,
        pass: APP_PASSWORD
    }
});




// ------------------ email verification during registration ------------------

export const sendRandomMail = async(email: string, subject: string, text: string) => {
    try {
        const message = {
            from: USER_EMAIL,
            to: email,
            subject: subject,
            text: text
        }

        await transporter.sendMail(message);
    } catch (error) {
        console.log(error);
    }
}
