import nodeMailer from 'nodemailer';
const { EMAIL_HOST, USER_EMAIL, APP_PASSWORD , SERVICE, SERVER_URL } = require('../constants/index');



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




// ------------------ email verification during registration ------------------

export const sendVerificationMail = async(name: string, user_id: number, email: string, token: string) => {
    try {
        const message = {
            from: USER_EMAIL,
            to: email,
            subject: 'Email Verification',
            html: `
                <h1>Hello ${name}</h1>
                <p>Thank you for registering on TradeSpace.</p>
                <p>Please click the link below to verify your email.</p>
                <a href="${SERVER_URL}/api/auth/verify-email/${user_id}/${token}">Verify Email</a>
            `
        }

        await transporter.sendMail(message);
    } catch (error) {
        console.log(error);
    }
}

// ro@ovi40
// 1234