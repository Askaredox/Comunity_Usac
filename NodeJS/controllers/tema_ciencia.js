const tema_ciencia = require('../db_apis/tema_ciencia.js');

function getCieFromRec(req) {
    
    const cie = {
        ID_CIENCIA: req.body.ID_CIENCIA,
        ID_TEMA: req.body.ID_TEMA
    };
    return cie;
}
 
/******************************************************************************************/

async function get(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
    
        context.id = parseInt(req.params.id, 10);
    
        const rows = await tema_ciencia.find(context);
    
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
        rol = await tema_ciencia.create(rol);
        res.status(201).json(rol);
    } catch (err) {
        next(err);
    }
}module.exports.post = post;