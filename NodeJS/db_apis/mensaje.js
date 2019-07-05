const database = require('../services/database.js');
 
const baseQuery = 
    `SELECT 
        m.id_usuario, 
        u.nombre, 
        u.nombre, 
        m.fecha, 
        m.texto 
    FROM 
        Mensaje m, 
        Usuario u 
    WHERE 
        m.id_usuario=u.id_usuario`
;

async function find(context) {
    let query = baseQuery;
    const binds = {};
    
    if (context.id) {
        binds.id_chat = context.id;
    
        query += `\nAND m.id_chat=:id_chat`;
    }
    query+=`\nORDER BY id_mensaje ASC`;
    const result = await database.simpleExecute(query, binds);
    return result.rows;

}module.exports.find = find;

const createSQL =
    `INSERT INTO Mensaje(
        id_chat, 
        id_usuario, 
        fecha, 
        texto
    ) VALUES (
        :ID_CHAT,
        :ID_USUARIO,
        SYSDATE,
        :TEXTO
    )`
;

async function create(emp) {
    const men = Object.assign({}, emp);
    //console.log(emp);
    console.log(men);
    const result = await database.simpleExecute(createSQL, men);
    
    return men;

}module.exports.create = create;