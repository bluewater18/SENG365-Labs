const http = require('http');
const URL = require('url').URL;

items = ['milk', 'bread', 'eggs', 'flour']

http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const parameters = url.searchParams;
    const itemNum = url.searchParams.get('itemNum');

    // Write the response
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.end(`You selected item ${itemNum}: ${items[itemNum]}`);
}).listen(8081);