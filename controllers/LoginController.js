const models = require('../models');
const tokenServices = require('../services/token');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




exports.login = async(req, res, next)=>{
    try{
        console.log('prueba')
        const user = await  await models.Usuario.findOne({where: {email: req.body.email}});       
        if (user) {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (passwordIsValid) {
                const token= await tokenServices.encode(user);
                res.status(200).send({
                    tokenReturn: token,
                    auth: true
                })                
            }else{
                res.status(401).send({
                    auth: false,
                    tokenReturn :null,
                    reason: "Invalid Password"
                })
            }
        }else{
            res.status(404).send(
                'User Not Found.'
            )
        }
     } catch(error){
       res.status(500).json({
             error: 'Error en la conexion con el servidor =('
         })
         next(error);
     }
}