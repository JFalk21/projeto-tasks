import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middleware/json.js'
import { extractQueryParams } from './utils/extract-query-params.js'



const server = http.createServer(  async (req, res) => {
    const { method, url } = req


    await json(req, res)


    const route = routes.find(route => {

        return route.path.test(url) && method == route.method
    })

    if(route) {

        const routeParams = url.match(route.path)
      
        const {query, ...groups} = routeParams.groups

        req.query = query ? extractQueryParams(query) : {}
        req.groups = groups

        return route.handler(req,res)
    } 

    res.writeHead(404).end(JSON.stringify(route))
})


const hostname = '127.0.0.1'
const port = 666

server.listen(port, hostname, () => { 
    //TODO: Algo
})  