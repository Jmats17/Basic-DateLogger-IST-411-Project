
var url = 'http://127.0.0.1:3000';

function logDateClicked() {
    var request = new XMLHttpRequest();
    request.open('POST', url + '/logdate', false);
    if (request.status == 404) {
        alert("Resource not available.");
    }
    
    request.send();
}

function viewLogClicked() {
    let tableElement = document.querySelector('#date_table');
    tableElement.innerHTML = "";
    var request = new XMLHttpRequest();  
    request.open('GET', url + '/dates', true);
    request.onload = function() {
        if (request.status == 404) {
            alert("Resource not available.");
        }
        data = request.response;
        let dateArr = data.split('\n');
        let trElem = document.createElement('tr');
        dateArr.forEach(date => {
            let thElem = document.createElement('th');
            let dateNode = document.createTextNode(`${date}`);
            thElem.append(dateNode);
            trElem.appendChild(thElem);
        });
        tableElement.appendChild(trElem);
    };
    request.send()
}