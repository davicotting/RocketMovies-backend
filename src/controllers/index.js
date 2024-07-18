    
    const AppError = require("../utils/AppError");
    const { hash, compare } = require("bcryptjs");
    const databaseConnection = require("../database/sqlite");


    class UserControllers{

        

        async create(request, response){
            const { name, email, password } = request.body;

            const database = await databaseConnection();

            const hashedPassword = await hash(password, 8);

            const checkIfUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

            if(checkIfUserExists){
                throw new AppError(`Ixi deu ruim! Esse email ja esta sendo usando.`, 409);
            }

            if(!checkIfUserExists){
    
                await database.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, hashedPassword]);
            }

            return response.status(201).json();
        }

        async update(request, response){

            // parametros

            const { name, email, new_password, old_password } = request.body;

            const user_id = request.user.id;

            const database = await databaseConnection();

            const user = await database.get(`SELECT * FROM users WHERE id = (?)`, [user_id]);
           
            
            if(!user){
                throw new AppError(`O usuario com id: ${id} nao existe.`, 401);
            }

            const checkIfEmailExists = await database.get(`SELECT * FROM users WHERE email = (?)`, [email]);

            if(checkIfEmailExists && checkIfEmailExists.id !== user_id){
                throw new AppError(`O email ja esta em uso.`, 402);
            }
            
            if(new_password && !old_password){
                throw new AppError(`Senha antiga nao informada.`, 403);
            }

            if(new_password && old_password){
                const checkPassword = await compare(old_password, user.password);

                if(!checkPassword){
                    throw new AppError(`Senha informada diferente da antiga.`, 404);
                }

                user.password = await hash(new_password, 8);
                
            }

            user.name = name ?? user.name;
            user.email = email ?? user.email;

            await database.run(
                `UPDATE users SET
                name = ?,
                email = ?,
                password = ?,
                updated_at = DATETIME('now')
                WHERE id = ?
                `, [user.name, user.email, user.password, user_id]);

                return response.status(201).json("Os dados do usuário foi atualizado com sucesso!");

            }

    }

   module.exports = UserControllers;