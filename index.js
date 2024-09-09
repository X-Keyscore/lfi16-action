require('dotenv').config() // Créer un environment variable (process.env.)
const
express = require('express'), // Middleware réponse HTTP
cors = require('cors'),
app = express(),
http = require("node:http"),
rateLimit = require("express-rate-limit");
const db = require('./db');
const helmet = require('helmet');

const { URL_AUDIENCE, API_PORT } = process.env; 

app.use(helmet());


const origin = cors({
	origin: URL_AUDIENCE,
	optionsSuccessStatus: 200 // For legacy browser support
});
app.use(origin);
//app.use(cors())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limite chaque IP à 100 requêtes par windowMs
});
app.use("/api/", limiter);

app.use(express.json({ limit: '16mb' }));
app.use(express.urlencoded({ extended: true, limit: '16mb' }));

app.use(express.json());


const server = http.createServer(app);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const listRouter = require('./routes/list-router')
const productRouter = require('./routes/product-router')

app.use('/api', listRouter)
app.use('/api', productRouter)

server.listen(API_PORT, () => console.log(`Server running on port ${API_PORT}`))
