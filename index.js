const needle = require("needle"),
	http = require("http"),
 	https = require("https");

http.globalAgent.keepAlive = true;
https.globalAgent.keepAlive = true;

class DiskLRUClient {
  constructor(hostname, port) {
    this.hostname = hostname || 'localhost';
    this.port = port || 4001;
  }

  async get(key) {
  	try {
  		let resp = await needle('get',`http://${this.hostname}:${this.port}/lrucache/${key}`, {
		    response_timeout: 30000,
				read_timeout: 50000
  		});
  		if(resp.statusCode >= 300) {
  			return undefined;
  		} else {
    		return resp.body;
  		}
  	} catch (err) {
  		return undefined;
  	}
  }

  async has(key) {
  	try {
  		let resp = await needle('head',`http://${this.hostname}:${this.port}/lrucache/${key}`, {
		    response_timeout: 30000,
				read_timeout: 50000
  		});

  		if(resp.statusCode >= 300) {
  			return false;
  		} else {
    		return true;
  		}
  	} catch (err) {
  		return false;
  	}
  }

  async set(key, value) {
  	try {
  		let resp = await needle('put',`http://${this.hostname}:${this.port}/lrucache/${key}`,value, {
		    response_timeout: 30000,
				read_timeout: 50000,
				headers: {
					"content-type": "application/octet-stream"
				}
  		});
  		if(resp.statusCode >= 300) {
  			return false;
  		} else {
    		return true;
  		}
    	return true;
  	} catch (err) {
  		return false;
  	}
  }

  async delete(key) {
  	try {
  		let resp = await needle('delete',`http://${this.hostname}:${this.port}/lrucache/${key}`,null, {
		    response_timeout: 30000,
				read_timeout: 50000
  		});
  		if(resp.statusCode >= 300) {
  			return false;
  		} else {
    		return true;
  		}
  	} catch (err) {
  		return false;
  	}
  }
}

module.exports = DiskLRUClient;