import './config';
import Database from './database';
import environment from './config/environment';
import dbConfig from './config/database';
import App from './app';

(async () => {
    try {
        // Connect to the database
        const db = new Database(environment.nodeEnv, dbConfig);
        await db.connect();

        // Import the app and setup sercecr
        const app = new App();
        app.listen();
    } catch (err) {
        console.log(`Server error - ${err.stack}`);
    }
})();
