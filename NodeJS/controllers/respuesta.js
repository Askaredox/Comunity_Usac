const respuestas = require('../db_apis/respuesta.js');
 
function getRespFromRec(req) {
    
    const Respuesta = {
        ID_TEMA: req.body.ID_TEMA,
        ID_USUARIO: req.body.ID_USUARIO,
        TEXTO: req.body.TEXTO
    };
    return Respuesta;
}

/******************************************************************************************/

async function get(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
    
        context.id = parseInt(req.params.id, 10);
    
        const rows = await respuestas.find(context);
        if (req.params.id) {
            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            } 
            else {
                res.status(200).json(rows);
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
        let resp = getRespFromRec(req);
        //console.log(req);
        resp = await respuestas.create(resp);
        res.status(201).json(resp);
    } catch (err) {
        next(err);
    }
}module.exports.post = post;