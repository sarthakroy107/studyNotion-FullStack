const nodemailer = require("nodemailer");
require("dotenv").config();
console.log(process.env.MAIL_HOST)
console.log(process.env.MAIL_PASS)
console.log(process.env.MAIL_USER)

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })
            console.log("I'm here")

            let info = await transporter.sendMail({
                from: 'sarthakroy2003@gmail.com',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;