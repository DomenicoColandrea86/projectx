'use strict';

module.exports = {
	db: 'mongodb://localhost/projectx_test',
	port: 3001,
	app: {
		title: 'projectX - Test Environment'
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
		from: process.env.MAILER_FROM || 'dom@cainkade.com',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'gmail',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'domenico.colandrea@cainkade.com',
				pass: process.env.MAILER_PASSWORD || 'javasun1'
			}
		}
	}
};
