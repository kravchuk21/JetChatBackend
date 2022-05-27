const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            service: process.env.SMTP_SERVISE,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            from: process.env.SMTP_USER
        })
    }

    async sendActivationMail(to, code, fullName) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'JET Chat: код активации',
            text: `Привет ${fullName}. Твой код активации ${code}`,
            html:
                `
                    <div>
                        <h1>Привет ${fullName}. Твой код активации <b>${code}</b></h1>
                    </div>
                `
        })
    }
}

module.exports = new MailService();
