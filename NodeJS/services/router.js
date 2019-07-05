const express = require('express');
const router = new express.Router();
const cors = require('cors');
/*********************** get / posts ***********************/
const usuario = require('../controllers/usuario.js');
const rol = require('../controllers/rol.js');
const facultad = require('../controllers/facultad.js');
const carrera = require('../controllers/carrera.js');
const carfacs = require('../controllers/carfac.js');
const asignar = require('../controllers/asignar.js');
const tema = require('../controllers/tema.js');
const respuesta = require('../controllers/respuesta.js');
const chat = require('../controllers/chat.js');
const mensaje = require('../controllers/mensaje.js');
/*********************** get / posts ***********************/


router.options('/usuario',cors()); 
router.route('/usuario/:id?')
    .get(usuario.get)
    .post(usuario.post);

router.options('/rol',cors()); 
router.route('/rol/:id?')
    .get(rol.get)
    .post(rol.post);

router.options('/facultad',cors()); 
router.route('/facultad/:id?')
    .get(facultad.get)
    .post(facultad.post);

router.options('/carrera',cors()); 
router.route('/carrera/:id?')
    .get(carrera.get)
    .post(carrera.post);

router.route('/carfacs/:id?')
    .get(carfacs.get);

router.options('/asignar',cors()); 
router.route('/asignar')
    .post(asignar.post);

router.options('/tema',cors()); 
router.route('/tema/:id?')
    .get(tema.get)
    .post(tema.post);

router.options('/respuesta',cors()); 
router.route('/respuesta/:id?')
    .get(respuesta.get)
    .post(respuesta.post);

router.options('/chat',cors()); 
router.route('/chat/:id?')
    .get(chat.get)
    .post(chat.post);

router.options('/mensajes',cors()); 
router.route('/mensajes/:id?')
    .get(mensaje.get)
    .post(mensaje.post);

module.exports = router;