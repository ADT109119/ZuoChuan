// JavaScript Document
/*
async function loadData(dataPath){
    var re = await fetch(dataPath).then(function(res){
        return res.text();
    }).then(function(response){
        return JSON.parse(response);
    })

    //console.log(re)
    return re;
}
*/
importScripts("../js/loadData.js");

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

    let text = e.data.text;
    text = text.split(" ");

    let data = await loadData("../data/events.json");
  
    let events = [];
    //this.postMessage({"d": data});

    for(var i = 0 ; i < text.length; i++){
            
        for(var j in data){
        
            if(data[j]["左傳"].includes(text[i]) || data[j]["春秋經"].includes(text[i]) || data[j]["time"].includes(text[i])){
                events.push(j);
            }
        }

    }


  this.postMessage({
                        "num": events.length,
                        "events": events
                        });
  this.close();
})

