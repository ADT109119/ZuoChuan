
var biggestID = 0;
var allCountrys = []
var nowSelectedEvent;

async function loadAllCountry(){
    await fetch('../img/map.svg').then(function(res){
        return res.text();
    }).then(function(response){
        let div = document.createElement("div");
        div.innerHTML = response;

        let c = []

        div.querySelectorAll("svg g").forEach((item)=>{

            if(item.getAttribute("data-name") == "灰色地帶")
                return

            allCountrys.push(item.getAttribute("data-name"))

        })

        //return JSON.parse(response);
    })

    addCountryToDatalist()
    //console.log(allCountrys)
}

function addCountryToDatalist(){
    allCountrys.forEach((item)=>{

        let option = document.createElement("div");
        option.innerHTML = item;

        option.onclick = ()=>{
            console.log(nowSelectedEvent)
            nowSelectedEvent.value += ", " + item;
        }

        document.querySelector("#allCountryDatalist").append(option)

    })
}

function closeCountrySelector(){
    document.querySelector("#countrySlectorDisplay").classList.remove("active");
    document.querySelector("#touchOutsideScanner").classList.remove("active");
}

function addCountryToRelatedList(e, obj){

    nowSelectedEvent = obj.parentElement.querySelector("input");

    let countrySlectorDisplay = document.querySelector("#countrySlectorDisplay");
    let touchOutsideScanner = document.querySelector("#touchOutsideScanner");

    touchOutsideScanner.classList.add("active")
    countrySlectorDisplay.classList.add("active");
    countrySlectorDisplay.style.left = e.clientX + "px";
    countrySlectorDisplay.style.top = e.clientY + "px";

    //console.log(obj.parentElement)
}

async function loadData(dataPath){
    var re = await fetch(dataPath).then(function(res){
        return res.text();
    }).then(function(response){
        return JSON.parse(response);
    })

    //console.log(re)
    return re;
}

function addNewCountry(){
    let container = document.querySelector("tbody");

    let tr = document.createElement("tr");

    let tdID = document.createElement("td");
    let tdName = document.createElement("td");
    let tdPosition = document.createElement("td");
    let deleteButton = document.createElement("td");
    tdID.innerHTML = '<input type="text" value="' + parseInt(parseInt(biggestID) + parseInt(1)) + '">';
    tdName.innerHTML = '<input type="text">';
    tdPosition.innerHTML = '<input type="text">';
    deleteButton.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteCountry(this)">🗑</button>'

    tr.append(tdID)
    tr.append(tdName)
    tr.append(tdPosition)
    tr.append(deleteButton)

    container.append(tr);

    biggestID++;

}


function addNewEvent(){
    let container = document.querySelector("tbody");

    let tr = document.createElement("tr");

    let tdID = document.createElement("td");
    let tdOr = document.createElement("td");
    let tdZuoChuan = document.createElement("td");
    let tdTransation = document.createElement("td");
    let tdTime = document.createElement("td");
    let tdRelatedCountrys = document.createElement("td");
    let deleteButton = document.createElement("td");

    let tdIDInput = document.createElement("input");
    let tdOrInput = document.createElement("textarea");
    let tdZuoChuanInput = document.createElement("textarea");
    let tdTransationInput = document.createElement("textarea");
    let tdTimeInput = document.createElement("input");
    let tdRelatedCountrysInput = document.createElement("input");
    deleteButton.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteCountry(this)">🗑</button>'

    tdIDInput.value = parseInt(parseInt(biggestID) + parseInt(1));

    tdID.append(tdIDInput)
    tdOr.append(tdOrInput)
    tdZuoChuan.append(tdZuoChuanInput)
    tdTransation.append(tdTransationInput)
    tdTime.append(tdTimeInput)
    tdRelatedCountrys.append(tdRelatedCountrysInput)

    tr.append(tdID)
    tr.append(tdOr)
    tr.append(tdZuoChuan)
    tr.append(tdTransation)
    tr.append(tdTime)
    tr.append(tdRelatedCountrys)
    tr.append(deleteButton)

    container.append(tr);

    biggestID++;

}


function deleteCountry(obj){
    obj.parentElement.parentElement.remove();
}

