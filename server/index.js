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
const app = express();

dotenv.config();

const port = process.env.APP_PORT || 3000;

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: sequelize
})

app.use(
  session({
    secret: 'akkakakakakkakak',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
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
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization", "Custom-Session-Header"],
  })
);

app.post("/ping", (req, res) => {
  res.send("pong");
});

app.use(authRoute);
app.use(userRoute);
app.use(bookRoute);
app.use(loanRoute);
app.use(categoryRoute);
app.use(bookshelfRoute);

// store.sync();
// sequelize.sync({ alter: true });
// sequelize.sync({ force: false }) // Set to 'true' if you want to drop and recreate tables each time
//   .then(() => {
//     console.log('Database & tables synced successfully!');
//   })
//   .catch((error) => {
//     console.error('Error syncing database:', error);
//   });



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
