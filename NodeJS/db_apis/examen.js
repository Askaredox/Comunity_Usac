const database = require('../services/database.js');
 
const queryE = 
    `SELECT * FROM Examen`
;
const queryP = 
    `SELECT * FROM Pregunta`
;
const queryR = 
    `SELECT * FROM Respuesta`
;
async function findE(context) {
    let query = queryE;
    const binds = {};
    
    if (context.id) {
        binds.id_usuario = context.id;
        query += `\nWHERE id_usuario=:id_usuario`;
    }
    else if (context.nombre) {
        binds.nombre = context.nombre;
        query += `\nWHERE nombre=:nombre`;
    }
    query+=`\nORDER BY id_examen DESC`;
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;

}module.exports.findE = findE;

async function findP(context) {
    let query = queryP;
    const binds = {};
    
    if (context.id) {
        binds.id_examen = context.id;
        query += `\nWHERE id_examen=:id_examen`;
    }
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;

}module.exports.findP = findP;

async function findR(context) {
    let query = queryR;
    const binds = {};
    
    if (context.id) {
        binds.id_pregunta = context.id;
        query += `\nWHERE id_pregunta=:id_pregunta`;
    }
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;

}module.exports.findR = findR;








const createEQ =
    `INSERT INTO Examen(id_usuario, nombre, fecha) VALUES (:ID_USUARIO,:NOMBRE,SYSDATE) RETURNING id_examen INTO :tmp`
;
const createPQ =
    `INSERT INTO Pregunta(id_examen, tipo, texto) VALUES (:ID_EXAMEN,:TIPO,:TEXTO) RETURNING id_pregunta INTO :tmp`
;
const createRQ =
    `INSERT INTO Respuesta(id_pregunta, correcta, texto) VALUES (:ID_PREGUNTA,:CORRECTA,:TEXTO)`
;

async function createE(emp) {
    const resp = Object.assign({}, emp);
    //console.log(emp);
    const result=await database.simpleExecute(createEQ, resp);
    resp.tmp=result.outBinds.tmp[0];
    console.log(resp)
    return resp;

}module.exports.createE = createE;

async function createP(emp) {
    const resp = Object.assign({}, emp);
    //console.log(emp);
    const result=await database.simpleExecute(createPQ, resp);
    resp.tmp=result.outBinds.tmp[0];
    return resp;
    
}module.exports.createP = createP;

async function createR(emp) {
    const resp = Object.assign({}, emp);
    //console.log(emp);
    const result = await database.simpleExecute(createRQ, resp);
    
    return resp;

}module.exports.createR = createR;