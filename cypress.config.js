const { defineConfig } = require("cypress")
const { Pool } = require('pg')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900,
    projectId: "rsp29p",
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
        },

        findToken(email) {
          const sql = `
            SELECT ut.token
            FROM public.users u
            INNER JOIN public.user_tokens ut
            ON u.id = ut.user_id
            WHERE u.email = '${email}'
            ORDER BY ut.created_at
          `
          return new Promise(resolve => {
            pool.query(sql, (err, result) => {
              if (err) {
                throw err
              }
              resolve({ token: result.rows[0].token })
            })
          })
        }
      })
    }
  },
})
