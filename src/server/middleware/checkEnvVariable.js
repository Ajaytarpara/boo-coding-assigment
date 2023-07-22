const fs = require('fs');
const config = require('../../config')
const { map } = require('lodash');

async function checkEnvVariable() {
    try {
        let data = fs.readFileSync('.env.example', 'utf8');
        data = data.replace(/\r?\n|\r/g, '');
        data = data.replace(/ /g, '');
        data = data.split('=');
        let missingKeys = []
        await Promise.all(map(data, (key) => {
            let value = config.get(key);
            if (key && value == undefined) {
                missingKeys.push(key);
            }
        }))
        if (missingKeys.length) {
            console.error(`[error]: The ${missingKeys} environment variable is required`);
            process.exit(1);
        }
        return;
    } catch (err) {
        console.error(err);
    }
}

module.exports = checkEnvVariable;