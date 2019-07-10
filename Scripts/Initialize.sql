DROP TABLE Sol_examen;
DROP TABLE Respuesta;
DROP TABLE Pregunta;
DROP TABLE Examen;
DROP TABLE Mensaje;
DROP TABLE Chat;
DROP TABLE Tema_Ciencia;
DROP TABLE Comentario;
DROP TABLE Tema;
DROP TABLE Asignacion;
DROP TABLE Ciencia;
DROP TABLE Carrera;
DROP TABLE Facultad;
DROP TABLE Usuario;
DROP TABLE Rol;
DROP SEQUENCE rol_seq;
DROP SEQUENCE fac_seq;
DROP SEQUENCE car_seq;
DROP SEQUENCE cie_seq;
DROP SEQUENCE tem_seq;
DROP SEQUENCE com_seq;
DROP SEQUENCE chat_seq;
DROP SEQUENCE men_seq;
DROP SEQUENCE exa_seq;
DROP SEQUENCE pre_seq;
DROP SEQUENCE res_seq;

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
CREATE TABLE Tema_Ciencia(
    id_tema INT,
    id_ciencia INT,
    PRIMARY KEY(id_tema, id_ciencia),
    FOREIGN KEY(id_tema) REFERENCES Tema(id_tema),
    FOREIGN KEY(id_ciencia) REFERENCES Ciencia(id_ciencia)
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

CREATE SEQUENCE rol_seq;
CREATE SEQUENCE fac_seq;
CREATE SEQUENCE car_seq;
CREATE SEQUENCE cie_seq;
CREATE SEQUENCE tem_seq;
CREATE SEQUENCE com_seq;
CREATE SEQUENCE chat_seq;
CREATE SEQUENCE men_seq;
CREATE SEQUENCE exa_seq;
CREATE SEQUENCE pre_seq;
CREATE SEQUENCE res_seq;


INSERT INTO Rol(nombre, descripcion) VALUES ('admin','admin');
INSERT INTO Rol(nombre, descripcion) VALUES ('estudiante','estudiante');
INSERT INTO Rol(nombre, descripcion) VALUES ('catedratico','catedratico');
INSERT INTO Rol(nombre, descripcion) VALUES ('auxiliar','ayudante del catedratico');


INSERT INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (1,1,'admin','1234');
INSERT INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (201612272,2,'Andres Carvajal','111');
INSERT INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (201602975,2,'Ruth Lechuga','111');
INSERT INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (333,3,'Oscar Paz','222');
INSERT INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (423,3,'Adonai Navas','222');
INSERT INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (713,3,'Becilia Pacheco','222');
INSERT INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (4231,4,'Juan de Dios Molina','333');
INSERT INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (4152,4,'Rolando Pineda','333');


INSERT INTO Facultad(nombre) VALUES ('Ingenieria');
INSERT INTO Facultad(nombre) VALUES ('Arquitectura');
INSERT INTO Facultad(nombre) VALUES ('Derecho');
INSERT INTO Facultad(nombre) VALUES ('Medicina');

INSERT INTO Carrera(id_facultad, nombre) VALUES (1,'Ciencias y sistemas');
INSERT INTO Carrera(id_facultad, nombre) VALUES (1,'Civil');
INSERT INTO Carrera(id_facultad, nombre) VALUES (1,'Industrial');
INSERT INTO Carrera(id_facultad, nombre) VALUES (2,'construccion');
INSERT INTO Carrera(id_facultad, nombre) VALUES (2,'diseño');
INSERT INTO Carrera(id_facultad, nombre) VALUES (3,'juridico');
INSERT INTO Carrera(id_facultad, nombre) VALUES (3,'penal');
INSERT INTO Carrera(id_facultad, nombre) VALUES (3,'juez');
INSERT INTO Carrera(id_facultad, nombre) VALUES (4,'medicina');

INSERT INTO Asignacion(id_usuario, id_carrera) VALUES (201612272,1);
INSERT INTO Asignacion(id_usuario, id_carrera) VALUES (201612272,5);
INSERT INTO Asignacion(id_usuario, id_carrera) VALUES (201602975,1);

INSERT INTO Tema(id_usuario, titulo, contenido, fecha,habilitado) VALUES (1,'BIENVENIDO','Usted esta usando un sistema para contenidos educativos que lo disfrute :3',TRUNC(SYSDATE),'Y');
INSERT INTO Tema(id_usuario, titulo, contenido, fecha,habilitado) VALUES (201612272,'Que hago?','qui uvas',TRUNC(SYSDATE),'Y');

INSERT INTO Comentario(id_tema, id_usuario,texto) VALUES (1,201612272,'Usted chinge su madre >:D');
INSERT INTO Comentario(id_tema, id_usuario,texto) VALUES (1,1,'Que abusivo! >:(');

INSERT INTO Chat(id_usuario1, id_usuario2, habilitado) VALUES (1, 201612272, 'Y');
INSERT INTO Chat(id_usuario1, id_usuario2, habilitado) VALUES (1, 201602975, 'Y');
INSERT INTO Chat(id_usuario1, id_usuario2, habilitado) VALUES (201612272, 201602975, 'Y');

INSERT INTO Mensaje(id_chat, id_usuario, fecha, texto) VALUES (1,1,SYSDATE,'Bienvenido a la sala de chat :3');
INSERT INTO Mensaje(id_chat, id_usuario, fecha, texto) VALUES (1,201612272,SYSDATE,'Jodase perro >:D');
INSERT INTO Mensaje(id_chat, id_usuario, fecha, texto) VALUES (2,201602975,SYSDATE,'Hola andy');
INSERT INTO Mensaje(id_chat, id_usuario, fecha, texto) VALUES (2,201612272,SYSDATE,'Hola ruth qué tal?');
INSERT INTO Mensaje(id_chat, id_usuario, fecha, texto) VALUES (2,201612272,SYSDATE,'Hiciste la tarea de archivos?');
INSERT INTO Mensaje(id_chat, id_usuario, fecha, texto) VALUES (3,1,SYSDATE,'Bienvenido a la sala de chat :3');

INSERT INTO Examen(id_usuario, nombre, fecha) VALUES (333,'Prueba',SYSDATE);
INSERT INTO Pregunta(id_examen, tipo, texto) VALUES (1,'T','Iniciales del fundador de los scouts:');
INSERT INTO Respuesta(id_pregunta, correcta, texto) VALUES (1,'Y','BP');
INSERT INTO Pregunta(id_examen, tipo, texto) VALUES (1,'O','Marca la A');
INSERT INTO Respuesta(id_pregunta, correcta, texto) VALUES (2,'Y','A');
INSERT INTO Respuesta(id_pregunta, correcta, texto) VALUES (2,'N','B');
INSERT INTO Respuesta(id_pregunta, correcta, texto) VALUES (2,'N','C');
INSERT INTO Respuesta(id_pregunta, correcta, texto) VALUES (2,'N','D');
INSERT INTO Pregunta(id_examen, tipo, texto) VALUES (1,'V','Eres Humano?');
INSERT INTO Respuesta(id_pregunta, correcta, texto) VALUES (3,'Y','V');
INSERT INTO Respuesta(id_pregunta, correcta, texto) VALUES (3,'N','F');
COMMIT;

/*
CREATE OR REPLACE TRIGGER Rol_TRG
BEFORE INSERT ON Rol 
FOR EACH ROW
WHEN (new.id_rol IS NULL)
BEGIN
  SELECT rol_seq.NEXTVAL
  INTO   :new.id_rol
  FROM   dual;
END;

CREATE OR REPLACE TRIGGER Fac_TRG
BEFORE INSERT ON Facultad
FOR EACH ROW
WHEN (new.id_facultad IS NULL)
BEGIN
  SELECT fac_seq.NEXTVAL
  INTO   :new.id_facultad
  FROM   dual;
END;

CREATE OR REPLACE TRIGGER Car_TRG
BEFORE INSERT ON Carrera 
FOR EACH ROW
WHEN (new.id_carrera IS NULL)
BEGIN
  SELECT car_seq.NEXTVAL
  INTO   :new.id_carrera
  FROM   dual;
END;

CREATE OR REPLACE TRIGGER Cie_TRG
BEFORE INSERT ON Ciencia 
FOR EACH ROW
WHEN (new.id_ciencia IS NULL)
BEGIN
  SELECT cie_seq.NEXTVAL
  INTO   :new.id_ciencia
  FROM   dual;
END;

CREATE OR REPLACE TRIGGER Tem_TRG
BEFORE INSERT ON Tema
FOR EACH ROW
WHEN (new.id_tema IS NULL)
BEGIN
  SELECT tem_seq.NEXTVAL
  INTO   :new.id_tema
  FROM   dual;
END;

CREATE OR REPLACE TRIGGER Com_TRG
BEFORE INSERT ON Comentario
FOR EACH ROW
WHEN (new.id_comentario IS NULL)
BEGIN
  SELECT com_seq.NEXTVAL
  INTO   :new.id_comentario
  FROM   dual;
END;

CREATE OR REPLACE TRIGGER Chat_TRG
BEFORE INSERT ON Chat
FOR EACH ROW
WHEN (new.id_chat IS NULL)
BEGIN
  SELECT chat_seq.NEXTVAL
  INTO   :new.id_chat
  FROM   dual;
END;

CREATE OR REPLACE TRIGGER men_TRG
BEFORE INSERT ON Mensaje
FOR EACH ROW
WHEN (new.id_mensaje IS NULL)
BEGIN
  SELECT men_seq.NEXTVAL
  INTO   :new.id_mensaje
  FROM   dual;
END;

CREATE OR REPLACE TRIGGER exa_TRG
BEFORE INSERT ON Examen
FOR EACH ROW
WHEN (new.id_examen IS NULL)
BEGIN
  SELECT exa_seq.NEXTVAL
  INTO   :new.id_examen
  FROM   dual;
END;

CREATE OR REPLACE TRIGGER pre_TRG
BEFORE INSERT ON Pregunta
FOR EACH ROW
WHEN (new.id_pregunta IS NULL)
BEGIN
  SELECT pre_seq.NEXTVAL
  INTO   :new.id_pregunta
  FROM   dual;
END;

CREATE OR REPLACE TRIGGER res_TRG
BEFORE INSERT ON Respuesta
FOR EACH ROW
WHEN (new.id_respuesta IS NULL)
BEGIN
  SELECT res_seq.NEXTVAL
  INTO   :new.id_respuesta
  FROM   dual;
END;
*/