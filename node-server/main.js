import net from 'node:net'
import { HTTPRequestParser, HTTPResponeBuilder } from './utils.js'



const handleBuffer = (buffer) => {
    const request = buffer.toString()
    return new HTTPRequestParser(request)
}
const server = net.createServer(conn => {
    
    conn.on('data' , buff => {
       

        const request = handleBuffer(buff.toString())

        console.log(request.protocol)
        console.log(request.url)
        console.log(request.method)
        console.log(request.getHeader('User-Agent'))

    
        const response = new HTTPResponeBuilder().json({name: 'John Doe'});

        conn.write(response)


        return conn.destroy()

    })
        
})




server.listen('3000')

server.on('listening', () => {
    console.log('Server is listening on port 3000')
})