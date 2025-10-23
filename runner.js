const dotenv = require('dotenv');
dotenv.config();

const file = process.argv[2] || 'index.js';

try {
    require(`./${process.env.RUNNER_FOLDER + file}`);
} catch (err) {
    console.error('Không thể chạy file:', err);
}
