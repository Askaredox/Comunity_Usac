const database = require('../services/database.js');
 
const baseQuery = 
    `SELECT id_rol, nombre, descripcion
    FROM Rol`;
 
async function find(context) {
    let query = baseQuery;
    const binds = {};
    
    if (context.id) {
        binds.id_rol = context.id;
    
        query += `\nWHERE id_rol = :id_rol`;
    }
    
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;
}module.exports.find = find;

const createSQL =
    `INSERT INTO Rol(
        nombre, 
        descripcion
    ) VALUES (
        :NOMBRE,
        :DESCRIPCION
    )`
;

async function create(emp) {
    const rol = Object.assign({}, emp);

    console.log(rol);
    const result = await database.simpleExecute(createSQL, rol);
    
    return rol;

}module.exports.create = create;