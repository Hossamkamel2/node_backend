const express = require('express')
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');

const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const productRoutes = require('./routes/productRoutes')

app.use(helmet());

//"mongodb://localhost:27017/E_Commerce"
//"mongodb+srv://AhmedHamedAdmin:ahmed_168199600@cluster0-nb9dw.mongodb.net/test?retryWrites=true&w=majority"
const mongoUrl = "mongodb+srv://AhmedHamedAdmin:ahmed_168199600@cluster0-nb9dw.mongodb.net/test?retryWrites=true&w=majority";
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/product', productRoutes);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(
    {
        Errors: [{
            key: "server",
            errorMsg: "some thing went wrong"
        }]
    })
})

mongoose
  .connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(result => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
