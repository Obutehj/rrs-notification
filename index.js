require('dotenv').config();

const express = require('express');
const app = express();

const router = require('./routes');
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
const apiRoot = process.env.API_ROOT;
app.use(`${apiRoot}/v1/notify`, router);

// server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('server started............');
});
