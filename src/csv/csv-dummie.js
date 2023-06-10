import http from 'node:http'
import fs from 'node:fs'
import { isUtf8 } from 'node:buffer'
import { parse } from 'csv-parse'
import { Readable } from 'node:stream';
import { type } from 'node:os';
import { generate } from 'csv';
import  assert  from 'assert';
import { debug } from 'node:console';


//const server = http.createServer( async (req, res) => {
    //const records = await ImportCSV()

    const csvUrl = new URL('tasks.csv', import.meta.url)
  const stream = fs.createReadStream(csvUrl)

  const parser = parse({
    group_columns_by_name: true,
    columns: true,
    delimiter: ','
  })

  async function run() {
    const lineParse = stream.pipe(parser)
    for await (const line of lineParse){
      const {title, description} = line

      console.log(title)
      console.log(description)

      await fetch('http://127.0.0.1:666/tasks',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      })
    await new Promise((resolve) => setTimeout(resolve, 1000))

    }
  }
run()
//}//)


