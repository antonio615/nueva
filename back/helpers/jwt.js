var jwt=require('jwt-simple');
var moment=require('moment');
var secret = 'diana';

exports.createToken = function(usuario){
    var payload={
        sub:usuario._id,
        npmbre:usuario.nombre,
        apellido:usuario.apellido,
        email:usuario.email,
        rol:usuario.rol,
        iat:moment().unix(),
        exp:moment().add(1,'day').unix()
    }
    return jwt.encode(payload,secret);
}