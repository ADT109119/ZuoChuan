// JavaScript Document

async function loadData(dataPath){
    var re = await fetch(dataPath).then(function(res){
        return res.text();
    }).then(function(response){
        return JSON.parse(response);
    })

    //console.log(re)
    return re;
}

//importScripts("../js/customFunction.js");
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });


this.addEventListener("message", async function(e){
	let country = e.data.country;
	
    let data = await loadData("../data/events.json");
    
    let events = [];
    //this.postMessage({"d": data});
	for(i in data){
        let relatedCountry = data[i]["relatedCountry"].replace(/ /g, "").split(",")
        //this.postMessage({"d": relatedCountry});
        if(relatedCountry.includes(country)){
            events.push(i);
        }
	}
	
	this.postMessage({
                        "num": events.length,
                        "events": events
                        });
	this.close();
})

