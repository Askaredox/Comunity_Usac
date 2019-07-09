const database = require('../services/database.js');
 
const baseQuery = 
    `SELECT id_ciencia, id_carrera, nombre 
    FROM Ciencia`;
 
async function find(context) {
    let query = baseQuery;
    const binds = {};
    
    if (context.id) {
        binds.id_ciencia = context.id;
    
        query += `\nWHERE id_ciencia = :id_ciencia`;
    }
    
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;
}module.exports.find = find;

const createSQL =
    `INSERT INTO Carrera(
        id_carrera, 
        nombre
    ) VALUES(
        :ID_FACULTAD, 
        :NOMBRE
    )`
;

async function create(emp) {
    const rol = Object.assign({}, emp);

    const result = await database.simpleExecute(createSQL, rol);
    
    return rol;

}module.exports.create = create;