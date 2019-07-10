const database = require('../services/database.js');

const queryF =
    `SELECT id_facultad, nombre 
    FROM Facultad`
;
const queryCa =
    `SELECT id_carrera, nombre FROM Carrera`
;
const queryCi =
    `SELECT id_ciencia, nombre FROM Ciencia`
;
async function find(context) {
    let query = "";
    const binds = {};
    
    if (context.tipo=='F') {
        query+=queryF
    }
    else if (context.tipo=='A') {
        query+=queryCa
        if(context.id){
            binds.id = context.id;
            query += `\nWHERE id_facultad=:id`;
        }
    }
    else if (context.tipo=='I') {
        query+=queryCi
        if(context.id){
            binds.id = context.id;
            query += `\nWHERE id_carrera=:id`;
        }
    }
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;

}module.exports.find = find;