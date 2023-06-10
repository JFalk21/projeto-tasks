export async function json(req,res) {
    
    const buffer = []

    for await (const chunk of req) {
        buffer.push(chunk)
    }

    if(buffer) {
        req.body = JSON.parse(Buffer.concat(buffer).toString())
    } else {
        req.body = null
    }

    res.setHeader('Content-Type', 'application/json')
}