async function loadCountry(selector){
    //let tr = document.createElement("tr");
    let container = document.querySelector(selector);

    let data = await loadData("../data/countrys.json");
    for(var i in data){
        let tr = document.createElement("tr");

        let tdID = document.createElement("td");
        let tdName = document.createElement("td");
        let tdPosition = document.createElement("td");
        let deleteButton = document.createElement("td");

        let tdIDInput = document.createElement("input");
        let tdNameInput = document.createElement("input");
        let tdPositionInput = document.createElement("input");


        tdIDInput.value = i;
        tdNameInput.value = data[i]['name'];
        tdPositionInput.value = data[i]['svgPosition'];
        deleteButton.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteCountry(this)">🗑</button>'

        tdID.append(tdIDInput)
        tdName.append(tdNameInput)
        tdPosition.append(tdPositionInput)

        tr.append(tdID)
        tr.append(tdName)
        tr.append(tdPosition)
        tr.append(deleteButton)

        container.append(tr);
        
        biggestID = i;
    }
}


async function loadEvent(selector){
    //let tr = document.createElement("tr");
    let container = document.querySelector(selector);

    let data = await loadData("../data/events.json");
    for(var i in data){
        let tr = document.createElement("tr");

        let tdID = document.createElement("td");
        let tdOr = document.createElement("td");
        let tdZuoChuan = document.createElement("td");
        let tdTransation = document.createElement("td");
        let tdTime = document.createElement("td");
        let tdRelatedCountrys = document.createElement("td");
        let deleteButton = document.createElement("td");

        let tdIDInput = document.createElement("input");
        let tdOrInput = document.createElement("textarea");
        let tdZuoChuanInput = document.createElement("textarea");
        let tdTransationInput = document.createElement("textarea");
        let tdTimeInput = document.createElement("input");
        let tdRelatedCountrysInput = document.createElement("input");
        let tdAddRelatedCountrys = document.createElement("a");


        tdIDInput.value = i;
        tdOrInput.value = data[i]['春秋經'];
        tdZuoChuanInput.value = data[i]['左傳'];
        tdTransationInput.value = data[i]['translation'];
        tdTimeInput.value = data[i]['time'];
        tdRelatedCountrysInput.value = data[i]['relatedCountry'];
        deleteButton.innerHTML = '<button type="button" class="btn btn-danger" onclick="deleteCountry(this)">🗑</button>'
        tdAddRelatedCountrys.innerHTML = "+ 增加關聯國家"

        tdAddRelatedCountrys.href = "javascript:void(0)"
        tdAddRelatedCountrys.onclick = (e)=>{
            addCountryToRelatedList(e, tdAddRelatedCountrys)
        }

        tdID.append(tdIDInput)
        tdOr.append(tdOrInput)
        tdZuoChuan.append(tdZuoChuanInput)
        tdTransation.append(tdTransationInput)
        tdTime.append(tdTimeInput)
        tdRelatedCountrys.append(tdRelatedCountrysInput)
        tdRelatedCountrys.append(tdAddRelatedCountrys)

        tr.append(tdID)
        tr.append(tdOr)
        tr.append(tdZuoChuan)
        tr.append(tdTransation)
        tr.append(tdTime)
        tr.append(tdRelatedCountrys)
        tr.append(deleteButton)

        container.append(tr);
        
        biggestID = i;
    }
}



function countryDataSave(){
    var countryData = {};
    document.querySelectorAll("tbody tr").forEach(function(item){
        let items = item.querySelectorAll("td input");
        //console.log(items);
        countryData[items[0].value] = {};
        countryData[items[0].value]['name'] = items[1].value
        countryData[items[0].value]['svgPosition'] = items[2].value
    })
    //console.log(JSON.stringify(countryData));
    CreateAndDownloadData(countryData, "countrys.json")
}

function eventDataSave(){
    var countryData = {};
    document.querySelectorAll("tbody tr").forEach(function(item){
        let items = item.querySelectorAll("td input, td textarea");
        //console.log(items);
        countryData[items[0].value] = {};
        countryData[items[0].value]['春秋經'] = items[1].value
        countryData[items[0].value]['左傳'] = items[2].value
        countryData[items[0].value]['translation'] = items[3].value
        countryData[items[0].value]['time'] = items[4].value
        countryData[items[0].value]['relatedCountry'] = items[5].value
    })
    //console.log(JSON.stringify(countryData));
    CreateAndDownloadData(countryData, "events.json")
}


function CreateAndDownloadData(data, dataName) {
	
    let a = document.createElement('a');
    let blob = new Blob([JSON.stringify(data)]);
    a.download = dataName;
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(blob);
	
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.querySelector("#allCountryDatalist");
    opt = div.querySelectorAll("div");

    for (i = 0; i < opt.length; i++) {
            txtValue = opt[i].textContent || opt[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            opt[i].style.display = "";
        } else {
            opt[i].style.display = "none";
        }
    }
}