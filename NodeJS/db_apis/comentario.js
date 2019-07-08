const database = require('../services/database.js');
 
const baseQuery = 
    `SELECT 
        u.nombre, 
        c.texto 
    FROM 
        Usuario u, 
        Tema t, 
        Comentario c 
    WHERE 
        u.id_usuario = c.id_usuario 
    AND 
        c.id_tema = t.id_tema`
;

async function find(context) {
    let query = baseQuery;
    const binds = {};
    
    if (context.id) {
        binds.id_tema = context.id;
        query += `\nAND c.id_tema = :id_tema`;
    }
    query+=`\nORDER BY id_comentario ASC`;
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;

}module.exports.find = find;

const createSQL =
    `INSERT INTO Comentario(
        id_tema, 
        id_usuario, 
        texto
    ) VALUES (
        :ID_TEMA,
        :ID_USUARIO,
        :TEXTO
    )`
;

async function create(emp) {
    const resp = Object.assign({}, emp);
    //console.log(emp);
    console.log(resp);
    const result = await database.simpleExecute(createSQL, resp);
    
    return resp;

}module.exports.create = create;