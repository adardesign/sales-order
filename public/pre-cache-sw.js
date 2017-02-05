/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","b5a9c5870fb1e0409ae5a01cff0cf646"],["/data/categories.json","ed2826fe06373eea48a9cc4d6c4b13d0"],["/data/honey.json","6a82b479a05c05d7bfa5857bf6f903d8"],["/data/nuts.json","820442635bc99add213da5b4d8f99483"],["/data/tea.json","d06e5c2088c1c26c051e7c391ce9a22e"],["/images/honeySample.jpg","e4a7eeab0a4df3c78d204453d044f1c5"],["/images/nutsSample.jpg","b7ceba218be2cbb721ea4e205ca64242"],["/images/teaSample.jpg","472048f52f801adf8140f6e024523eaa"],["/index.html","da33d7a0f1627d34bfadd9efdce464e9"],["/itemImages/honeySample.jpg","e4a7eeab0a4df3c78d204453d044f1c5"],["/itemImages/nutsSample.jpg","b7ceba218be2cbb721ea4e205ca64242"],["/itemImages/tea/Ahmad-Apple-Fruit-Tea-6_20-tb.png","1e3b33fcf9b8527708a5a86d5cfd9c9d"],["/itemImages/tea/Ahmad-Fruit-Tea-Apricot-6_20-tb.png","6a6ccba1e80a2ac272183db0ad8b3cdd"],["/itemImages/tea/Ahmad-Fruit-Tea-Blackcurrant-6_20-tb.png","c2025a6be7518cb11ddaf027cfc022b2"],["/itemImages/tea/Ahmad-Fruit-Tea-Mango-Magic-6_20-tb.png","728aaf853bc29988f09d874e44538256"],["/itemImages/tea/Ahmad-Fruit-Tea-Peach-Passion-6_20-tb.jpg","445d775e5574625bce3973394450a86f"],["/itemImages/tea/Ahmad-Fruit-Tea-Selection-6_20tb.png","4fb16edbe91aa426777d11ee20ad0470"],["/itemImages/tea/Ahmad-Fruit-Tea-Strawberry-6_20-tb.png","15eb684348b43a516a5f1f09159264ed"],["/itemImages/tea/Ahmad-Fruit-Tea-Vanilla-6_20-tb.png","1adba4f31d11a3badb2949a7a9945efa"],["/itemImages/tea/Ahmad-Green-Jasmine-Tea-6_20-tb.png","36ede5325011549ed14bfd3ecb926c9d"],["/itemImages/tea/Ahmad-Green-Lemon-Vitality-Tea-6_20-tb.png","a84088cc1cb6f4fe8f2df168d152ff1d"],["/itemImages/tea/Ahmad-Green-Selection-Tea-6_20tb.png","e34f9166b5c5f167cc685f7f71ce65c6"],["/itemImages/tea/Ahmad-Green-Tea-6_20-tb.png","66fa71edd286bb6b9014f69b13e4c6bf"],["/itemImages/tea/Ahmad-Herb-Mixed-Berry-Tea 6_20tb.png","9396537e1e38230a4e3255a8cf76b4f7"],["/itemImages/tea/Ahmad-Lemon-Lime-6_20tb.jpg","2162fcee1f4ed6618e3da1a44a001a92"],["/itemImages/tea/Ahmad-Lemon_Lime-6_20tb.jpg","2162fcee1f4ed6618e3da1a44a001a92"],["/itemImages/tea/Ahmad-Mint-Mystique-Green-Tea-6_20 tb.png","f24aa8b9faf87b1bb40ff4375bd2202b"],["/itemImages/tea/ceylon-tea-20tb.jpg","53668573ac78d96566e637bde826f191"],["/itemImages/tea/teaSample.jpg","472048f52f801adf8140f6e024523eaa"],["/legacy-service-worker.js","b7fa327a3e6d35a7935bfdd6d298f3b8"],["/src/CSS/bootstrap.css","b8b97ed99b929b6ea07dcd417ce4bb72"],["/src/CSS/bootstrap.min.css","ec3bb52a00e176a7181d454dffaea219"],["/src/CSS/main.css","ae254384012b25e9cede2cb4bc520c51"],["/src/JS/actionBind.js","def6b5f2c356e9f2c3ee450b294e9acc"],["/src/JS/bootstrap.js","fb81549ee2896513a1ed5714b1b1a0f0"],["/src/JS/jquery-3.1.1.min.js","e071abda8fe61194711cfc2ab99fe104"],["/src/JS/main.js","ed9963fb3d629e7d2787f0a141a8c5dd"],["/src/JS/microTmpl.js","5ea57206b4bd09c3aaf8b5153a38d729"],["/src/JS/notify.js","a900804129d6511a05af1957c6eaa90f"],["/src/JS/sw-filesToCache.json","f02653614d8e24844558ae14be36f096"],["/src/JS/sw-registar.js","eb17366bdad07ec839db9d72c2ea9633"],["/src/JS/utils.js","145956b858c0297579173977b6284e59"],["/sw.js","4b11e00c2cec5391286333901a14a2c1"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







