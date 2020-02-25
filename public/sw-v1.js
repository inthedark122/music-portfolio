/**
 * Конфигурация сервис воркера
 */

const NO_CORS = false;
const CACHE_WHEN_FETCH = true;

const CACHE_NAME = "music-portfolio";
const cacheFiles = [
  "https://cdns-images.dzcdn.net/images/cover/c0d347b114b8819e38914df3f4f2e3b3/120x120-000000-80-0-0.jpg",
  "https://e-cdns-images.dzcdn.net/images/misc/b36ca681666d617edd0dcb5ab389a6ac/120x120-000000-80-0-0.jpg",
  "https://e-cdns-images.dzcdn.net/images/artist/a2b3908e7fc9bf8493c8fc67f9054c06/120x120-000000-80-0-0.jpg",
  "https://cdns-preview-9.dzcdn.net/stream/c-9dc1400c177f68e8556e8baf44248d6c-4.mp3",
  "https://cdns-preview-0.dzcdn.net/stream/c-0acc26a01722222d236b3dd9bcfc08c7-4.mp3",
  "https://cdns-preview-0.dzcdn.net/stream/c-02a58997880e22766ae0f70a93f088a7-4.mp3",
  "https://cdns-preview-6.dzcdn.net/stream/c-6a464f10a65c270fb66cfbfe59f37313-4.mp3",
  "https://cdns-preview-d.dzcdn.net/stream/c-d6290cad6afdfd877b4d89000f7585a4-4.mp3",
  "https://cdns-preview-b.dzcdn.net/stream/c-be02ebae90ad0b8ac61d0c51446738a7-4.mp3",
  "https://cdns-preview-1.dzcdn.net/stream/c-1ac2391805f27252b0861873e9cb3dd7-4.mp3",
  "https://cdns-preview-2.dzcdn.net/stream/c-2346e75e40834d0c499bc4deaa1ba26d-4.mp3",
  "https://cdns-preview-c.dzcdn.net/stream/c-cb6010af31ff3bc8dd052c920921a6d3-4.mp3",
  "https://cdns-preview-f.dzcdn.net/stream/c-f9a14cf3687c6de755e81993a244a7ae-4.mp3",
  "https://cdns-preview-9.dzcdn.net/stream/c-9177074907b59fe153f49f41e7fa1888-4.mp3",
  "https://cdns-preview-d.dzcdn.net/stream/c-df459c829c8d9c0543e41dadeb87018f-4.mp3",
  "https://cdns-preview-b.dzcdn.net/stream/c-b0ba02d12108b192b23c7d32ff6ba9ea-8.mp3",
  "https://cdns-preview-a.dzcdn.net/stream/c-abe985fd455bda39b8d10b38c5bc4332-4.mp3",
  "https://cdns-preview-8.dzcdn.net/stream/c-8c99bdab19ea1f1e40fd02ffd12fc009-4.mp3"
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        console.log("Opened cache");
        return cache
          .matchAll()
          .then(function(response) {
            const urls = response.map(function(res) {
              return res.url;
            });
            console.log("Changed urls:", urls);

            return cacheFiles.filter(function(filename) {
              return urls.indexOf(filename) === -1;
            });
          })
          .then(function(notChangedFiles) {
            console.log("Not changed urls:", notChangedFiles);
            if (NO_CORS) {
              // V2 - no cors
              return cache.addAll(
                notChangedFiles.map(function(urlToPrefetch) {
                  return new Request(urlToPrefetch, { mode: "no-cors" });
                })
              );
            } else {
              // V1 - cors
              return cache.addAll(notChangedFiles);
            }
          });
      })
      .catch(error => console.error("💩", error))
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", event => {
  console.log("V1 now ready to handle fetches!");
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log("Found ", event.request.url, " in cache");
          return response;
        }
        console.log("Network request for ", event.request.url);
        return fetch(event.request).then(response => {
          if (CACHE_WHEN_FETCH) {
            // Check if we received a valid response
            if (
              !response ||
              response.status !== 200 ||
              response.type !== "basic"
            ) {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            console.log("Save ", event.request.url, " into the cache");

            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseToCache);
            });

            return response;
          } else {
            return response;
          }
        });
      })
      .catch(error => {
        // Respond with custom offline page
      })
  );
});
