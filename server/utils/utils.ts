import {H3Event} from "h3";
import nodemailer from "nodemailer";
import {IUser} from "~~/server/models/user.model";
import {Token} from "~~/server/models/token.model";

const {mailUser, mailPassword, devMode} = useRuntimeConfig()
console.log(mailUser)

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: mailUser,
        pass: mailPassword,
    },
});
//transporter.verify().then(e=>console.log('Mail verify', e)).catch(e=>console.error('mail send ERROR: ', e));
//sendMail({to:'abrikoz@gmail.com'}).then(console.log)

export async function sendMail(mailData: any) {
    try {
        return transporter.sendMail({
            from: mailUser,
            to: devMode ? 'abrikoz@gmail.com' : mailData.to,
            subject: 'Сайт абрикоса: ' + mailData.subject,
            text: mailData.text + '\n-------------------\nСообщение отправлено ботом'
        })
    }catch(err) {
        return err
    }
}

export default {
    sendMail,
    adaptUser(user: IUser) {
        if (user) {
            user.passwordHash = ''
            user.restorePassword = ''
        }
        return user
    },
    async setAuthToken(event: H3Event, user: IUser) {
        const config = useRuntimeConfig(event)
        const token = await Token.create({user})
        setCookie(event, config.public.authTokenName, token.access, {maxAge: config.public.authExpiration})
        return token
    },
    sleep(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    },

}
