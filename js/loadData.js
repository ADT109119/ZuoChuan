
async function loadData(dataPath){
    var re = await fetch(dataPath, {cache: "force-cache"}).then(function(res){
        return res.text();
    }).then(function(response){
        return JSON.parse(response);
    })

    //console.log(re)
    return re;
}
