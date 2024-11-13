const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');

const app = express();
const port = 3000;

// Session Management
app.use(session({
  secret: 'CATERING DEMO', // Replace with a random string for production
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://markchristianmusngi:64Ko4gT0miP7JnsT@cluster1.mtd8d.mongodb.net/CateringServices?retryWrites=true&w=majority', // Your MongoDB URI
    ttl: 14 * 24 * 60 * 60 // Session expiry time in seconds (optional)
  })
}));

// Set the directory for static assets (e.g., CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
// Set the directory for views (containing hbs templates)
app.set('views', path.join(__dirname, 'views'));

// Configure Handlebars
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  helpers: {
    eq: function (v1, v2) {
      return v1 === v2;
    },
    multiply: function (a, b) {
      return a * b;
    },
    // Helper to create a range array
    range: function (start, end) {
      return Array.from({ length: end - start }, (v, k) => k + start);
    },
    // Helper to check if index is less than the rating
    isLessThan: function (index, rating) {
      return index < rating;
    }
  }
});



app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');



// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Include the routes from separate files
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');

// Mount the routes on the app
app.use('/', indexRoutes);
app.use('/', adminRoutes)

module.exports = app;