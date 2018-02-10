import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as session from "express-session";
import JavaPlayground from './JavaPlayground';

const PORT = process.env.PORT || 5000

// Create Express server
const app = express();

// Express configuration
app.set("port", PORT);
app.set("views", path.join(__dirname, "../views"));
app.set('view engine', 'ejs');

// Use helmet
// See this for more info: https://expressjs.com/en/advanced/best-practice-security.html
var helmet = require('helmet')
app.use(helmet());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    name: 'server-session-cookie-id',
    secret: 'sanagama copper',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../static")));
app.use(favicon(path.join(__dirname,'../static','images','favicons', 'favicon.ico')));

// Routes
app.get('/', function(req, res) { res.render("home"); });
app.get('/sdks/java/macos', function(req, res) { res.render("sdks/java/macos/java-mac-1"); });
app.get('/sdks/java/macos/java-mac-2', function(req, res) { res.render("sdks/java/macos/java-mac-2"); });
app.get('/sdks/java/macos/java-mac-3', function(req, res) { res.render("sdks/java/macos/java-mac-3"); });
//app.get('/sdks/java/windows', function(req, res) { res.render("sdks/java/windows/java-windows-1"); });

app.get('/playgrounds/java', function(req, res) { res.render("playgrounds/java/java-play-1"); });
app.get('/playgrounds/java/java-play-2', function(req, res) { res.render("playgrounds/java/java-play-2"); });
app.get('/playgrounds/java/java-play-3', function(req, res) { res.render("playgrounds/java/java-play-3"); });

// TBD: add more routes later
//app.get('/apis/restapi', function(req, res) { res.render("apis/rest/restapi-1"); });
//app.get('/apis/restapi-2', function(req, res) { res.render("apis/restapi-2"); });
//app.get('/apis/soapapi', function(req, res) { res.render("apis/soapapi-1"); });

// TBD: add playground REST API routes
const javaPlayground = new JavaPlayground(app);

app.get('/playgound-api/java/createproject', function(req, res) {
    javaPlayground.createProject(req, res); });

app.get('/playgound-api/java/runapp1', function(req, res) {
    javaPlayground.runApp1(req, res); });
    
app.get('/playgound-api/java/runapp2', function(req, res) {
    javaPlayground.runApp2(req, res); });

module.exports = app;