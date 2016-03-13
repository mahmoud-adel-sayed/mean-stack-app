module.exports = {
	//Production configuration options
	db: process.env.MONGO_URI, // put mongoDB uri here
	sessionSecret: 'ProductionSessionSecret'
};
