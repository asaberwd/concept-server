var cron = require('node-cron')

const { updateSalesByCron } = require('./../app/controllers/userController')

// reset sales dailylead field 
cron.schedule('0 0 0 * * *', () => {
  updateSalesByCron()
});

