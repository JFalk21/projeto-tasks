import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js"
import { randomUUID } from 'node:crypto';

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {

            const tasks = database.select('tasks')

            return res.writeHead(200).end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const data = req.body
            
            const dates = {
                completed_at: null,
                updated_at: null,
                created_at: Date()
            }
            
            const task = {
                id: randomUUID(),
                ...data,
                ...dates
            }

            if(!database.insert('tasks', task)){
                return res.writeHead(400).end()
            }
            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {

            const { id } = req.groups

            const deleted = database.remove('tasks', id)

            if(!deleted) {
                return res.writeHead(400).end(JSON.stringify())
            }

            return res.writeHead(200).end(JSON.stringify(deleted))
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {

            const { id } = req.groups

            const {title, description} = req.body

            const statusCode = database.update('tasks', id, {title, description})

            return res.writeHead(statusCode).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.groups

            let task = database.completeTask('tasks', id)

            return res.writeHead(200).end()
        }
    }
]