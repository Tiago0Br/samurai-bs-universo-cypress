const { defineConfig } = require("cypress")
const { Pool } = require('pg')
const { db_config } = require('./cypress.env.json')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, _) {
      const pool = new Pool(db_config)
  
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
