export class HTTPResponeBuilder {

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

export class HTTPRequestParser {
    _rawRequest = ''
    request = {
        method: '',
        url: '',
        protocol: '',
        headers: {},
        body: ''
    }
    constructor(request) {
        this._rawRequest = request
        this.request = this._parse()
    }

    get method() {
        return this.request.method
    }

    get url() {
        return this.request.url
    }

    get protocol() {
        return this.request.protocol
    }

    getHeader(headerKey) {
        return this.request.headers[headerKey]
    }
    
    
    _parse() {
       
        const lines = this._rawRequest.split('\n')
        const body = lines[lines.length - 1]
        const headers = lines.slice(1, lines.length - 2)
        .reduce((acc, line) => {
            const [key, value] = line.split(':')
            acc[key] = value
            return acc
        }, {})

        const[method , url , protocol]  = lines[0].split(' ')
        return {
            method,
            url,
            protocol,
            headers,
            body
        }
    }
}