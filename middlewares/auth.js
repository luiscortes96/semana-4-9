//Middleware de autenticacion;
const tokenService = require('../services/token');

module.exports = {
    verificarAdministrador: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'Token no encontrado.'
            });
        } else{
            const validationResponse = await tokenService.decode(req.headers.token);
            console.log(validationResponse)
            if (validationResponse.rol === "Administrador") {
                next();
                
            }else {
                return res.status(403).send({
                    message: 'No autorizado'
                });
            }
        }
    }
};