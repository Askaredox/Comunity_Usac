const database = require('../services/database.js');
 
const baseQuery = 
    `SELECT ci.nombre AS ciencia, ca.nombre AS carrera, F.nombre AS facultad 
    FROM Ciencia ci, Carrera ca, Facultad f 
    WHERE ci.id_carrera=ca.id_carrera 
    AND ca.id_facultad=f.id_facultad`
;
 
async function find(context) {
    let query = baseQuery;
    const binds = {};
    
    if (context.id) {
        binds.id_ciencia = context.id;
    
        query += `\nAND ci.id_ciencia = :id_ciencia`;
    }
    
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;
}module.exports.find = find;

const createSQL =
    `INSERT INTO Ciencia(id_carrera, nombre) 
    VALUES(:ID_CARRERA, :NOMBRE)`
;

async function create(emp) {
    const rol = Object.assign({}, emp);

    const result = await database.simpleExecute(createSQL, rol);
    
    return rol;

}module.exports.create = create;