// * Node Farm Project
const fs = require('fs');
const http = require('http');
const { abort } = require('process');
const url = require('url');

const replaceStrings = require('./modules/replaceStrings');

const port = 8000;
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const jsonData = JSON.parse(data);
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateoverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const server = http
	.createServer((req, res) => {
		const { pathname, query } = url.parse(req.url);

		// Overview Screen
		if (pathname === '/' || pathname === '/overview') {
			res.writeHead(200, { 'Content-type': 'text/html' });

			const cards = jsonData.map((curData) => replaceStrings(templateCard, curData));
			const finaltemplateOverview = templateoverview.replace(/{%ProductCards%}/g, cards);
			res.end(finaltemplateOverview);

			// Products Screen
		} else if (pathname === '/product') {
			res.writeHead(200, { 'Content-type': 'text/html' });

			const selectedproductData = jsonData[query[3]];
			const finaltemplateProduct = replaceStrings(templateProduct, selectedproductData);
			res.end(finaltemplateProduct);

			//API
		} else if (pathname === '/api') {
			res.writeHead(200, { 'Content-type': 'application/json' });
			res.end(data);

			//Not found Screen
		} else {
			res.writeHead(404, { 'Content-type': 'text/html' });
			res.end('Page Not Found');
		}
	})
	.listen(port, '127.0.0.1', () => {
		console.log(`Listening to requests on port ${port}`);
	});

//////////////////////////////////////////////
// const fs = require('fs');
// const http = require('http');
// const url = require('url');

// const slugify = require('slugify');

// const replaceStrings = require('./modules/replaceStrings');

// const hello = 'Hello World!';
// console.log(hello);

//* Synchronous Code
// const readFile = fs.readFileSync('./txt/read-this.txt', 'utf-8');
// console.log(readFile);

// const inputText = `This is the text to be written ${readFile} on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', inputText);
// console.log('file wrote');

//* Asynchronous Code
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, (err) => {
//                 console.log('File written');
//             });
//         });
//     });
// });
// console.log('This will be read first');

//* Creating Server
// const port = 8000;

// const data = fs.readFileSync(`./dev-data/data.json`, 'utf-8');
// const jsonData = JSON.parse(data);

// const templateOverview = fs.readFileSync(
//     `${__dirname}/templates/template-overview.html`,
//     'utf-8'
// );
// const templateProduct = fs.readFileSync(
//     `${__dirname}/templates/template-product.html`,
//     'utf-8'
// );
// const templateCard = fs.readFileSync(
//     `${__dirname}/templates/template-card.html`,
//     'utf-8'
// );

// const slugs = jsonData.map((cur) =>
//     slugify(`${cur.productName}`, { lower: true })
// );
// console.log(slugs);

// const server = http.createServer((req, res) => {
//     const { pathname, query } = url.parse(req.url);

//     // Overview Screen
//     if (pathname === '/' || pathname === '/overview') {
//         res.writeHead(200, {
//             'Content-type': 'text/html'
//         });
//         const cards = jsonData
//             .map((cur) => replaceStrings(templateCard, cur))
//             .join('');
//         const finaltemplateOverview = templateOverview.replace(
//             /{%ProductCards%}/g,
//             cards
//         );
//         res.end(`${finaltemplateOverview}`);

//         // Product Screen
//     } else if (pathname === '/product') {
//         res.writeHead(200, {
//             'Content-type': 'text/html'
//         });
//         const selectedproduct = jsonData[query[3]];
//         const finaltemplateProduct = replaceStrings(
//             templateProduct,
//             selectedproduct
//         );
//         res.end(`${finaltemplateProduct}`);

//         //API
//     } else if (pathname === '/api') {
//         res.writeHead(200, {
//             'Content-type': 'application/json'
//         });
//         res.end(`${data}`);

//         //Images Screen
//     } else if (pathname === '/images') {
//         res.writeHead(200, {
//             'Content-type': 'image/jpg'
//         });
//         fs.readFile(`${__dirname}/image.jpg`, 'utf-8', (err, data) => {
//             res.end(data);
//         });
//         // Not Found screen
//     } else {
//         res.writeHead(404, {});
//         res.end('Page not found');
//     }
// });

// server.listen(port, '127.0.0.1', () => {
//     console.log(`Listening to the requests on port ${port}`);
// });
//
