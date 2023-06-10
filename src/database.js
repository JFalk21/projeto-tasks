import { log, table } from 'node:console';
import fs from 'node:fs/promises'

const dbPath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    #persist() {
        fs.writeFile(dbPath, JSON.stringify(this.#database));        
    }


    constructor() {
        fs.readFile(dbPath, 'utf8').then( data =>{
            this.#database = JSON.parse(data)
        }).catch(()=>{
            this.#persist() 
       })
    }   

    insert(table, newTask) {
        if(Array.isArray(this.#database[table])) {
            const index = this.#database[table].findIndex( task => task.id = newTask.id)

            if(index > -1) {
                this.#database[table].push(newTask)

            } else {
                return this.#database[table]
            }
        } else {
            this.#database[table] = [newTask]
        }
        this.#persist()

        return true
    }

    select(table) {
        return this.#database[table]
    }

    remove(table, id) {
        if(Array.isArray(this.#database[table])) { 
            const index = this.#database[table].findIndex( task => id == task.id)

            if(index > -1){
                const deleted = this.#database[table].splice(index,1)
                this.#persist();
                return deleted
            }
        } else{
            return this.#database[table]
        }
    }

    update(table, id, data) {
        if(Array.isArray(this.#database[table])){
            const index = this.#database[table].findIndex( task => id == task.id)

            if(index > -1){
                let task = this.#database[table][index]
                if(task.completed_at == null) {

                    task.title = data.title
                    task.description = data.description
                    task.updated_at = Date();

                    this.#database[table][index] = task

                    this.#persist()
                    return 202
                } else {
                    return 400
                }
            } else {
                return 400
            }
        } else {
            return 400
        }
    }

    completeTask(table, id) {
        if(Array.isArray(this.#database[table])){
            const indexOf = this.#database[table].findIndex( task => id == task.id)

            if(indexOf > -1) {
                let task = this.#database[table][indexOf]
                if(task.completed_at == null){
                    task.completed_at = Date()

                    this.#database[table][indexOf] = task
                    this.#persist()

                    return 200
                }
                else {
                    return 400
                }
            }
        } else {
            return 402
        }
    }
}