// implement your API here
const express = require("express");

const users = require("./data/db.js");

const server = express();

server.use(express.json()); // parse JSON in POST

const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));

server.get("/api/users", function(req, res) {
	users
		.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(error => {
			res
				.status(500)
				.json({ error: "The users information could not be retrieved." });
		});
});

server.get("/api/users/:id", function(req, res) {
	const { id } = req.params;
	users
		.findById(id)
		.then(user => {
			if (user) {
				res.status(200).json(user);
			} else {
				res
					.status(404)
					.json({ message: "The user with the specified ID does not exist." });
			}
		})
		.catch(error => {
			res
				.status(500)
				.json({ error: "The user information could not be retrieved." });
		});
});
