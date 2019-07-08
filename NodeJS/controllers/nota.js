const notas = require('../db_apis/nota.js');

async function get(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
        context.tipo=req.params.tipo;
        context.id = req.params.id;
        
    
        const rows = await notas.find(context);
        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
}module.exports.get = get;