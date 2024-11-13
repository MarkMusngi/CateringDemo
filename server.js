const app = require('./app.js');
const { connectToDatabase } = require('./routes/db');
const port = 3000;

connectToDatabase().then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }).catch(error => {
    console.error('Failed to connect to database', error);
    process.exit(1);
  });
  