const ciencias = require('../db_apis/ciencia.js');

function getCieFromRec(req) {
    
    const cie = {
        ID_CARRERA: req.body.ID_CARRERA,
        NOMBRE: req.body.NOMBRE
    };
    return cie;
}
 
/******************************************************************************************/

async function get(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
    
        context.id = parseInt(req.params.id, 10);
    
        const rows = await ciencias.find(context);
    
        res.status(200).json(rows);
        
    } catch (err) {
        next(err);
    }
}module.exports.get = get;

async function post(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        let rol = getCieFromRec(req);
        console.log(req);
        rol = await ciencias.create(rol);
        res.status(201).json(rol);
    } catch (err) {
        next(err);
    }
}module.exports.post = post;