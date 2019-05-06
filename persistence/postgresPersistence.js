const { Client } = require('pg');

const client = new Client({
	connectionString: process.env.DATABASE_URL || 'postgres://sfmgqjobsuvswt:8b194bb6e08816079339db1cd7d4b665a751fa7652c8f2862bc775511685a787@ec2-54-197-234-117.compute-1.amazonaws.com:5432/d3t80jg3emg4or',
	ssl: true,
});

const TABLE_NAME = 'space_key_storage'
const SPACE_NAME = 'RoyalPricks'

const DROP = `DROP TABLE ${TABLE_NAME}`
const INIT = `
  CREATE TABLE "${TABLE_NAME}" (
	"space_name" varchar(255) NOT NULL,
	"key" varchar(255) NOT NULL,
	"value" TEXT NOT NULL,
	CONSTRAINT space_key_storage_pk PRIMARY KEY ("space_name", "key")
) WITH (
  OIDS=FALSE
);`

client.connect();

console.log('querying db')
client
	.query(`SELECT table_schema,table_name FROM information_schema.tables WHERE table_name = '${TABLE_NAME}';`)
	.then((res) => {
		// return client.query(DROP);
		if (res.rows.length === 0) {
			console.log('db does not exist yet');
			return client.query(INIT);
		}
	})
	.then(() => {
		console.log('db init done')
	});


module.exports.create = () => {
	return {
		setKey(name, value) {
			return client.query(`
INSERT INTO ${TABLE_NAME} (space_name, key, value) 
VALUES ('${SPACE_NAME}', '${name}', '${JSON.stringify(value)}')
ON CONFLICT (space_name, key) DO UPDATE 
SET value = excluded.value;
			`).then(() => {
				console.log("all good")
			}, (e) => {
				console.error("not good", e)
			});
		},
		getKey(name) {
			return client
				.query(`SELECT value FROM ${TABLE_NAME} WHERE space_name = '${SPACE_NAME}' AND key = '${name}'`)
				.then((res) => {
					if (res.rows.length === 0) {
						console.error(`Can not find key ${name} for space ${SPACE_NAME}`)
						return null;
					}

					return JSON.parse(res.rows[0].value)
				});
		}
	}
}
