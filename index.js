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

server.post("/api/users", (req, res) => {
	const userInfo = req.body;
	console.log(userInfo);

	if (userInfo.name && userInfo.bio) {
		users
			.insert(userInfo)
			.then(user => {
				res.status(201).json(user);
			})
			.catch(error => {
				res.status(500).json({
					error: "There was an error while saving the user to the database"
				});
			});
	} else {
		res
			.status(400)
			.json({ errorMessage: "Please provide name and bio for the user." });
	}
});

server.delete("/api/users/:id", (req, res) => {
	const { id } = req.params;
	users
		.remove(id)
		.then(deleted => {
			if (deleted) {
				res.status(204).end();
			} else {
				res
					.status(404)
					.json({ message: "The user with the specified ID does not exist." });
			}
		})
		.catch(error => {
			res.status(500).json({ error: "The user could not be removed" });
		});
});
