const database = require('../services/database.js');
 
const baseQuery = 
    `SELECT 
        c.id_chat, 
        u.id_usuario, 
        u.nombre 
    FROM 
        (
            (
                SELECT 
                    id_chat, 
                    id_usuario1 as id_usuario 
                FROM 
                    Chat 
                WHERE 
                    id_usuario1 = :ID 
                OR 
                    id_usuario2 = :ID
            )
            union
            (
                SELECT 
                    id_chat, 
                    id_usuario2 as id_usuario 
                FROM 
                    Chat 
                WHERE 
                    id_usuario1 = :ID 
                OR 
                    id_usuario2 = :ID
            )
        ) c,
        Usuario u
    WHERE 
        c.id_usuario = u.id_usuario
    AND 
        c.id_usuario != :ID`
;

async function find(context) {
    let query = baseQuery;
    const binds = {};
    
    if (context.id) {
        binds.ID = context.id;
    }
    const result = await database.simpleExecute(query, binds);
    return result.rows;

}module.exports.find = find;

const createSQL =
    `INSERT INTO Chat(
        id_usuario1, 
        id_usuario2, 
        habilitado
    ) VALUES (
        :ID_USUARIO1, 
        :ID_USUARIO2,
        :HABILITADO
    )`
;

async function create(emp) {
    const chat = Object.assign({}, emp);
    //console.log(emp);
    console.log(chat);
    const result = await database.simpleExecute(createSQL, chat);
    
    return chat;

}module.exports.create = create;