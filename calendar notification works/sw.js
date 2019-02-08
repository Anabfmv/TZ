self.addEventListener('install', function(event) {
   event.waitUntil(
     caches.open('v1').then(function(cache) {
       return cache.addAll([
         '/index.html',
         '/favicon.ico',
         '/js/',
         '/css/',
        '/css/demo.css',
         'css/theme2.css',
         '/js/demo.js',
         '/js/calendar.js',
       ]);
     })
   );
  console.log('Установлен');
});


self.addEventListener('activate', (event) => {
  console.log('Активирован');
});

self.addEventListener('fetch', function(event) {
  if(event.request)
  {
    console.log('Происходит запрос на сервер', event.request.url);
    event.respondWith(caches.match(event.request).then(function(response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          // response may be used only once
          // we need to save clone to put one copy in cache
          // and serve second one
          let responseClone = response.clone();
          
          caches.open('v1').then(function (cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        }).catch(function () {
          return "test";
        });
      }
    }))
  }
});

self.addEventListener('push', function (event) {
  console.log('Происходит пуш');
});