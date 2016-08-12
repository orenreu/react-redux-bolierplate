/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 13/06/2016
 * Time: 17:03
 */

var constants = require("../utils/constants")
const path = require('path')
const fs = require('fs')
const db = constants.SYSTEM_NAME_SLUG

if (process.env.NODE_ENV == 'production') {

    const publicKey = fs.readFileSync(path.join(__dirname, '/publicKey.crt')).toString().trim()

    var config = {
        rethinkdb: {
            host: "aws-eu-west-1-portal.2.dblayer.com",
            port: 10527,
            authKey: 'KvUu-hZ5DHnaP3wtRafz6ksaSu7oiwzZ_3xUmWtGX1o',
            ssl: {
                ca: publicKey
            },
            db: db,
            timeoutError: 3000,
            buffer: 10,
            max: 100
        },
        express: {
            port: 3000
        }
    };

} else {

    var config = {
        rethinkdb: {
            host: "localhost",
            port: 28015,
            password: "Oren1979",
            db: db
        },
        express: {
            port: 3000
        }
    };

}

module.exports = config;