/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 18/06/2016
 * Time: 07:31
 */

if (process.env.NODE_ENV == "production") {


    var constants = {

        ADMIN_EMAIL: 'hello@pornbook.club',
        SYSTEM_EMAIL: 'hello@pornbook.club',
        SYSTEM_NAME: 'Porn Book Club',
        SYSTEM_NAME_SLUG: 'pornbookclub',
        SYSTEM_URL: 'http://pornbook.club',
        SMTP_HOST: 'pornbook.club',
        SMTP_PASSWORD: 'oren1979',
        CLOUDINARY_NAME: "benzo",
        CLOUDINARY_API_KEY: "776284389836144",
        CLOUDINARY_API_SECRET: "rZdGUWjE2VnDkaFNdRMb1IT13eM"
    }

} else {

    var constants = {

        ADMIN_EMAIL: 'hello@pornbook.club',
        SYSTEM_EMAIL: 'hello@pornbook.club',
        SYSTEM_NAME: 'Porn Book Club',
        SYSTEM_NAME_SLUG: 'pornbookclub',
        SYSTEM_URL: 'localhost:3000',
        SMTP_HOST: 'webscopeapp.com',
        SMTP_HOST: 'pornbook.club',
        CLOUDINARY_NAME: "benzo",
        CLOUDINARY_API_KEY: "776284389836144",
        CLOUDINARY_API_SECRET: "rZdGUWjE2VnDkaFNdRMb1IT13eM"
    }
}

module.exports = constants