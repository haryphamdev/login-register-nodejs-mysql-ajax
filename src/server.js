require('dotenv').config();
import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

let app = express();

app.use(cookieParser("secret"));

//config session
app.use(session({
   secret: 'secret',
   resave: true,
   saveUninitialized: false,
   cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
   }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// config view engine
viewEngine(app);

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

//init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, ()=>{
   console.log(`App is running at the ${port}`);
});
