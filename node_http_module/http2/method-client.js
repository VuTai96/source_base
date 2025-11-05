const http2 = require('http2');
const fs = require('fs');
const path = require('path');

const client = http2.connect('https://localhost:8443', {
    ca: fs.readFileSync(path.join(__dirname, '../ssl/localhost-cert.pem')),
});

client.on('error', (err) => console.error(err));

const getReq = client.request({
    ':method': 'GET',
    ':path': '/',
});
getReq.setEncoding('utf8');
let getData = '';
getReq.on('data', (chunk) => {
    getData += chunk;
});
getReq.on('end', () => {
    console.log('📨 GET Response:', getData);

    // Add new post request
    const postReq = client.request({
        ':method': 'POST',
        ':path': '/data',
        'content-type': 'application/json',
    });
    const postBody = JSON.stringify({
        name: 'HTTP/2 Client',
        message: 'Hello from HTTP/2 POST!',
    });
    postReq.write(postBody);
    postReq.end();

    let postData = '';
    postReq.setEncoding('utf8');
    postReq.on('data', (chunk) => {
        postData += chunk;
    });
    postReq.on('end', () => {
        console.log('📨 POST Response:', postData);
        client.destroy();
    });
});

getReq.end();
