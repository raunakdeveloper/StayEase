const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
require('dotenv').config();

// Routes
const listingRoutes = require('./routes/listings');
const reviewRoutes = require('./routes/reviews');

// Connect MongoDB
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}
main()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.redirect('/listings');
});
app.use('/listings', listingRoutes);
app.use('/listings/:id/reviews', reviewRoutes);

// Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).render('error', { message });
});

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
