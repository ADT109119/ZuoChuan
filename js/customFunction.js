

async function loadData(dataPath){
    var re = await fetch(dataPath, {cache: "no-cache"}).then(function(res){
        return res.text();
    }).then(function(response){
        return JSON.parse(response);
    })

    //console.log(re)
    return re;
}

//importScripts("../js/loadData.js");

async function loadElement(selector, target){

    var statusCode = 0
    await fetch(target).then(function(res){
        statusCode = res.status;
        return res.text();
    }).then((response)=>{
        document.querySelector(selector).innerHTML = response;
        return response.status;
    })

    //console.log(statusCode)

    return statusCode
}

//開關側邊欄
function sidebarToggle(){
    document.querySelector('.sidebarButton').classList.toggle('active');
    document.querySelector('.sidebar').classList.toggle('active');
}
function sidebarOpen(){
    document.querySelector('.sidebarButton').classList.add('active');
    document.querySelector('.sidebar').classList.add('active');
}

//顯示國家資料
async function displayData(target, country, eventNum){
    let countryDisplayer = document.querySelector(target)
    countryDisplayer.querySelector("h3.countryName").innerHTML = "國家: " + country.join(", ");
    countryDisplayer.querySelector("p").innerHTML = "事件數量: " + eventNum;

    if(country.length == 0)
        countryDisplayer.querySelector("h3.countryName").innerHTML = "國家: 尚未選擇";
        
}

//側邊欄加入事件方塊
function addEventBlock(eventId){

    let block = document.createElement("div");
    block.className = "eventBlock";

    //事件顯示
    block.onclick = ()=>{
        document.querySelector("#displayEventInfo .t").innerHTML = "|" + eventData[eventId]['time'] + "|";
        document.querySelector("#displayEventInfo .ar").innerHTML = eventData[eventId]['左傳'];
        document.querySelector("#displayEventInfo .or").innerHTML = eventData[eventId]['春秋經'];
        document.querySelector("#displayEventInfo .c").innerHTML = eventData[eventId]['relatedCountry'];

        if(eventData[eventId]['春秋經'] == "")
        document.querySelector("#displayEventInfo .or").innerHTML = "不書";

        let relatedCountry = eventData[eventId]['relatedCountry'].replace(/ /g, "").split(",")

        document.querySelectorAll(".mapContainer svg g path").forEach((item)=>{
            item.classList.remove("active");

            if(relatedCountry.includes(item.parentElement.getAttribute("data-name")))
                item.classList.add("active")
        })
    }

    let timeH3 = document.createElement("h3");
    timeH3.className = "time";
    timeH3.innerHTML = eventData[eventId]['time']

    let p = document.createElement("p");
    p.className = "article";
    p.innerHTML = eventData[eventId]['左傳']

    block.append(timeH3)
    block.append(p)

    document.querySelector(".eventBlockArea").append(block);
}

//側邊欄顯示事件
function removeBlocks(){
    document.querySelectorAll(".eventBlockArea .eventBlock").forEach((item)=>{
        item.remove();
    })
}

async function sidebarDisplayEvent(country){

    if(country.length == 0){
        removeBlocks();
        let block = document.createElement("div");
        block.className = "eventBlock";
        block.innerHTML = "尚未選擇國家";
        document.querySelector(".eventBlockArea").append(block);
        return 0;
    }

    let worker = new Worker("js/eventCountryFindWorker.js");
    //console.log(country)

    worker.postMessage({
        country: country,
        eventData: eventData
    })

    worker.onmessage = (e)=>{
        //console.log(e.data.d)
        let events = e.data.events;
        console.log(events)

        removeBlocks()

        events.forEach((item)=>{
            addEventBlock(item);
        })
        
        worker.terminate();
    }

}


async function sidebarSearchEvent(text){

    document.querySelectorAll(".mapContainer svg g *.search").forEach((activeItem)=>{
        activeItem.classList.remove("search");
    })

    let worker = new Worker("js/searchWorker.js");
    //console.log(country)

    worker.postMessage({
        text: text
    })

    worker.onmessage = (e)=>{
        //console.log(e.data.d)
        let events = e.data.events;

        if(e.data.num == 0){
            removeBlocks();
            let block = document.createElement("div");
            block.className = "eventBlock";
            block.innerHTML = "尚未選擇國家";
            document.querySelector(".eventBlockArea").append(block);
            return 0;
        }

        //console.log(events)

        removeBlocks()

        events.forEach((item)=>{
            addEventBlock(item);
        })
        
        worker.terminate();
    }

}


//拖動
function dragElement(elmnt) {
    //console.log(elmnt)
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "Header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    
    if((elmnt.offsetTop - pos2) < 0 || (elmnt.offsetTop - pos2) > window.innerHeight - elmnt.offsetHeight)
        return

    if((elmnt.offsetLeft - pos1) < 0 || (elmnt.offsetLeft - pos1) > window.innerWidth - elmnt.offsetWidth)
        return
    

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function activeMapDrag(){
    // 獲取SVG圖片和容器// 獲取SVG圖片和容器
    const svg = document.querySelector('svg');
    const container = svg.parentElement;

    // 設置SVG圖片的初始位置和縮放比例
    let posX = 0;
    let posY = 0;
    let scale = 1;

    // 記錄拖曳的起始位置
    let startX = 0;
    let startY = 0;

    // 設置拖曳事件
    container.addEventListener('mousedown', function(e) {
    startX = e.clientX - posX;
    startY = e.clientY - posY;

    container.addEventListener('mousemove', onMouseMove);
    });

    container.addEventListener('mouseup', function() {
    container.removeEventListener('mousemove', onMouseMove);
    });

    function onMouseMove(e) {
    posX = e.clientX - startX;
    posY = e.clientY - startY;

    svg.setAttribute('transform', `translate(${posX}, ${posY}) scale(${scale})`);
    }

    // 設置縮放事件
    container.addEventListener('wheel', function(e) {
    e.preventDefault();

    const delta = Math.sign(-e.deltaY);
    const factor = 0.1;

    scale += delta * factor;

    // 限制縮放比例的最小值和最大值
    if (scale < 0.5) {
        scale = 0.5;
    }

    if (scale > 3){
        scale = 3;
    }

    svg.setAttribute('transform', `translate(${posX}, ${posY}) scale(${scale})`);
    })
}