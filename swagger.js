const swaggerJsdoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "RLS API",
			version: "1.0.0",
			description: "This the api used for the refactory learning platform",
		},
		servers: [
			{
               url: "http://localhost:5000",
			},
		],
	},
	apis: ["./routes/*.js"],
};


const specs = swaggerJsdoc(options);

module.exports = specs;
