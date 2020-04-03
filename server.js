const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
   
    res.setHeader('Content-type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    const {method, url} = req;

    var date = new Date();
    var dateStr = date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear();
    var time = date.getHours() + ':' + date.getMinutes();
    var dateTime = "";

    if (date.getHours() >= 12) {
        dateTime = dateStr + ' - ' + time + " PM" +"\n";
    } else {
        dateTime = dateStr + ' - ' + time + " AM" +"\n";
    }

    if (url === '/logdate' && method === 'POST') {
        res.statusCode = 200;
        fs.appendFile('datelog.txt', dateTime, err => {
            if (err) throw err;
            console.log(`Added date: ${dateTime}`);
            res.end();
        });
    }

    else if (url === '/dates' && method === 'GET') {
        res.statusCode = 200;
        fs.readFile('datelog.txt', (err, data) => {
            if (err) throw err.message;
            res.write(data.toString());
            console.log('Written to response with dates string.');
            res.end();
        })
    }
    
    else {
        res.statusCode = 404;
        console.log("Error. 404.")
        res.end();
    }
})

server.listen(port, hostname, () => {
    console.log(`Server Started. Running on: ${hostname}:${port}`)
})