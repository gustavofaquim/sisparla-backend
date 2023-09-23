import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_DIALECT } = process.env;

async function main(){
    try {
        
        const sequelize = new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD, {
            host: DB_HOST,
            dialect: DB_DIALECT,
            logging: false,
        });

        await sequelize.authenticate();
        return sequelize;

    } catch (error) {
        console.log(`Erro ao conectar ao banco: ${error}`);
    }
}

export default await main();