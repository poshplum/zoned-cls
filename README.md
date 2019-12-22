# zoned-cls

A forked version of zone.js, focusing on continuation-local-storage and without error-handling 
responsibilities for zones.  

See [the angular zone.js package](https://github.com/angular/angular/tree/master/packages/zone.js) 
for general information about zones, but recognize that onHandleError 
is explicitly removed from this package.

Use this package if you wanted continuation-local-storage as for node, 
but you wanted it to run in the browser.  That's the core vision for Zones, 
as in zone.js's README:

> ## What's a Zone?
>
> A Zone is an execution context that persists across async tasks.
> You can think of it as [thread-local storage](http://en.wikipedia.org/wiki/Thread-local_storage) for JavaScript VMs.

It turns out that putting error-handling responsibility into the zone stack causes 
some significant unwanted results, some of them stemming from zone.js's tendency to
catch errors and rethrow them even when there's no onHandleError in the zone.  

And when the LongStackTraceZone spec is used at the top level, it gets notified of errors in 
async-function-promises even when their callers are prepared to catch the error...

> ## Standard API support
>
> \[zone.js\] patched most standard web APIs (such as DOM events, `XMLHttpRequest`, ...) and nodejs APIs
> (`EventEmitter`, `fs`, ...), for more details, please see [STANDARD-APIS.md](STANDARD-APIS.md).

zoned-cls inherits these patches.

> ## Nonstandard API support
>
> We are adding support to some nonstandard APIs, such as MediaQuery and
> Notification. Please see [NON-STANDARD-APIS.md](NON-STANDARD-APIS.md) for more details.

> ## Examples
> 
> You can find some samples to describe how to use zone.js in [SAMPLE.md](SAMPLE.md).

> ## Modules
>
> zone.js patches the async APIs described above, but those patches will have some overhead.
> Starting from zone.js v0.8.9, you can choose which web API module you want to patch.
> For more details, please
> see [MODULE.md](MODULE.md).

> ## Bundles
> There are several bundles under `dist` folder.

no guarantees whether these will work, but feel free to give it a shot.  


|Bundle|Summary|
|---|---|
|zone.js|the default bundle, contains the most used APIs such as `setTimeout/Promise/EventTarget...`, also this bundle supports all evergreen and legacy (IE/Legacy Firefox/Legacy Safari) Browsers|
|zone-evergreen.js|the bundle for evergreen browsers, doesn't include the `patch` for `legacy` browsers such as `IE` or old versions of `Firefox/Safari`|
|zone-legacy.js|the patch bundle for legacy browsers, only includes the `patch` for `legacy` browsers such as `IE` or old versions of `Firefox/Safari`. This bundle must be loaded after `zone-evergreen.js`, **`zone.js`=`zone-evergreen.js` + `zone-legacy.js`**|
|zone-testing.js|the bundle for zone testing support, including `jasmine/mocha` support and `async/fakeAsync/sync` test utilities|
|zone-externs.js|the API definitions for `closure compiler`|

And here are the additional optional patches not included in the main zone.js bundles

|Patch|Summary|
|---|---|
|webapis-media-query.js|patch for `MediaQuery APIs`|
|webapis-notification.js|patch for `Notification APIs`|
|webapis-rtc-peer-connection.js|patch for `RTCPeerConnection APIs`|
|webapis-shadydom.js|patch for `Shady DOM APIs`|
|zoned-cls-bluebird.js|patch for `Bluebird APIs`|
|zoned-cls-error.js|patch for `Error Global Object`, supports remove `Zone StackTrace`|
|zoned-cls-patch-canvas.js|patch for `Canvas API`|
|zoned-cls-patch-cordova.js|patch for `Cordova API`|
|zoned-cls-patch-electron.js|patch for `Electron API`|
|zoned-cls-patch-fetch.js|patch for `Fetch API`|
|zoned-cls-patch-jsonp.js|utility for `jsonp API`|
|zoned-cls-patch-resize-observer.js|patch for `ResizeObserver API`|
|zoned-cls-patch-rxjs.js|patch for `rxjs API`|
|zoned-cls-patch-rxjs-fake-async.js|patch for `rxjs fakeasync test`|
|zoned-cls-patch-socket-io.js|patch for `socket-io`|
|zoned-cls-patch-user-media.js|patch for `UserMedia API`|

## Promise A+ test passed
[![Promises/A+ 1.1 compliant](https://promisesaplus.com/assets/logo-small.png)](https://promisesaplus.com/)

## License
MIT
