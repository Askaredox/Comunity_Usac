const database = require('../services/database.js');
const topC = 
    `SELECT 
        u.id_usuario, 
        u.nombre, 
        resp  
    FROM 
        (
            SELECT * FROM(
                SELECT 
                    u.id_usuario, 
                    COUNT(u.id_usuario)as resp 
                FROM 
                    Comentario c, 
                    Usuario u 
                WHERE 
                    c.id_usuario = u.id_usuario 
                AND 
                    u.id_rol=3 
                GROUP BY 
                    u.id_usuario
            )
            ORDER BY resp DESC
        ) q, 
        Usuario u
    WHERE 
        ROWNUM <= 3
    AND 
        u.id_usuario = q.id_usuario`
;
const topE = 
    `SELECT 
        u.id_usuario, 
        u.nombre, 
        resp  
    FROM 
        (
            SELECT * FROM(
                SELECT 
                    u.id_usuario, 
                    COUNT(u.id_usuario)as resp 
                FROM 
                    comentario c, 
                    Usuario u 
                WHERE 
                    c.id_usuario = u.id_usuario 
                AND 
                    u.id_rol=2 
                GROUP BY 
                    u.id_usuario
            )
            ORDER BY resp DESC
        ) q, 
        Usuario u
    WHERE 
        ROWNUM <= 10
    AND 
        u.id_usuario = q.id_usuario`
;
const topET = 
    `SELECT 
        u.id_usuario, 
        u.nombre, 
        tema  
    FROM 
        (
            SELECT * FROM(
                SELECT 
                    u.id_usuario, 
                    COUNT(u.id_usuario) as tema 
                FROM 
                    Tema t, 
                    Usuario u 
                WHERE 
                    t.id_usuario = u.id_usuario 
                AND 
                    u.id_rol = 2 
                GROUP BY 
                    u.id_usuario
            )
            ORDER BY tema DESC
        ) q, 
        Usuario u
    WHERE 
        ROWNUM <= 5
    AND 
        u.id_usuario = q.id_usuario`
;
const topCT = 
    `SELECT 
        u.id_usuario, 
        u.nombre, 
        tema  
    FROM 
        (
            SELECT * FROM(
                SELECT 
                    u.id_usuario, 
                    COUNT(u.id_usuario) as tema 
                FROM 
                    Tema t, 
                    Usuario u 
                WHERE 
                    t.id_usuario = u.id_usuario 
                AND 
                    u.id_rol = 3 
                GROUP BY 
                    u.id_usuario
            )
            ORDER BY tema DESC
        ) q, 
        Usuario u
    WHERE 
        ROWNUM <= 5
    AND 
        u.id_usuario = q.id_usuario`
;
async function find(context) {
    let query;

    switch(context.id){
        case 1:
            query = topC;
            break;
        case 2:
            query = topE;
            break;
        case 3:
            query = topCT;
            break;
        case 4:
            query = topET;
            break;
    }
    const binds = {};
    const result = await database.simpleExecute(query, binds);
    return result.rows;

}module.exports.find = find;