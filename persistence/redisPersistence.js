const Redis = require('ioredis');
const temporaryCredentials = "redis://h:p27aae25584b363d739e84c4cff9f291a57f84e1af8fcdc761c67c7b7b4f13895@ec2-35-171-63-41.compute-1.amazonaws.com:19329"
const redis = new Redis(process.env.REDIS_URL || temporaryCredentials);

module.exports.create = () => {
	return {
		setKey(name, value) {
			return redis.set(name, JSON.stringify(value))
		},
		getKey(name) {
			return redis.get(name).then(res => JSON.parse(res))
		}
	}
}
