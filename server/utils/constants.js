/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 18/06/2016
 * Time: 07:31
 */

if (process.env.NODE_ENV == "production") {


    var constants = {

        ADMIN_EMAIL: 'hello@boilerplate.com',
        SYSTEM_EMAIL: 'hello@boilerplate.com',
        SYSTEM_NAME: 'Boilerplate',
        SYSTEM_NAME_SLUG: 'boilerplate',
        SYSTEM_URL: 'http://boilerplate.com',
        SMTP_HOST: 'boilerplate',
        SMTP_PASSWORD: 'oren1979',
        CLOUDINARY_NAME: "benzo",
        CLOUDINARY_API_KEY: "776284389836144",
        CLOUDINARY_API_SECRET: "rZdGUWjE2VnDkaFNdRMb1IT13eM"
    }

} else {

    var constants = {

        ADMIN_EMAIL: 'hello@boilerplate.com',
        SYSTEM_EMAIL: 'hello@boilerplate.com',
        SYSTEM_NAME: 'Boilerplate',
        SYSTEM_NAME_SLUG: 'boilerplate',
        SYSTEM_URL: 'localhost:3000',
        SMTP_HOST: 'boilerplate.com',
        SMTP_HOST: 'boilerplate.com',
        CLOUDINARY_NAME: "benzo",
        CLOUDINARY_API_KEY: "776284389836144",
        CLOUDINARY_API_SECRET: "rZdGUWjE2VnDkaFNdRMb1IT13eM"
    }
}

module.exports = constants