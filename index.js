const http = require('http');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req,res,next) => {
	
	res.json({
		message: 'OK'
	});

});

app.get('/clientes', (req,res,next) => {

	res.json([
		{
			id: 1,
			nome: 'Luiz'
		}
	]);

});

const server = http.createServer(app);
server.listen(3000);
console.log('Servidor iniciado na porta 3000');