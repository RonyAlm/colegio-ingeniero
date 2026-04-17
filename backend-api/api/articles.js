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
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
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
    const ip =
        req.headers["x-forwarded-for"] ||
        req.socket?.remoteAddress ||
        "unknown"

    const now = Date.now()
    const last = rateLimit.get(ip) || 0

    if (now - last < 2000) {
        return res.status(429).json({ error: "Too many requests" })
    }

    rateLimit.set(ip, now)

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
        articles.*, 
        categories.name as category, 
        files.url as cover 
      FROM articles 
      INNER JOIN articles_category_lnk 
        ON articles.id = articles_category_lnk.article_id 
      INNER JOIN categories 
        ON categories.id = articles_category_lnk.category_id
      INNER JOIN files_related_mph 
        ON files_related_mph.related_id = articles.id
      INNER JOIN files 
        ON files.id = files_related_mph.file_id
      WHERE articles.published_at IS NOT NULL 
      ORDER BY articles.published_at DESC
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