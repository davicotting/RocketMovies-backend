    
    const knex = require("../database/knex");
    
    class tagsControllers{

        async index(request, response){
            const user_id = request.user.id;

            const tags = await knex("tags")
            .where({ user_id })
            .groupBy("name");

            return response.json(tags);
        }
    }

    module.exports = tagsControllers;