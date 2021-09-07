# Disk LRU Client - Nodejs
Nodejs client for [Disk LRU server](https://github.com/gumlet/disk-lru-server)

```bash

npm install @gumlet/disk-lru-client

```

Usage:

```javascript

// this contructor takes hostname and port as its arguments.
const lrucache = new LRU('localhost', 4001);

(async () => {
	await lrucache.set("key1","key1_value");

	// returns value as buffer.
	let val = await lrucache.get("key1"); 

	// has method checks existance of key
	let isAvailable = await lrucache.has("key1"); 

	// delete method deletes value from key
	let resp = await lrucache.delete("key1"); 
})();

```