const got = require("got"),
	http = require("http"),
 	https = require("https");

const agent = {
  http: new http.Agent({
    keepAlive: true
  }),
  https: new https.Agent({
    keepAlive: true
  })
};

class DiskLRUClient {
  constructor(hostname, port) {
    this.hostname = hostname || 'localhost';
    this.port = port || 4001;
  }

  async get(key) {
  	try {
  		let resp = await got.get(`http://${this.hostname}:${this.port}/lrucache/${key}`, {
		    http2: false,
		    agent,
		    dnsCache: false,
		    responseType: 'buffer',
		    retry: 0,
		    timeout: 50000
  		});

    	return resp.body;
  	} catch (err) {
  		return undefined;
  	}
  }

  async has(key) {
  	try {
  		let resp = await got.head(`http://${this.hostname}:${this.port}/lrucache/${key}`, {
		    http2: false,
		    agent,
		    dnsCache: false,
		    responseType: 'buffer',
		    retry: 0,
		    timeout: 50000
  		});
    	return true;
  	} catch (err) {
  		return false;
  	}
  }

  async set(key, value) {
  	try {
  		let resp = await got.put(`http://${this.hostname}:${this.port}/lrucache/${key}`, {
		    http2: false,
		    agent,
		    dnsCache: false,
		    responseType: 'buffer',
		    retry: 0,
		    body: value,
		    timeout: 50000,
		    headers: {
		    	"content-type": "application/octet-stream"
		    },
  		});
    	return true;
  	} catch (err) {
  		return false;
  	}
  }

  async delete(key) {
  	try {
  		let resp = await got.delete(`http://${this.hostname}:${this.port}/lrucache/${key}`, {
		    http2: false,
		    agent,
		    dnsCache: false,
		    responseType: 'buffer',
		    retry: 0,
		    timeout: 50000
  		});

    	return true;
  	} catch (err) {
  		return false;
  	}
  }
}

module.exports = DiskLRUClient;