const { createTransport } = require("nodemailer")

const sendMail =async({to, subject, text,html})=>{ //html is option
    const transporter = createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: true,
        port: 587,
        auth: {
            user:process.env.APP_MAIL,
            pass: process.env.APP_PASSWORD
        }
    })
    const info = await transporter.sendMail({
        from: process.env.APP_MAIL,
        to,
        subject,
        text,
        html
    })
    console.log(info);
}
 module.exports = {sendMail}