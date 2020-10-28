
require("dotenv-safe").config();

const jwt = require('jsonwebtoken');
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

app.get('/clientes', verifyJWT,  (req,res,next) => {

	res.json([
		{
			id: 1,
			nome: 'Luiz'
		}
	]);

});

app.post('/login', (req,res,next) => {

	if(req.body.user === 'luiz' && req.body.pwd === '123'){

    	const id = 1; //esse id viria do banco de dados

     	var token = jwt.sign({ id }, process.env.SECRET, {
        	expiresIn: 30 // expires in 5min
      	});
      
      	return res.json({ auth: true, token: token });
    
    }
    
    res.status(500).json({message: 'Login inválido!'});

});

app.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})

function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();

    });
}

const server = http.createServer(app);
server.listen(3000);
console.log('Servidor iniciado na porta 3000');