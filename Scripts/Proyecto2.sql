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
CREATE TABLE Respuesta(
    id_respuesta INT PRIMARY KEY,
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


/*SELECTS DE APOYO*/
DROP TABLE Respuesta;
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
SELECT * FROM Respuesta;


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

--ADMINISTRACION DE RESPUESTAS
SELECT nombre, texto FROM Usuario u, Tema t, Respuesta r WHERE u.id_usuario = r.id_usuario AND r.id_tema=t.id_tema AND r.id_tema=1;
INSERT INTO Respuesta(id_tema, id_usuario, texto) VALUES (:ID_TEMA,:ID_USUARIO,:TEXTO);

--ADMINISTRACION DE SALAS DE CHAT
SELECT c.id_chat, u.id_usuario, u.nombre FROM 
((SELECT id_chat, id_usuario1 as id_usuario FROM Chat WHERE id_usuario1=201612272 OR id_usuario2=201612272)
union
(SELECT id_chat, id_usuario2 as id_usuario FROM Chat WHERE id_usuario1=201612272 OR id_usuario2=201612272)) c,
Usuario u
WHERE c.id_usuario=u.id_usuario
AND c.id_usuario!=201612272;
INSERT INTO Chat(id_usuario1, id_usuario2, habilitado) VALUES (:ID_USUARIO1, :ID_USUARIO2,:HABILITADO);
