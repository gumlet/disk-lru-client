const LRU = require("../index");

let lrucache;

beforeAll(async function() {
  lrucache = new LRU('localhost', 4001);
});

describe('Client Test', () => {
  test('set value', async () => {
  	let resp = await lrucache.set("key1", "key1_value");
  	expect(resp).toBe(true);
  });

  test('check if key exists', async () => {
  	let resp = await lrucache.has("key1");
  	expect(resp).toBe(true);
  });

  test('get value', async () => {
  	let resp = await lrucache.get("key1");
  	expect(resp.toString()).toBe("key1_value");
  });

  test('getting non-existent value should return undefined', async () => {
  	let resp = await lrucache.get("key2");
  	expect(resp).toBe(undefined);
  });

  test('checking for non-existent key should return false', async () => {
  	let resp = await lrucache.has("key2");
  	expect(resp).toBe(false);
  });

  test('getting non-existent value should return undefined', async () => {
  	let resp = await lrucache.get("key2");
  	expect(resp).toBe(undefined);
  });

  test('delete by key', async () => {
  	let resp = await lrucache.delete("key1");
  	expect(resp).toBe(true);
  });

  test('getting key after deleting should return undefined', async () => {
  	let resp = await lrucache.get("key1");
  	expect(resp).toBe(undefined);
  });
});
