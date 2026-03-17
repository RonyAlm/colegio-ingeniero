const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos
let cache = { data: null, timestamp: 0 }

export default async function handler(req, res) {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
        return res.status(200).end()
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" })
    }

    // Parámetro limit (default 6, max 30)
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 6, 1), 30)

    try {
        const now = Date.now()

        // Servir desde cache si es válido y tiene suficientes items
        if (cache.data && (now - cache.timestamp < CACHE_DURATION) && cache.data.length >= limit) {
            return res.status(200).json({
                success: true,
                data: cache.data.slice(0, limit),
                cached: true
            })
        }

        if (!INSTAGRAM_TOKEN || !INSTAGRAM_USER_ID) {
            return res.status(500).json({
                error: "Instagram credentials not configured"
            })
        }

        // Obtener media del usuario desde Instagram Graph API
        const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp"
        const url = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=${fields}&limit=30&access_token=${INSTAGRAM_TOKEN}`

        const response = await fetch(url)

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error("Instagram API error:", errorData)
            return res.status(response.status).json({
                error: "Instagram API error",
                details: errorData?.error?.message || "Unknown error"
            })
        }

        const result = await response.json()

        // Mapear los datos para simplificar la respuesta
        const posts = (result.data || []).map((post) => ({
            id: post.id,
            caption: post.caption || "",
            mediaType: post.media_type, // IMAGE, VIDEO, CAROUSEL_ALBUM
            mediaUrl: post.media_url,
            thumbnailUrl: post.thumbnail_url || post.media_url, // Videos usan thumbnail
            permalink: post.permalink,
            timestamp: post.timestamp,
        }))

        // Actualizar cache
        cache = { data: posts, timestamp: now }

        res.status(200).json({
            success: true,
            data: posts.slice(0, limit),
            cached: false
        })

    } catch (e) {
        console.error("Instagram handler error:", e)
        res.status(500).json({ error: "Internal server error" })
    }
}
