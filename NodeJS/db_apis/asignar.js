const database = require('../services/database.js');

const createSQL =
    `INSERT INTO Asignacion(
        id_usuario, 
        id_carrera
    ) VALUES (
        :ID_USUARIO,
        :ID_CARRERA
    )`;

async function create(emp) {
    const asig = Object.assign({}, emp);
    console.log(asig);

    const result = await database.simpleExecute(createSQL, asig);

    return asig;

}module.exports.create = create;