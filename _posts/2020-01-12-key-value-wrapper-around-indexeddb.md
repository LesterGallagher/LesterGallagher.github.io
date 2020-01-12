---
layout: post
lang: en
title: Key value wrapper around IndexedDB
description: Creating a transactional promise based and fast IndexedDB key value wrapper
portal_title: ''
portal_description: ''
portal_image: ''
portal_link: ''
image: "/uploads/indexeddb.png"
date: 2020-01-12 00:00:00 +0100
author: Sem Postma

---
Local-storage can be slow because local-storage's CRUD operations are synchronous so they pause rendering, script execution, etc. If you want to anything more complex than a string in local-storage, you will have to serialize/de-serialize your data which also causes an extra performance impact. Storing blobs and files is even more tricky, you will have to convert blobs and files to bloated base64 strings. You can solve all of this by using IndexedDB, but you will soon notice there's a giant difference between the two API's, this wrapper attempts to gap those differences.

_Make sure to use the following polyfills when necessary:_ [_https://github.com/eligrey/Blob.js_](https://github.com/eligrey/Blob.js "https://github.com/eligrey/Blob.js") _and_ [_https://github.com/stefanpenner/es6-promise_](https://github.com/stefanpenner/es6-promise "https://github.com/stefanpenner/es6-promise")

Example:

```javascript
const cacheStore = require('./indexeddb-wrapper-file') // es6
import cacheStore from './indexeddb-wrapper-file' // commonjs
var cacheStore = window.cacheStore // compiled javascript

cacheStore.set('my_key', { myAwesome: 'complexObject' })
	.then(function() {
  		return cacheStore.get('my_key')
	}).then(function(myKey) {
      	console.log('myKey', myKey)
    })
```

_After deleting the store in devtools you might see an error in the console, you should bump the "VERSION" any time you delete database stores so the browser knows it should create new object stores._

Steps to add a new store:

1. Name your store: `const APP_PERSISTENCE = "APP_PERSISTENCE";`
2. Add it to the array of stores: `const stores = [CACHE_STORE, APP_PERSISTENCE];`
3. Bump the version: `const VERSION = n;` to `const VERSION = n+1;`
4. Instantiate a wrapper around the store: `const myStoreWrapper = indexedDBStorage(APP_PERSISTENCE)`

You might want to check if "error.name === 'QuotaExceededError'" in transaction.onabort. If this is the case, alert the user about there not being enough storage space on the device.

Javascript:

```javascript
const VERSION = 1;
const CACHE_STORE = "CACHE_STORE";
const DATABASE_NAME = window.location.origin;
const stores = [CACHE_STORE];
const request = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB)
    .open(DATABASE_NAME, VERSION);
const db = new Promise((resolve, reject) => {
    request.onsuccess = (e) => {
        resolve(e.target.result);
    };
    request.onerror = (e) => {
        reject(e);
    };
    request.onupgradeneeded = (e) => {
        const db = e.target.result;
        stores.forEach((store) => {
            if (!db.objectStoreNames.contains(store)) {
                db.createObjectStore(store);
            }
        });
    };
    request.onblocked = (e) => {
        reject(e);
    };
});
const indexedDBStorage = (name) => {
    const get = (key) => db.then((database) => new Promise((resolve, reject) => {
        let transaction = database.transaction([name], "readonly");
        transaction.onabort = function (e) {
            let error = e.target.error;
            throw error;
        };
        const store = transaction.objectStore(name);
        let request = store.get(key);
        request.onsuccess = function (e) { resolve(e.target.result); };
        request.onerror = reject;
    }));
    const keys = () => db.then((database) => new Promise((resolve, reject) => {
        let transaction = database.transaction([name], "readonly");
        transaction.onabort = function (e) {
            let error = e.target.error;
            throw error;
        };
        const store = transaction.objectStore(name);
        let request = store.getAllKeys();
        request.onsuccess = function (e) { resolve(e.target.result); };
        request.onerror = reject;
    }));
    const set = (key, value) => db.then((database) => new Promise((resolve, reject) => {
        let transaction = database.transaction([name], "readwrite");
        transaction.onabort = function (e) {
            let error = e.target.error;
            throw error;
        };
        const store = transaction.objectStore(name);
        let request = store.put(value, key);
        request.onsuccess = () => {
            resolve();
        };
        request.onerror = reject;
    }));
    const indexedDbDelete = (key) => db.then((database) => new Promise((resolve, reject) => {
        let transaction = database.transaction([name], "readwrite");
        transaction.onabort = function (e) {
            let error = e.target.error;
            throw error;
        };
        const store = transaction.objectStore(name);
        let request = store.delete(key);
        request.onsuccess = resolve;
        request.onerror = reject;
    }));
    const purgeDatabase = () => db.then((database) => new Promise((resolve, reject) => {
        let transaction = database.transaction([name], "readwrite");
        transaction.onabort = function (e) {
            let error = e.target.error;
            throw error;
        };
        const store = transaction.objectStore(name);
        let request = store.clear();
        request.onsuccess = resolve;
        request.onerror = reject;
    }));
    const deleteDatabase = () => {
        window.indexedDB.deleteDatabase(window.location.origin);
    };
    return {
        get,
        set,
        delete: indexedDbDelete,
        purgeDatabase,
        deleteDatabase,
        keys
    };
};
export default indexedDBStorage(CACHE_STORE);
```

Typescript:

```typescript
const VERSION = 1;
const CACHE_STORE = "CACHE_STORE";
const DATABASE_NAME = window.location.origin;

const stores = [CACHE_STORE];

const request = (window.indexedDB || (window as any).mozIndexedDB || (window as any).webkitIndexedDB)
.open(DATABASE_NAME, VERSION);

const db = new Promise((resolve, reject) => {
  request.onsuccess = (e) => {
    resolve((e.target as any).result);
  };
  request.onerror = (e) => {
    reject(e);
  };
  request.onupgradeneeded = (e) => {
    const db = (e.target as any).result;
    stores.forEach((store) => {
      if (!db.objectStoreNames.contains(store)) {
        db.createObjectStore(store);
      }
    });
  };

  request.onblocked = (e) => {
    reject(e);
  };

});

const indexedDBStorage = (name: string) => {
  const get = (key: string) => db.then((database: any) => new Promise((resolve, reject) => {
    let transaction = database.transaction([name], "readonly");
    transaction.onabort = function(e: any) {
      let error = e.target.error;
      throw error;
    };
    const store = transaction.objectStore(name);
    let request = store.get(key);
    request.onsuccess = function(e: any) { resolve(e.target.result as any); };
    request.onerror = reject;
  }));

  const keys = () => db.then((database: any) => new Promise((resolve, reject) => {
    let transaction = database.transaction([name], "readonly");
    transaction.onabort = function(e: any) {
      let error = e.target.error;
      throw error;
    };
    const store = transaction.objectStore(name);
    let request = store.getAllKeys()
    request.onsuccess = function(e: any) { resolve(e.target.result as any); };
    request.onerror = reject;
  }));

  const set = (key: string, value: any) => db.then((database: any) => new Promise((resolve, reject) => {
    let transaction = database.transaction([name], "readwrite");
    transaction.onabort = function(e: any) {
      let error = e.target.error;
      throw error;
    };
    const store = transaction.objectStore(name);
    let request = store.put(value, key);
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = reject;
  }));

  const indexedDbDelete = (key: string) => db.then((database: any) => new Promise((resolve, reject) => {
    let transaction = database.transaction([name], "readwrite");
    transaction.onabort = function(e: any) {
      let error = e.target.error;
      throw error;
    };
    const store = transaction.objectStore(name);
    let request = store.delete(key);
    request.onsuccess = resolve;
    request.onerror = reject;
  }));

  const purgeDatabase = () => db.then((database: any) => new Promise((resolve, reject) => {
    let transaction = database.transaction([name], "readwrite");
    transaction.onabort = function(e: any) {
      let error = e.target.error;
      throw error;
    };
    const store = transaction.objectStore(name);
    let request = store.clear();
    request.onsuccess = resolve;
    request.onerror = reject;
  }));

  const deleteDatabase = () => {
    window.indexedDB.deleteDatabase(window.location.origin);
  };

  return {
    get,
    set,
    delete: indexedDbDelete,
    purgeDatabase,
    deleteDatabase,
    keys
  };
};

export default indexedDBStorage(CACHE_STORE);
```

Compiled Javascript:

```javascript
(function() {
  var VERSION = 1;
  var CACHE_STORE = "CACHE_STORE";
  var DATABASE_NAME = window.location.origin;
  var stores = [CACHE_STORE];
  var request = (
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB
  ).open(DATABASE_NAME, VERSION);
  var db = new Promise(function(resolve, reject) {
    request.onsuccess = function(e) {
      resolve(e.target.result);
    };

    request.onerror = function(e) {
      reject(e);
    };

    request.onupgradeneeded = function(e) {
      var db = e.target.result;
      stores.forEach(function(store) {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store);
        }
      });
    };

    request.onblocked = function(e) {
      reject(e);
    };
  });

  var indexedDBStorage = function indexedDBStorage(name) {
    var get = function get(key) {
      return db.then(function(database) {
        return new Promise(function(resolve, reject) {
          var transaction = database.transaction([name], "readonly");

          transaction.onabort = function(e) {
            var error = e.target.error; 
            throw error;
          };

          var store = transaction.objectStore(name);
          var request = store.get(key);

          request.onsuccess = function(e) {
            resolve(e.target.result);
          };

          request.onerror = reject;
        });
      });
    };

    var keys = function keys() {
      return db.then(function(database) {
        return new Promise(function(resolve, reject) {
          var transaction = database.transaction([name], "readonly");

          transaction.onabort = function(e) {
            var error = e.target.error; 
            throw error;
          };

          var store = transaction.objectStore(name);
          var request = store.getAllKeys();

          request.onsuccess = function(e) {
            resolve(e.target.result);
          };

          request.onerror = reject;
        });
      });
    };

    var set = function set(key, value) {
      return db.then(function(database) {
        return new Promise(function(resolve, reject) {
          var transaction = database.transaction([name], "readwrite");

          transaction.onabort = function(e) {
            var error = e.target.error;
            throw error;
          };

          var store = transaction.objectStore(name);
          var request = store.put(value, key);

          request.onsuccess = function() {
            resolve();
          };

          request.onerror = reject;
        });
      });
    };

    var indexedDbDelete = function indexedDbDelete(key) {
      return db.then(function(database) {
        return new Promise(function(resolve, reject) {
          var transaction = database.transaction([name], "readwrite");

          transaction.onabort = function(e) {
            var error = e.target.error;
            throw error;
          };

          var store = transaction.objectStore(name);
          var request = store["delete"](key);
          request.onsuccess = resolve;
          request.onerror = reject;
        });
      });
    };

    var purgeDatabase = function purgeDatabase() {
      return db.then(function(database) {
        return new Promise(function(resolve, reject) {
          var transaction = database.transaction([name], "readwrite");

          transaction.onabort = function(e) {
            var error = e.target.error;
            throw error;
          };

          var store = transaction.objectStore(name);
          var request = store.clear();
          request.onsuccess = resolve;
          request.onerror = reject;
        });
      });
    };

    var deleteDatabase = function deleteDatabase() {
      window.indexedDB.deleteDatabase(window.location.origin);
    };

    return {
      get: get,
      set: set,
      delete: indexedDbDelete,
      purgeDatabase: purgeDatabase,
      deleteDatabase: deleteDatabase,
      keys: keys
    };
  };

  var _default = indexedDBStorage(CACHE_STORE);

  window.cacheStore = _default;
})();
```