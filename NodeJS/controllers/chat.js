const chats = require('../db_apis/chat.js');
 
function getChatFromRec(req) {
    
    const Chat = {
        ID_USUARIO1: req.body.ID_USUARIO1,
        ID_USUARIO2: req.body.ID_USUARIO2,
        HABILITADO: req.body.HABILITADO
    };
    return Chat;
}

/******************************************************************************************/

async function get(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const context = {};
    
        context.id = parseInt(req.params.id, 10);
    
        const rows = await chats.find(context);
        if (req.params.id) {
            if (rows.length === 1) {
                res.status(200).json(rows[0]);
            } 
            else {
                res.status(200).json(rows);
            }
        } 
        else {
            res.status(200).json(rows);
        }
    } catch (err) {
        next(err);
    }
}module.exports.get = get;

async function post(req, res, next) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        let chat = getChatFromRec(req);
        //console.log(req);
        chat = await chats.create(chat);
        res.status(201).json(chat);
    } catch (err) {
        next(err);
    }
}module.exports.post = post;