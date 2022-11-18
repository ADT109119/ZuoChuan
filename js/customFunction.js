
function loadElement(selector, target){

    fetch(target).then(function(res){
        return res.text();
    }).then(function(response){
        //console.log(response)
        document.querySelector(selector).innerHTML = response;
    })

}