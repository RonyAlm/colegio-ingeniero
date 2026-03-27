import { Resend } from "resend"

const EMAIL_FROM = process.env.EMAIL_FROM
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO
const RESEND_API_KEY = process.env.RESEND_API_KEY
const URL_FRONTEND = process.env.URL_FRONTEND

const resend = new Resend(RESEND_API_KEY)

const rateLimit = new Map()

function generarHTML({ name, phone, message, email, subject }) {
    return `
    <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; margin:20px auto; border-radius:8px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#2e7d32; padding:20px; text-align:center;">
              <img 
                src="https://res.cloudinary.com/du86bx5o0/image/upload/v1768231863/logo_2_2283e1492c.png" 
                alt="Logo" 
                width="120" 
                style="display:block; margin:auto;"
              >
            </td>
          </tr>

          <!-- Título -->
          <tr>
            <td style="padding:30px; text-align:center;">
              <h1 style="color:#2e7d32; margin:0;">{{subject}}</h1>
              <p style="color:#555; font-size:16px;">
                Mensaje recibido desde la página de contacto de Colegio Público de Ingenieros de Formosa
              </p>
            </td>
          </tr>

          <!-- Contenido dinámico -->
          <tr>
            <td style="padding:20px 30px; color:#444; font-size:15px; line-height:1.6;">
              <p>De parte de {{nombre}}, se ha enviado el siguiente mensaje:</p>
              <span>Telefono: {{telefono}}</span>
              <p>
                {{mensaje}}
              </p>

              
              <p>Saludos cordiales,<br><strong>Institucional</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#eeeeee; padding:20px; text-align:center; font-size:12px; color:#555;">
              <p><strong>Sede Social:</strong> Av. Gutnisky N° 1870</p>
              <p><strong>Sede Administrativa:</strong> Av. 9 de Julio N° 498</p>
              <p><strong>Horarios:</strong> Lunes a Viernes de 8 a 12:30hs</p>

              <p><strong>Email:</strong> ingenierosformosa@gmail.com</p>
              <p><strong>WhatsApp:</strong> 3705 043114</p>
              <p><strong>Teléfono:</strong> 3705 383748</p>

              <p style="margin-top:10px; font-size:11px; color:#888;">
                © 2026 Institucional
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `
        .replace("{{nombre}}", nombre)
        .replace("{{mensaje}}", mensaje)
        .replace("{{email}}", email)
        .replace("{{asunto}}", subject)
        .replace("{{telefono}}", phone);
}

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

        const html = generarHTML({ name, email, phone, message, subject })

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