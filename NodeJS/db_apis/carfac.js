const database = require('../services/database.js');
 
const baseQuery = 
    `SELECT 
        c.nombre as "CARRERA", 
        f.nombre as "FACULTAD"
    FROM 
        Facultad f, 
        Carrera c 
    WHERE f.id_facultad=c.id_facultad`
;

async function find(context) {
    let query = baseQuery;
    const binds = {};
    
    if (context.id) {
        binds.id_carfac = context.id;
    
        query += `\nAND c.id_carrera = :id_carfac`;
    }
    
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;

}module.exports.find = find;
