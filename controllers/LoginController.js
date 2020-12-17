const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




exports.login = async(req, res, next)=>{

    try{ 
        
        const user = await models.user.findOne({where: {email: req.body.email}});
        if (user) {
            
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (passwordIsValid) {
                
                const token= jwt.sign({
                    id: user.id,
                    name: user.name,
                    email: user.email
                }, 'config.secret' ,{
                    expiresIn: 86400 //el token expira en 24 horas
                });
                res.status(200).send({
                    accessToken: token,
                    auth: true
                })                
            }else{
                res.status(401).send({
                    auth: false,
                    accessToken :null,
                    reason: "Invalid Password"
                })
            }
        }else{
            res.status(404).send(
                'User Not Found.'
            )
        }
     } catch(err){
       res.status(500).json({
             err: 'Error en la conexion con el servidor =('
         })
         next(err);
     }
}