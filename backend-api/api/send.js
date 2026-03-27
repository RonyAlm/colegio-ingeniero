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

        const html =
            `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefono:</strong> ${phone}</p>
            <p><strong>Asunto:</strong> ${subject}</p>
            <p><strong>Mensaje:</strong></p>
            <hr>
            <p>${message}</p> `

        await resend.emails.send({
            from: EMAIL_FROM,
            to: EMAIL_REPLY_TO,
            subject: subject,
            html: html
        })

        res.status(200).json({ success: true, message: "Email sent" })

    } catch (e) {
        res.status(500).json({ error: "Email error" })
    }

}