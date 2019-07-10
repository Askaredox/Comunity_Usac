const database = require('../services/database.js');
 
const baseQuery = 
    `SELECT c.nombre AS "CIENCIA" 
    FROM Tema t, Tema_Ciencia tc, Ciencia c
    WHERE t.id_tema = tc.id_tema
    AND c.id_ciencia = tc.id_ciencia`
;
 
async function find(context) {
    let query = baseQuery;
    const binds = {};
    
    if (context.id) {
        binds.id_tema = context.id;
    
        query += `\nAND t.id_tema =:id_tema`;
    }
    
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;
}module.exports.find = find;

const createSQL =
    `INSERT INTO Tema_Ciencia(id_tema, id_ciencia) 
    VALUES (:ID_TEMA, :ID_CIENCIA)`
;

async function create(emp) {
    const rol = Object.assign({}, emp);

    const result = await database.simpleExecute(createSQL, rol);
    
    return rol;

}module.exports.create = create;