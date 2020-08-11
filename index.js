const app = require('./app');

const PORT = process.env.PORT || 3060;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});

module.exports = app;
