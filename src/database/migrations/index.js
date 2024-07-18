    
    const { error } = require("console");

    const users = require("./migrationUsers");

    const database = require("../sqlite");
    
    async function migrations(){
        const schemas = [
            users
        ].join("");

        await database().then(db => db.exec(schemas)).catch(console.error(error));
   
    }

    module.exports = migrations;