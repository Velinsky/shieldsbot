'use strict';
const line = require('@line/bot-sdk');
const express = require('express');

const createCommands = require('./createCommands')
const persistenceBase = require('./persistence/memoryPersistence')
// const persistenceBase = require('./persistence/redisPersistence')

let persistence = persistenceBase.create()
let replier = createCommands(persistence)

// create LINE SDK config from env variables
const config = {
	channelAccessToken: "k0zMDSa2zk0dD33o9sNdNkuJQePXCMf6BfPyezhINMlqFV8hPfRg2ItIIoFSELKyf/CGw4/T6sHLIMe4qvwAXQ2zAEgLwaABLxEb9fVzCMgrGNppiAFa4CfZOVpl5LjaQy1subcqUEe/pAW2PBwiVgdB04t89/1O/w1cDnyilFU=",
	channelSecret: "27f3dcfba6be05e24c76fe574b21126b",
};

const localConfig = {
	channelAccessToken: "hsdRJBWHlU7KGUtytrLyDRaHCJqPvdP78GvWuAk+gmpZUxIn5Rqa+CxXcYxNFeXndAjzwJu9obxgNE9trpQnC0Wfd26sPk0qpaX2wrEVLGdDwgyxS3NuwRWnzmtUIA9e+J+Jfi2ZEoSzDUwowbCK7wdB04t89/1O/w1cDnyilFU=",
	channelSecret: "e1d1276f2324e4bbaf73de99811b9179",
}

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
	// shields.addShield(req.params.name, req.params.unit)
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

	shields.addShield("test", parsed.unit, parsed.amount)
	res.send(parsed);
})

// event handler
async function handleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
		// ignore non-text-message event
		return Promise.resolve(null);
	}

	let incomingMsg = event.message.text

	console.log('handling incoming message', incomingMsg);

	// ADD SHIELD
	let replyText = '';
	let userName;
	let userId;

	console.log("source", event.source)
	if (event.source.userId) {
		let profile = await client.getGroupMemberProfile(event.source.groupId, event.source.userId)
		console.log("profile", profile)
		userId = event.source.userId
		userName = profile.displayName;
	}
	else {
		userName = null
	}

	if (incomingMsg === "!t4") {
		client.pushMessage(event.source.userId, {
			type: 'text',
			text: 'Hello World!'
		});
		return Promise.resolve(null);
	}

	let result = await replier.textInput(incomingMsg, { userName, userId }, client);

	if (!result) {
		return Promise.resolve(null)
	}

	let echo = result;

	if (!result.type) {
		echo = { type: 'text', text: result };
	}

	// use reply API
	return client.replyMessage(event.replyToken, echo).catch(e => {
		console.log("request", e.originalError.config.data)
		console.log("response", e.originalError.response.status, e.originalError.response.data)
	});
}

// listen on port
const port = process.env.PORT || 80;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});
