import express from 'express';
import route from './routes'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// @todo remove before deployment
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

route(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('App is now running at port ', port)
})
