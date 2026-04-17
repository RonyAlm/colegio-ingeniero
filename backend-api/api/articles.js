import mysql from "mysql2/promise"

const DB_NAME = process.env.DATABASE_NAME
const DB_PORT = process.env.DATABASE_PORT
const DB_USERNAME = process.env.DATABASE_USERNAME
const DB_HOST = process.env.DATABASE_HOST
const DB_USER = process.env.DATABASE_USER
const DB_PASSWORD = process.env.DATABASE_PASSWORD
const URL_FRONTEND = process.env.URL_FRONTEND

// 🔌 Pool de conexiones (optimizado para serverless)
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false,
    },
})

// 🛡 Rate limit simple
const rateLimit = new Map()

export default async function handler(req, res) {

    // 🛡 CORS (restringido a tu dominio)
    // const allowedOrigin = URL_FRONTEND
    const allowedOrigin = "*"
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin)
    res.setHeader("Access-Control-Allow-Methods", "GET")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
        return res.status(200).end()
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    // 🛡 Rate limit por IP
    // const ip =
    //     req.headers["x-forwarded-for"] ||
    //     req.socket?.remoteAddress ||
    //     "unknown"

    // const now = Date.now()
    // const last = rateLimit.get(ip) || 0

    // if (now - last < 2000) {
    //     return res.status(429).json({ error: "Too many requests" })
    // }

    // rateLimit.set(ip, now)

    try {

        // 📥 Params seguros
        const page = Math.max(parseInt(req.query["pagination[page]"]) || 1, 1)

        const pageSize = Math.min(
            Math.max(parseInt(req.query["pagination[pageSize]"]) || 10, 1),
            50
        )

        const offset = (page - 1) * pageSize

        // 📊 Total (optimizado sin joins pesados)
        const [countResult] = await pool.query(
            "SELECT COUNT(*) as total FROM articles WHERE published_at IS NOT NULL"
        )

        const total = countResult[0].total

        // 📄 Query principal (tu query + paginación)
        const [rows] = await pool.query(
            `
                SELECT 
                a.*,
                c.name AS category,
                f.url AS cover

                FROM articles a

                LEFT JOIN articles_category_lnk acl 
                ON a.id = acl.article_id

                LEFT JOIN categories c 
                ON c.id = acl.category_id

                LEFT JOIN files_related_mph frm 
                ON frm.related_id = a.id
                AND frm.related_type = 'api::article.article'
                AND frm.field = 'cover'   -- 🔥 clave

                LEFT JOIN files f 
                ON f.id = frm.file_id

                WHERE a.published_at IS NOT NULL

                ORDER BY a.published_at DESC
                LIMIT ? OFFSET ?
            `,
            [pageSize, offset]
        )

        // ⚡ Cache edge (Vercel CDN)
        res.setHeader(
            "Cache-Control",
            "public, s-maxage=60, stale-while-revalidate=120"
        )

        // 📦 Response tipo CMS
        return res.status(200).json({
            data: rows,
            meta: {
                pagination: {
                    page,
                    pageSize,
                    pageCount: Math.ceil(total / pageSize),
                    total
                }
            }
        })

    } catch (error) {

        console.error("DB ERROR:", error)

        return res.status(500).json({
            error: "Internal server error",
            details: error
        })

    }

}