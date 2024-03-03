import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_DIALECT } = process.env;

async function connectToDatabase() {
    try {
        const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
            host: DB_HOST,
            dialect: DB_DIALECT,
            logging: false,
        });

        await sequelize.authenticate();
        return sequelize;
    } catch (error) {
        console.log(`Erro ao conectar ao banco: ${error}`);
        return null; // Retornar null em caso de falha na conexão
    }
}

async function main() {
    let sequelizeInstance = null;

    while (!sequelizeInstance) {
        sequelizeInstance = await connectToDatabase();

        if (!sequelizeInstance) {
            const currentDate = new Date().toLocaleString();
            console.log(`[${currentDate}] Tentando novamente em 5 minutos...`);
            await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));
        }
    }

    return sequelizeInstance;
}

export default await main();
