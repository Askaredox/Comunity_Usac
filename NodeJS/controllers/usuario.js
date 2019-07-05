const usuarios = require('../db_apis/usuario.js');
 
function getUsuarioFromRec(req) {
    
    const usuario = {
        ID_USUARIO: req.body.ID_USUARIO,
        ID_ROL: req.body.ID_ROL,
        NOMBRE: req.body.NOMBRE,
        CONTRASENA: req.body.CONTRASENA,
        PATH_IMG: req.body.PATH_IMG
    };
    return usuario;
}

/******************************************************************************************/

async function get(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
    
        context.id = parseInt(req.params.id, 10);
    
        const rows = await usuarios.find(context);
        if (req.params.id) {
            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            } 
            else {
                res.status(200).json(rows[0]);
            }
        } 
        else {
            res.status(200).json(rows);
        }
    } catch (err) {
        next(err);
    }
}module.exports.get = get;

async function post(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        let usuario = getUsuarioFromRec(req);
        //console.log(req);
        usuario = await usuarios.create(usuario);
        res.status(201).json(usuario);
    } catch (err) {
        next(err);
    }
}module.exports.post = post;