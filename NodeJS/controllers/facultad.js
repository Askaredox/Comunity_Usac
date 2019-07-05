const facultades = require('../db_apis/facultad.js');

function getFacFromRec(req) {
    
    const fac = {
        NOMBRE: req.body.NOMBRE,
        DESCRIPCION: req.body.DESCRIPCION
    };
    return fac;
}
 
/******************************************************************************************/

async function get(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
    
        context.id = parseInt(req.params.id, 10);
    
        const rows = await facultades.find(context);
    
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
        let fac = getFacFromRec(req);
        console.log(req);
        fac = await facultades.create(fac);
        res.status(201).json(fac);
    } catch (err) {
        next(err);
    }
}module.exports.post = post;