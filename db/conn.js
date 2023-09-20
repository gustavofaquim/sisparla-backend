import Sequelize from 'sequelize';

async function main(){
    try {
        
        const sequelize = new Sequelize('SisParla', 'root', '123456789', {
            host: 'localhost',
            dialect: 'mysql'
        });

        await sequelize.authenticate();
        return sequelize;

    } catch (error) {
        console.log(`Erro ao conectar ao banco: ${error}`);
    }
}

export default await main();