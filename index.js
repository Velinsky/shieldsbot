'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const shields = require('./shields');

// create LINE SDK config from env variables
const config = {
	channelAccessToken: "k0zMDSa2zk0dD33o9sNdNkuJQePXCMf6BfPyezhINMlqFV8hPfRg2ItIIoFSELKyf/CGw4/T6sHLIMe4qvwAXQ2zAEgLwaABLxEb9fVzCMgrGNppiAFa4CfZOVpl5LjaQy1subcqUEe/pAW2PBwiVgdB04t89/1O/w1cDnyilFU=",
	channelSecret: "27f3dcfba6be05e24c76fe574b21126b",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
	Promise
		.all(req.body.events.map(handleEvent))
		.then((result) => res.json(result))
		.catch((err) => {
			console.error(err);
			res.status(500).end();
		});
});

app.get('/add/:name/:duration', (req, res) => {
	shields.addShield(req.params.name, req.params.duration)
	res.send(shields.getActiveShields())
})

app.get('/list', (req, res) => {
	res.send(shields.getActiveShields())
})

// event handler
function handleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
		// ignore non-text-message event
		return Promise.resolve(null);
	}

	// create a echoing text message
	const echo = { type: 'text', text: event.message.text };

	// use reply API
	return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});
