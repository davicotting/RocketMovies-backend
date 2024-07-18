const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const authConfigs = require("../configs/auth");
class sessionsController{
    
    async create(request, response){

        const { email, password } = request.body;


        const user = await knex("users").where({email}).first();

        if(!email){
            throw new AppError("ixi deu ruim! Informe o email no corpo da requisicao!", 401)
        }

        if(!password){
            throw new AppError("Ixi deu ruim! A senha nao foi informada!", 401);
        }

        if(!user){
            throw new AppError(`Ixi deu ruim! O Email: ${email} nao está cadastrado aqui!`, 401);
        }

        const passwordVerifyer = await compare(password, user.password);
        
        if(!passwordVerifyer){
            throw new AppError("Ixi deu ruim! Email e/ou senha incorreta, tente novamente!", 401)
        }

        const { secret, expiresIn} = authConfigs.jwt; 

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })



        return response.json({user, token});

        
    }
}

module.exports = sessionsController;