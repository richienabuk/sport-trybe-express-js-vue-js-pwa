import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    },
});

export const sendEmail = async (to, subject, text, html) => {
    await transporter.sendMail({
        from: '"Sport Trybe 👻" <no-reply@sporttrybe.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
    });
}
