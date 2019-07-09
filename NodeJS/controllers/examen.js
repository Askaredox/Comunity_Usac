const examens = require('../db_apis/examen.js');
const oracledb = require('oracledb');
 
function getExamFromRec(req) {
    
    const Examen = {
        ID_USUARIO: req.body.ID_USUARIO,
        NOMBRE: req.body.NOMBRE,
        tmp:{
            dir:oracledb.BIND_OUT,
            type:oracledb.NUMBER
        },
        TIEMPO: req.body.TIEMPO
    };
    return Examen;
}
function getPregFromRec(req) {
    
    const Examen = {
        ID_EXAMEN: req.body.ID_EXAMEN,
        TIPO: req.body.TIPO,
        TEXTO: req.body.TEXTO,
        tmp:{
            dir:oracledb.BIND_OUT,
            type:oracledb.NUMBER
        }
    };
    return Examen;
}
function getRespFromRec(req) {
    
    const Examen = {
        ID_PREGUNTA: req.body.ID_PREGUNTA,
        CORRECTA: req.body.CORRECTA,
        TEXTO: req.body.TEXTO,
    };
    return Examen;
}
function getNotaFromRec(req) {
    
    const Examen = {
        ID_USUARIO: req.body.ID_USUARIO,
        ID_EXAMEN: req.body.ID_EXAMEN,
        NOTA: req.body.NOTA
    };
    return Examen;
}
/******************************************************************************************/

async function get(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
        context.id = parseInt(req.params.id, 10);
        let rows;
        switch(req.params.tipo){
            case 'E':
                rows = await examens.findE(context);
                res.status(200).json(rows);
                break;
            case 'P':
                rows = await examens.findP(context);
                res.status(200).json(rows);
                break;
            case 'R':
                rows = await examens.findR(context);
                res.status(200).json(rows);
                break;
            default:
                res.status(404);
                break;
        }
    } catch (err) {
        next(err);
    }
}module.exports.get = get;

async function post(req, res, next) {
    try {
        
        res.header("Access-Control-Allow-Origin", "*");
        switch(req.params.tipo){
            case 'E':{
                let exam = getExamFromRec(req);
                exam = await examens.createE(exam);
                res.status(200).json(exam);
                break;
            }
            case 'P':{
                let exam = getPregFromRec(req);
                exam = await examens.createP(exam);
                res.status(201).json(exam);
                break;
            }
            case 'R':{
                let exam = getRespFromRec(req);
                exam = await examens.createR(exam);
                res.status(201).json(exam);
                break;
            } 
            default:
                res.status(404);
                break;
        }
    } catch (err) {
        next(err);
    }
}module.exports.post = post;

async function gete(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
    
        context.nombre = req.params.nombre
    
        const rows = await examens.findE(context);
        if(context.nombre)
            res.status(200).json(rows[0]);
        else
            res.status(200).json(rows);
        
    } catch (err) {
        next(err);
    }
}module.exports.gete = gete;

async function poste(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        let asig = getNotaFromRec(req);
        //console.log(req);
        asig = await examens.createNo(asig);
        res.status(201).json(asig);
    } catch (err) {
        next(err);
    }
}module.exports.poste = poste;

async function gets(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
    
        context.id = parseInt(req.params.id, 10);
        const rows = await examens.find(context);
    
        res.status(200).json(rows[0]);
        
    } catch (err) {
        next(err);
    }
}module.exports.gets = gets;