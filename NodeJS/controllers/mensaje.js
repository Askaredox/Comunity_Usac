const mensajes = require('../db_apis/mensaje.js');

function getMenFromRec(req) {
    
    const Mensaje = {
        ID_CHAT: req.body.ID_CHAT,
        ID_USUARIO: req.body.ID_USUARIO,
        TEXTO: req.body.TEXTO
    };
    return Mensaje;
}

/******************************************************************************************/

async function get(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
    
        context.id = parseInt(req.params.id, 10);
    
        const rows = await mensajes.find(context);
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
        let mensaje = getMenFromRec(req);
        //console.log(req);
        mensaje = await mensajes.create(mensaje);
        res.status(201).json(mensaje);
    } catch (err) {
        next(err);
    }
}module.exports.post = post;

async function obtener(id){
    const context = {};
    
    context.id = id;

    const rows = await mensajes.find(context);
    return rows;
}module.exports.obtener = obtener;

async function poner(mens){
    const rows = await mensajes.create(mens);
    return rows;
}module.exports.poner = poner;