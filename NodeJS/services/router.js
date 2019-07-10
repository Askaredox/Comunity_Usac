const express = require('express');
const router = new express.Router();
const cors = require('cors');
/*********************** get / posts ***********************/
const usuario = require('../controllers/usuario.js');
const rol = require('../controllers/rol.js');
const facultad = require('../controllers/facultad.js');
const carrera = require('../controllers/carrera.js');
const ciencia = require('../controllers/ciencia.js');
const carfacs = require('../controllers/carfac.js');
const asignar = require('../controllers/asignar.js');
const tema = require('../controllers/tema.js');
const comentario = require('../controllers/comentario.js');
const tema_ciencia = require('../controllers/tema_ciencia.js');
const chat = require('../controllers/chat.js');
const mensaje = require('../controllers/mensaje.js');
const estadistica = require('../controllers/estadistica.js');
const examen = require('../controllers/examen.js');
const nota = require('../controllers/nota.js');
const FCC = require('../controllers/FCC.js');
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

router.options('/ciencia',cors()); 
router.route('/ciencia/:id?')
    .get(ciencia.get)
    .post(ciencia.post);

router.route('/carfacs/:id?')
    .get(carfacs.get);

router.options('/asignar',cors()); 
router.route('/asignar')
    .post(asignar.post);

router.options('/tema',cors()); 
router.route('/tema/:id?')
    .get(tema.get)
    .post(tema.post);

router.options('/comentario',cors()); 
router.route('/comentario/:id?')
    .get(comentario.get)
    .post(comentario.post);

router.options('/chat',cors()); 
router.route('/chat/:id?')
    .get(chat.get)
    .post(chat.post);

router.options('/mensajes',cors()); 
router.route('/mensajes/:id?')
    .get(mensaje.get)
    .post(mensaje.post);

router.route('/estadistica/:id?')
    .get(estadistica.get);

router.options('/examen(/:tipo)?',cors()); 
router.route('/examen/(:tipo)?(&:id)?')
    .get(examen.get)
    .post(examen.post);

router.options('/exam',cors()); 
router.route('/exam/:nombre?')
    .get(examen.gete)
    .post(examen.poste);

router.options('/nota',cors()); 
router.route('/nota/(:tipo)?(&:id)?')
    .get(nota.get)

router.route('/exame/:id?')
    .get(examen.gets);

router.options('/temcie',cors()); 
router.route('/temcie/:id?')
    .get(tema_ciencia.get)
    .post(tema_ciencia.post);

router.route('/FCC/(:tipo)?(&:id)?')
    .get(FCC.get);
module.exports = router;