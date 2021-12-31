const { PORT } = require('./config/globals')
const { getConnection } = require('./dal/mongoose/db/connection')
const server = require('./server');

getConnection().then( (message) => {
    console.log(message)
    server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
})