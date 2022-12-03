// JavaScript Document
/*
async function loadData(dataPath){
    var re = await fetch(dataPath, {cache: "force-cache"}).then(function(res){
        return res.text();
    }).then(function(response){
        return JSON.parse(response);
    })

    //console.log(re)
    return re;
}
*/
//importScripts("../js/loadData.js");

this.addEventListener("message", async function(e){
    let country = e.data.country;
    //console.log("asd")
    //let data = await loadData("../data/events.json");
    let data = e.data.eventData;
    
    
    let events = [];
    //this.postMessage({"d": data});
    for(i in data){
        
        let relatedCountry = data[i]["relatedCountry"].replace(/ /g, "").split(",")
        //this.postMessage({"d": relatedCountry});
        let temp = 0;
        let j = country.some((r)=>{
        
            if(relatedCountry.indexOf(r) >= 0){
                temp++;
            }

            if(temp == country.length){
                return true
            }
        })

        if(j /*relatedCountry.includes(country)*/){
            events.push(i);
        }
    }

    this.postMessage({
                        "num": events.length,
                        "events": events
                        });
    this.close();
})

