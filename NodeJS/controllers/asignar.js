const asigs = require('../db_apis/asignar.js');
 
function getAsigFromRec(req) {
    
    const asig = {
        ID_USUARIO: req.body.ID_USUARIO,
        ID_CARRERA: req.body.ID_CARRERA
    };
    return asig;
}
async function post(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        let asig = getAsigFromRec(req);
        //console.log(req);
        asig = await asigs.create(asig);
        res.status(201).json(asig);
    } catch (err) {
        next(err);
    }
}module.exports.post = post;