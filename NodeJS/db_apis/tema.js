const database = require('../services/database.js');
 
const baseQuery = 
    `SELECT 
        id_tema,
        nombre, 
        titulo, 
        contenido, 
        fecha, 
        habilitado 
    FROM 
        Usuario u, 
        Tema t 
    WHERE 
        u.id_usuario=t.id_usuario`
;

async function find(context) {
    let query = baseQuery;
    const binds = {};
    
    if (context.id) {
        binds.id_tema = context.id;
    
        query += `\nAND id_tema = :id_tema`;
    }
    query+=`\nORDER BY id_tema DESC`;
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;

}module.exports.find = find;

const createSQL =
    `INSERT INTO Tema(
        id_usuario, 
        titulo, 
        contenido, 
        fecha, 
        habilitado
    ) VALUES (
        :ID_USUARIO,
        :TITULO,
        :CONTENIDO,
        SYSDATE,
        :HABILITADO
    )`
;

async function create(emp) {
    const tema = Object.assign({}, emp);
    //console.log(emp);
    console.log(tema);
    const result = await database.simpleExecute(createSQL, tema);
    
    return tema;

}module.exports.create = create;