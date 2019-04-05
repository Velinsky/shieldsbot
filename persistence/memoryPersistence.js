const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "./persistence.json")

if (!fs.existsSync(file)) {
	fs.writeFileSync(file, JSON.stringify({}));
}
let store = JSON.parse(fs.readFileSync(file));

module.exports.create = () => {

	return {
		setKey(name, value) {
			store[name] = value
			fs.writeFileSync(file, JSON.stringify(store));
		},
		getKey(name) {
			return store[name]
		}
	}
}
