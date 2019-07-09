CREATE TABLE Rol(
    id_rol INT PRIMARY KEY,
    nombre VARCHAR(32) NOT NULL,
    descripcion VARCHAR(255)
);
CREATE TABLE Usuario(
    id_usuario INT PRIMARY KEY,
    id_rol INT NOT NULL REFERENCES Rol (id_rol),
    nombre VARCHAR(32) NOT NULL,
    contrasena VARCHAR(16) NOT NULL,
    path_img VARCHAR(255)
);
CREATE TABLE Facultad(
    id_facultad INT PRIMARY KEY,
    nombre VARCHAR(32) NOT NULL,
    descripcion VARCHAR(255)
);
CREATE TABLE Carrera(
    id_carrera INT PRIMARY KEY,
    id_facultad INT,
    nombre VARCHAR(32) NOT NULL,
    FOREIGN KEY(id_facultad) REFERENCES Facultad (id_facultad)
);
CREATE TABLE Ciencia(
    id_ciencia INT PRIMARY KEY,
    id_carrera INT REFERENCES Carrera(id_carrera),
    nombre VARCHAR(64) NOT NULL
);
CREATE TABLE Asignacion(
    id_usuario INT,
    id_carrera INT,
    PRIMARY KEY(id_usuario, id_carrera),
    FOREIGN KEY(id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY(id_carrera) REFERENCES Carrera(id_carrera)
);
CREATE TABLE Tema(
    id_tema INT PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES Usuario(id_usuario),
    titulo VARCHAR(255) NOT NULL,
    contenido VARCHAR(1023) NOT NULL,
    fecha DATE NOT NULL,
    habilitado VARCHAR(1) NOT NULL
);
CREATE TABLE Comentario(
    id_comentario INT PRIMARY KEY,
    id_tema INT NOT NULL REFERENCES Tema(id_tema),
    id_usuario INT NOT NULL REFERENCES Usuario(id_usuario),
    texto VARCHAR(255) NOT NULL 
);
CREATE TABLE Chat(
    id_chat INT PRIMARY KEY,
    id_usuario1 INT NOT NULL REFERENCES Usuario(id_usuario),
    id_usuario2 INT NOT NULL REFERENCES Usuario(id_usuario),
    habilitado VARCHAR(1) NOT NULL
);
CREATE TABLE Mensaje(
    id_mensaje INT PRIMARY KEY,
    id_chat INT NOT NULL REFERENCES Chat(id_chat),
    id_usuario INT NOT NULL REFERENCES Usuario(id_usuario),
    fecha DATE NOT NULL,
    texto VARCHAR(255) NOT NULL
);
CREATE TABLE Examen(
    id_examen INT PRIMARY KEY,
    id_usuario INT REFERENCES Usuario(id_usuario),
    nombre VARCHAR(32) UNIQUE NOT NULL,
    fecha DATE NOT NULL,
    tiempo INT NOT NULL--AGREGADO 
);
CREATE TABLE Pregunta(
    id_pregunta INT PRIMARY KEY,
    id_examen INT REFERENCES Examen(id_examen),
    tipo VARCHAR(1) NOT NULL,
    texto VARCHAR(255) NOT NULL
);
CREATE TABLE Respuesta(
    id_respuesta INT PRIMARY KEY,
    id_pregunta INT REFERENCES Pregunta(id_pregunta),
    correcta VARCHAR(1) NOT NULL,
    texto VARCHAR(255)
);
CREATE TABLE Sol_examen(
    id_usuario INT,
    id_examen INT,
    fecha DATE NOT NULL,
    nota INT NOT NULL,
    PRIMARY KEY(id_usuario, id_examen),
    FOREIGN KEY(id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY(id_examen) REFERENCES Examen(id_examen)
);

/*SELECTS DE APOYO*/
DROP TABLE Comentario;
DROP TABLE Tema;
DROP TABLE Asignacion;
DROP TABLE Carrera;
DROP TABLE Facultad;
DROP TABLE Usuario;
DROP TABLE Rol;
DROP SEQUENCE rol_seq;
DROP SEQUENCE fac_seq;
DROP SEQUENCE car_seq;
/****************************************************************************************************************************/

SELECT * FROM Rol;--TODO DE ROL
SELECT * FROM Usuario;--TODO DE USUARIO
SELECT * FROM Facultad;--TODO DE USUARIO
SELECT * FROM Carrera;--TODO DE USUARIO
SELECT * FROM Asignacion;--TODO DE USUARIO
SELECT * FROM Tema;--TODO DE USUARIO
SELECT * FROM Comentario;--TODO DE USUARIO


/****************************************************************************************************************************/
--ADMINISTRACION ROL
SELECT id_rol, nombre, descripcion FROM Rol;
INSERT INTO Rol(nombre, descripcion) VALUES (:NOMBRE, :DESCRIPCION);

--ADMINISTRACION DE USUARIO
SELECT id_usuario, nombre, contrasena, id_rol, path_img FROM Usuario;
INSERT INTO Usuario(id_usuario, id_rol, nombre, contrasena, path_img) VALUES(:ID_USUARIO, :ID_ROL, :NOMBRE, :CONTRASENA, :PATH_IMG);

--ADMINISTRACION DE FACULTAD
SELECT id_facultad, nombre, descripcion FROM Facultad;
INSERT INTO Facultad(nombre, descripcion) VALUES (:NOMBRE, :DESCRIPCION);

--ADMINISTRACION DE CARRERA
SELECT id_carrera, id_facultad, nombre FROM Carrera;
INSERT INTO Carrera(id_facultad, nombre) VALUES(:ID_FACULTAD, :NOMBRE);

--OBTENER FACULTAD Y CARRERA
SELECT c.nombre AS "CARRERA", f.nombre AS "FACULTAD" FROM Facultad f, Carrera c WHERE f.id_facultad=c.id_facultad;

--ASIGNACION DE USUARIO A CARRERA
INSERT INTO Asignacion(id_usuario, id_carrera) VALUES (:ID_USUARIO,:ID_CARRERA);
SELECT u.id_usuario, u.nombre AS "USUARIO", c.nombre AS "CARRERA" 
FROM Usuario u, Carrera c, Asignacion a 
WHERE a.id_usuario = u.id_usuario
AND a.id_carrera = c.id_carrera
ORDER BY u.id_usuario ASC;


--ADMINISTRACION DE TEMAS
INSERT INTO Tema(id_usuario, titulo, contenido, fecha, habilitado) VALUES (:ID_USUARIO,:TITULO,:CONTENIDO,:FECHA,:HABILITADO);
SELECT id_tema, nombre, titulo, contenido, fecha, habilitado FROM Usuario u , Tema t WHERE u.id_usuario=t.id_usuario ORDER BY id_tema DESC;

--ADMINISTRACION DE COMENTARIOS
SELECT nombre, texto FROM Usuario u, Tema t, Comentario c WHERE u.id_usuario = c.id_usuario AND c.id_tema=t.id_tema AND c.id_tema=1;
INSERT INTO Comentario(id_tema, id_usuario, texto) VALUES (:ID_TEMA,:ID_USUARIO,:TEXTO);

--ADMINISTRACION DE SALAS DE CHAT
SELECT c.id_chat, u.id_usuario, u.nombre FROM 
((SELECT id_chat, id_usuario1 as id_usuario FROM Chat WHERE id_usuario1=201612272 OR id_usuario2=201612272)
union
(SELECT id_chat, id_usuario2 as id_usuario FROM Chat WHERE id_usuario1=201612272 OR id_usuario2=201612272)) c,
Usuario u
WHERE c.id_usuario=u.id_usuario
AND c.id_usuario!=201612272;
INSERT INTO Chat(id_usuario1, id_usuario2, habilitado) VALUES (:ID_USUARIO1, :ID_USUARIO2,:HABILITADO);

--ADMINISTRACION DE MENSAJES POR SALA DE CHAT
SELECT m.id_usuario, u.nombre, u.nombre, m.fecha, m.texto FROM Mensaje m, Usuario u WHERE m.id_usuario=u.id_usuario AND m.id_chat=2 ORDER BY id_mensaje ASC;
INSERT INTO Mensaje(id_chat, id_usuario, fecha, texto) VALUES (:ID_CHAT,:ID_USUARIO,SYSDATE,:TEXTO);

--ESTADISTICAS
    --TOP COMENTARIOS CATEDRATICOS-ESTUDIANTES
SELECT u.id_usuario, u.nombre, resp  FROM(
    SELECT * FROM(
        SELECT u.id_usuario, COUNT(u.id_usuario)as resp FROM Comentario c, Usuario u WHERE c.id_usuario = u.id_usuario AND u.id_rol=3 GROUP BY u.id_usuario
    )
    ORDER BY resp DESC
    ) q, Usuario u
WHERE ROWNUM <=3
AND u.id_usuario=q.id_usuario;
    
    --TOP TEMAS CATEDRATICOS-ESTUDIANTES
SELECT u.id_usuario, u.nombre, tema  FROM(
    SELECT * FROM(
        SELECT u.id_usuario,COUNT(u.id_usuario) as tema FROM Tema t, Usuario u WHERE t.id_usuario=u.id_usuario AND u.id_rol=2 GROUP BY u.id_usuario
    )
    ORDER BY tema DESC
    ) q, Usuario u
WHERE ROWNUM <=5
AND u.id_usuario=q.id_usuario;

--ADMINISTRACION DE EXAMENES Y NOTAS
INSERT INTO Examen(id_usuario, nombre, fecha) VALUES (:ID_USUARIO,:NOMBRE,SYSDATE) RETURNING id_examen INTO :tmp;
INSERT INTO Pregunta(id_examen, tipo, texto) VALUES (:ID_EXAMEN,:TIPO,:TEXTO) RETURNING id_examen INTO :tmp;
INSERT INTO Respuesta(id_pregunta, correcta, texto) VALUES (:ID_PREGUNTA,:CORRECTA,:TEXTO);
SELECT * FROM Examen WHERE id_usuario=:ID_USUARIO;
SELECT * FROM Pregunta WHERE id_examen=:ID_EXAMEN;
SELECT * FROM Respuesta WHERE id_Pregunta=:ID_PREGUNTA;
SELECT * FROM Examen WHERE nombre=:NOMBRE;

INSERT INTO Sol_examen(id_usuario, id_examen, fecha, nota) VALUES (:ID_USUARIO, :ID_EXAMEN, SYSDATE, :NOTA);
SELECT e.nombre, s.fecha, s.nota FROM Sol_examen s,Examen e,Usuario u WHERE s.id_examen = e.id_examen AND s.id_usuario=u.id_usuario AND u.id_usuario=201612272;
SELECT u.nombre, u.id_usuario, s.nota, s.fecha FROM Sol_examen s, Usuario u WHERE u.id_usuario = s.id_usuario AND s.id_examen=2;
