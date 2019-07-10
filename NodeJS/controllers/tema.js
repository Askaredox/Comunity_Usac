const temas = require('../db_apis/tema.js');
const oracledb = require('oracledb');
 
function getTemaFromRec(req) {
    
    const Tema = {
        ID_USUARIO: req.body.ID_USUARIO,
        TITULO: req.body.TITULO,
        CONTENIDO: req.body.CONTENIDO,
        HABILITADO: req.body.HABILITADO,
        tmp:{
            dir:oracledb.BIND_OUT,
            type:oracledb.NUMBER
        }
    };
    return Tema;
}

/******************************************************************************************/

async function get(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
    
        context.id = parseInt(req.params.id, 10);
    
        const rows = await temas.find(context);
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
        let tema = getTemaFromRec(req);
        //console.log(req);
        tema = await temas.create(tema);
        res.status(201).json(tema);
    } catch (err) {
        next(err);
    }
}module.exports.post = post;