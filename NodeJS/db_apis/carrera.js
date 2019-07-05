const database = require('../services/database.js');
 
const baseQuery = 
    `SELECT 
        id_carrera, 
        id_facultad, 
        nombre 
    FROM Carrera`
;

async function find(context) {
    let query = baseQuery;
    const binds = {};
    
    if (context.id) {
        binds.id_carrera = context.id;
    
        query += `\nWHERE id_carrera = :id_carrera`;
    }
    
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;

}module.exports.find = find;

const createSQL =
    `INSERT INTO Carrera(
        id_facultad, 
        nombre
    ) VALUES (
        :ID_FACULTAD,
        :NOMBRE
    )`;

async function create(emp) {
    const carrera = Object.assign({}, emp);
    console.log(carrera);
    
    const result = await database.simpleExecute(createSQL, carrera);
    
    return carrera;

}module.exports.create = create;