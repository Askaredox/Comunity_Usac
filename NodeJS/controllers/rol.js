const roles = require('../db_apis/rol.js');

function getRolFromRec(req) {
    
    const rol = {
        NOMBRE: req.body.NOMBRE,
        DESCRIPCION: req.body.DESCRIPCION
    };
    return rol;
}
 
/******************************************************************************************/

async function get(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
    
        context.id = parseInt(req.params.id, 10);
    
        const rows = await roles.find(context);
    
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
        let rol = getRolFromRec(req);
        console.log(req);
        rol = await roles.create(rol);
        res.status(201).json(rol);
    } catch (err) {
        next(err);
    }
}module.exports.post = post;