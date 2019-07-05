const carreras = require('../db_apis/carrera.js');
 
function getCarreraFromRec(req) {
    
    const carrera = {
        ID_FACULTAD: req.body.ID_FACULTAD,
        NOMBRE: req.body.NOMBRE
    };
    return carrera;
}

/******************************************************************************************/

async function get(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
    
        context.id = parseInt(req.params.id, 10);
    
        const rows = await carreras.find(context);
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
        let carrera = getCarreraFromRec(req);
        //console.log(req);
        carrera = await carreras.create(carrera);
        res.status(201).json(carrera);
    } catch (err) {
        next(err);
    }
}module.exports.post = post;