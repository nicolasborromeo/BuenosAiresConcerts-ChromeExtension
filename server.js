
const http = require('http');
const fs = require('fs');

let url = ''


const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    let reqBody = ''

    req.on("data", (data) => {
        reqBody += data
    });
    req.on("end", () => {

        if (reqBody) {
            console.log('body of the request --->', reqBody)
            url = reqBody.replace('+', '%20')
            console.log('PARSED URL =>', url)

        }

        //send html
        if (req.method === "GET" && req.url === "/") {
            const html = fs.readFileSync('./index.html');
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html")
            return res.end(html)
        }
        //send css
        if (req.method === "GET" && req.url === "/style.css") {
            const css = fs.readFileSync('./style.css');
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/css")
            return res.end(css)
        }
        //send JS
        if (req.method === "GET" && req.url === "/script.js") {
            const js = fs.readFileSync('./script.js', 'utf-8');
            const replacedJS= js.replace(/"FILL THIS OUT"/g, url)

            // console.log('URLLLLL', url)
            // console.log(replacedJS)

            res.statusCode = 200;
            res.setHeader("Content-Type", "text/javascript")
            return res.end(replacedJS)
        }

        // -- POST --

        if(req.method === "POST" && req.url === "/") {
            res.statusCode = 302;
            res.setHeader("Location", "/")
            return res.end()
        }
    })


})
const port = 5001;
server.listen(port, () => console.log('Server is listening on port', port));
