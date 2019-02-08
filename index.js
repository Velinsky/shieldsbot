'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const shields = require('./shields');
const parseMessage = require('./parseMessage');

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

app.get('/parse/:message', (req, res) => {
	console.log("TEST PARSE")
	let parsed = parseMessage(req.params.message)
	if (!parsed) {
		res.send("NOT SHIELD MESSAGE");
		return;
	}

	if (parsed.error) {
		res.send(parsed.message);
		return;
	}

	shields.addShield("test", parsed.duration, parsed.amount)
	res.send(parsed);
})

// event handler
function handleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
		// ignore non-text-message event
		return Promise.resolve(null);
	}

	let incomingMsg = event.message.text

	console.log('handling incoming message', incomingMsg);
	// LIST SHIELDS
	if (incomingMsg.toLowerCase().startsWith("shields")) {
		return client.replyMessage(event.replyToken, { type: "text", text: JSON.stringify(shields.getActiveShields(), null, 2)});
	}

	// ADD SHIELD
	let replyText = '';
	let userName = event.message.source.userId;
	let parsed = parseMessage(incomingMsg)

	// no shield message
	if (!parsed) {
		return Promise.resolve(null);
	}

	// parsing error
	if (parsed.error) {
		replyText = parsed.message
	}
	// all good here
	else {
		shields.addShield(userName, parsed.duration, parsed.amount)
		replyText = `Registered new shield for user [${userName}], ends in [${parsed.amount}] [${parsed.duration}].`
	}

	let echo = { type: 'text', text: replyText };

	// use reply API
	return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 80;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});
