const database = require('../services/database.js');
 
const baseQuery = 
    `SELECT 
        id_facultad, 
        nombre, 
        descripcion 
    FROM Facultad`;
 
async function find(context) {
    let query = baseQuery;
    const binds = {};
    
    if (context.id) {
        binds.id_facultad = context.id;
    
        query += `\nWHERE id_facultad = :id_facultad`;
    }
    
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;
}module.exports.find = find;

const createSQL =
    `INSERT INTO Facultad(
        nombre, descripcion
    ) VALUES (
        :NOMBRE, 
        :DESCRIPCION
    )`;

async function create(emp) {
    const fac = Object.assign({}, emp);

    console.log(fac);
    const result = await database.simpleExecute(createSQL, fac);
    
    return fac;

}module.exports.create = create;