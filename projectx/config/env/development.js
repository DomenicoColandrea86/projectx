'use strict';

module.exports = {
	port: 3000,
	db: 'mongodb://localhost/projectx_dev',
	app: {
		title: 'ProjectX - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1419596198330441',
		clientSecret: process.env.FACEBOOK_SECRET || '041e0532c3b5646824a0b55d6446257e',
		callbackURL: 'https://dev.projectx.com:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'ZSa2hVhssTVCoY84MnHtL7wes',
		clientSecret: process.env.TWITTER_SECRET || 'omY2CTNyK2nskKQvuFyZUErpJpWmgfR2c6nzxtcwXHmqUJ9obJ',
		callbackURL: 'https://dev.projectx.com:3000/auth/twitter/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
