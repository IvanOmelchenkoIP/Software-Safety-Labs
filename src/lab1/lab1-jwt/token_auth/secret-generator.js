const crypto = require('crypto')
const fs = require('fs')

secret = crypto.randomBytes(65).toString('hex')
contents = 'TOKEN_SECRET=' + secret

fs.writeFile('.env', contents, (err) => {
    if (err) throw err; 
})