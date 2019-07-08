const database = require('../services/database.js');

const queryT =
    `SELECT u.nombre, u.id_usuario, s.nota, s.fecha 
    FROM Sol_examen s, Usuario u 
    WHERE u.id_usuario = s.id_usuario`
;
const queryS =
    `SELECT e.nombre, s.fecha, s.nota 
    FROM Sol_examen s,Examen e,Usuario u 
    WHERE s.id_examen = e.id_examen 
    AND s.id_usuario=u.id_usuario`
;
async function find(context) {
    let query = "";
    const binds = {};
    
    if (context.tipo=='S') {
        query+=queryS
        if(context.id){
            binds.id = context.id;
            query += `\nAND s.id_usuario=:id`;
        }
        
    }
    else if (context.tipo=='T') {
        query+=queryT
        if(context.id){
            binds.id = context.id;
            query += `\nAND s.id_examen=:id`;
        }
        
    }
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;

}module.exports.find = find;