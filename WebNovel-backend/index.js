require('dotenv').config();
require('./config/passport/passport');
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const userRouter = require('./routes/User');
const novelRouter = require('./routes/Novel');
const chapterRouter = require('./routes/Chapter');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/user', userRouter)
app.use('/novel', novelRouter)
app.use('/chapter',chapterRouter)

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => console.log("Server start on port 8080" ))
});

