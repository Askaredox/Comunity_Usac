const database = require('../services/database.js');
 
const baseQuery = 
    `SELECT 
        id_usuario,  
        nombre, 
        contrasena, 
        id_rol, 
        path_img
    FROM Usuario`
;

async function find(context) {
    let query = baseQuery;
    const binds = {};
    
    if (context.id) {
        binds.id_usuario = context.id;
    
        query += `\nWHERE id_usuario = :id_usuario`;
    }
    
    const result = await database.simpleExecute(query, binds);
    
    return result.rows;

}module.exports.find = find;

const createSQL =
    `INSERT INTO Usuario(
        id_usuario,
        id_rol,
        nombre,
        contrasena,
        path_img
    ) VALUES(
        :ID_USUARIO,
        :ID_ROL,
        :NOMBRE,
        :CONTRASENA,
        :PATH_IMG
    )`
;

async function create(emp) {
    const usuario = Object.assign({}, emp);
    //console.log(emp);
    console.log(usuario);
    const result = await database.simpleExecute(createSQL, usuario);
    
    return usuario;

}module.exports.create = create;