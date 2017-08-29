const express = require('express'),
	bodyParser = require('body-parser'),
	session = require('express-session');
	
	

// MIDDLEWARE
const checkForSession = require('./middlewares/checkForSession');


// CONTROLLERS
const swagController = require('./controllers/swag_controller'),
	authController = require('./controllers/auth_controller'),
	cartController = require('./controllers/cart_controller'),
	searchController = require('./controllers/search_controller');

const app = express();
app.use(bodyParser.json());
app.use(session({ 
	secret: "secretfunstuff", 
	resave: false,
	saveUninitialized: false
}))
app.use(checkForSession);
app.use(express.static( `${__dirname}/../public/build`) );

// ENDPOINTS
app.get('/api/swag', swagController.read);
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);
app.post('/api/cart', cartController.add);
app.post('/api/cart/checkout', cartController.checkout);
app.delete('/api/cart', cartController.delete);
app.get('/api/search', searchController.search);



app.listen(3030, () => console.log('listening port 3030'));
