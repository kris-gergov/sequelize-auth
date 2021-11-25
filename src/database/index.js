import { Sequelize } from 'sequelize';
import { registerModels } from '../models';

class Database {
    constructor(environment, dbConfig) {
        this.environment = environment;
        this.dbConfig = dbConfig;
        this.isTestEnvironment = this.environment === 'test';
    }

    getConnectionString() {
        const dbConfig = this.isTestEnvironment ? this.dbConfig.test : this.dbConfig.development;
        const { username, password, host, port, database } = dbConfig;
        return `postgres://${username}:${password}@${host}:${port}/${database}`;
    }

    async connect() {
        // Get the connection string
        const uri = this.getConnectionString();

        // Create the connection
        this.connection = new Sequelize(uri, { logging: this.isTestEnvironment ? false : console.log });

        // Check if we connected successfully
        await this.connection.authenticate({ logging: false });

        if (!this.isTestEnvironment) {
            console.log('Database connection established successfully');
        }

        // Register models
        registerModels(this.connection);

        // Sync models
        await this.sync();
    }

    async sync() {
        await this.connection.sync({ force: this.isTestEnvironment, logging: false });

        if (!this.isTestEnvironment) {
            console.log('Models synchronized successfully');
        }
    }

    async disconnect() {
        await this.connection.close();
    }
}

export default Database;
