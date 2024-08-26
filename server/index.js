const express = require("express");
const session = require("express-session");
const sequelize = require("./config/connection.js");
const SequelizeStore = require("connect-session-sequelize");
const { Books, Loans, Category } = require('./models/Association.js'); 
const bodyParser = require('body-parser');
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const authRoute = require("./routes/AuthRoute.js");
const userRoute = require("./routes/UserRoute.js");
const bookRoute = require("./routes/BookRoute.js");
const loanRoute = require("./routes/LoanRoute.js");
const categoryRoute = require("./routes/CategoryRoute.js");
const bookshelfRoute = require("./routes/BookshelfRoute.js");

// Initialize the Express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Define the port to run the server on, default to 3000 if not specified
const port = process.env.APP_PORT || 3000;

// Initialize session store with Sequelize
const sessionStore = SequelizeStore(session.Store);

// Configure the session store
const store = new sessionStore({
  db: sequelize // Use Sequelize instance for session storage
})

// Configure session middleware
app.use(
  session({
    secret: 'akkakakakakkakak', // Secret for signing the session ID cookie
    resave: false, // Do not save session if unmodified
    saveUninitialized: false, // Do not create session until something is stored
    store: store, // Use the configured Sequelize store
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // Session cookie settings
  })
);

// Middleware for parsing JSON request bodies
app.use(express.json());
// Middleware for parsing URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
// Middleware for additional JSON parsing
app.use(bodyParser.json());
// Middleware for parsing cookies
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // List of allowed origins
      const allowedOrigins = [
        `http://10.10.101.146:${port}`,
        `http://192.168.231.91:${port}`,
        `http://localhost:${port}`,
        "http://10.10.101.146:5173",
        "http://192.168.231.91:5173",
        "http://localhost:5173",
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); 
      } else {
        callback(new Error("Not allowed by CORS")); 
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
    optionsSuccessStatus: 204, // Status code for successful preflight requests
    allowedHeaders: ["Content-Type", "Authorization", "Custom-Session-Header"], // Allowed request headers
  })
);

app.post("/ping", (req, res) => {
  res.send("pong");
});

// Register routes
app.use(authRoute); 
app.use(userRoute); 
app.use(bookRoute); 
app.use(loanRoute); 
app.use(categoryRoute); 
app.use(bookshelfRoute); 

// Database synchronization
// Uncomment the following lines based on your needs

// Sync database tables with Sequelize
// store.sync(); // Sync session store tables
// sequelize.sync({ alter: true }); // Update existing tables
// sequelize.sync({ force: false }) // Drop and recreate tables (set to 'true' if needed)
//   .then(() => {
//     console.log('Database & tables synced successfully!');
//   })
//   .catch((error) => {
//     console.error('Error syncing database:', error);
//   });

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});