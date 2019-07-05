const database = require('../services/database.js');
 
const baseQuery = 
    `SELECT 
        u.nombre, 
        r.texto 
    FROM 
        Usuario u, 
        Tema t, 
        Respuesta r 
    WHERE 
        u.id_usuario = r.id_usuario 
    AND 
        r.id_tema = t.id_tema`
;

async function find(context) {
    let query = baseQuery;
    const binds = {};
    
    if (context.id) {
        binds.id_tema = context.id;
    
        query += `\nAND r.id_tema = :id_tema`;
    }
    query+=`\nORDER BY id_respuesta ASC`;
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;

}module.exports.find = find;

const createSQL =
    `INSERT INTO Respuesta(
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