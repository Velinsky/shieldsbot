const MongoClient = require('mongodb').MongoClient;

const DB_USER = 'ss'
const DB_PASS = 'ss1ss1'
const DB_NAME = 'heroku_0n8dj6v1'


const url = `mongodb://${DB_USER}:${DB_PASS}@ds135456.mlab.com:35456/${DB_NAME}`;

let client = new MongoClient(url);
let db;
let collection;

client.connect(function(err, _db) {
	if (err) {
		console.log(err)
		throw err;
	}

	db = client.db()
	collection = db.collection('RoyalPricks')

	console.log('Connected successfully to server');

});

module.exports.create = () => {

	return {
		setKey(name, value) {
			collection.updateOne({ key: name}, { $set: {value: value}}, { upsert: true }, (err) => {
				if (err) {
					console.error(err)
				}
			})
		},
		getKey(name) {
			return new Promise((res, rej) => {
				collection.findOne({ key: name }, (err, item) => {
					if (err) {
						rej(err)
						return;
					}

					res(item.value);
				})
			})
		}
	}
}
