import net from 'node:net'

class HTTPResponeBuilder {

    _protocol = 'HTTP/1.1'
    _statusCode = 200
    _header = ''
    _body = ''


     _buildResponse() {
        if (this._body.length > 0) {
            this.writeHeader('Content-Length', this._body.length);
        }
        return `${this._protocol} ${this._statusCode}\n${this._header}\n${this._body}`
    }

    statusCode(statusCode) {
        this._statusCode = statusCode
        return this
    }

    protocol(protocol) {
        this._protocol = protocol
        return this
    }

    writeHeader(key , value) {
        this._header += `${key}: ${value}\n`
        return this
    }

    body(body) {
        this._body += body
        return this
    }

    json(json) {
        this.writeHeader('Content-Type', 'application/json')
        this._body = JSON.stringify(json);
        const response = this._buildResponse();
        return response
    }

    build() {
        
        const response = this._buildResponse();
        return response
    }
}

const server = net.createServer(conn => {
    const buffer = Buffer.alloc(0)
    
    // fd = file descriptor
    
    conn.on('data' , buff => {
        const data = Buffer.concat([buffer, buff])
        const request = data.toString();

        // const response = new HTTPResponeBuilder()
        //     .statusCode(200)
        //     .writeHeader('Content-Type', 'text/plain')
        //     .body('Hello World!')
        //     .build()
        const response = new HTTPResponeBuilder().json({name: 'John Doe'});
        console.log({response})

        conn.write(response)


        return conn.destroy()



//         if (request.startsWith('GET')) {
//             const response = new HTTPResponeBuilder()
//                 .statusCode(200)
//                 .writeHeader('Content-Type', 'text/plain')
//                 .body('Hello World!')
//                 .build()
//             console.log({response})

//              conn.write(response)


//             // const response2 = new HTTPResponeBuilder().json({name: 'John Doe'});
//             // conn.write(response2)
//             return conn.destroy()

          
//         }

//         if (request.startsWith('POST')) {
//             conn.write(`
// HTTP/1.1 200 OK
// Content-Length: 12
// Content-Type: text/plain

// Hello World!`);
//             return conn.destroy()
//         }

    })
        
})

// timers queue
// 




server.listen('3000')