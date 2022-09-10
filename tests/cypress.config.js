const { defineConfig } = require("cypress")
const { Pool } = require('pg')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      const pool = new Pool(config.env.db_config)
  
      on('task', {
        removeUser(email) {
          return new Promise((resolve) => {
            pool.query('DELETE FROM public.users WHERE email = $1', [email], (err, res) => {
              if (err) {
                throw err
              }
              resolve({ success: res })
            })
          })
        }
      })
    }
  },
})
