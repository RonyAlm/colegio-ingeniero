import { Resend } from "resend"

const EMAIL_FROM = process.env.EMAIL_FROM
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO
const RESEND_API_KEY = process.env.RESEND_API_KEY
const URL_FRONTEND = process.env.URL_FRONTEND

const resend = new Resend(RESEND_API_KEY)

const rateLimit = new Map()

export default async function handler(req, res) {

    // permitir CORS solo a tu dominio
    // res.setHeader("Access-Control-Allow-Origin", "https://tudominio.com")
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
        return res.status(200).end()
    }

    if (req.method !== "POST") {
        return res.status(405).end()
    }

    const ip =
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress

    const now = Date.now()
    const last = rateLimit.get(ip) || 0

    // rate limit 10s
    // if (now - last < 10000) {
    //     return res.status(429).json({ error: "Too many requests" })
    // }

    // rateLimit.set(ip, now)

    const { name, email, phone, subject, message, company } = req.body

    // honeypot anti bots
    if (company) {
        return res.status(400).end()
    }

    try {

        await resend.emails.send({
            from: EMAIL_FROM,
            to: "rony.almiron.020@gmail.com",
            subject: subject,
            html: `
                <h3>Nuevo mensaje</h3>
                <p><b>Nombre:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Telefono:</b> ${phone}</p>
                <p><b>Asunto:</b> ${subject}</p>
                <p><b>Mensaje:</b></p>
                <p>${message}</p>
            `
        })

        res.status(200).json({ success: true, message: "Email sent" })

    } catch (e) {
        res.status(500).json({ error: "Email error" })
    }

}