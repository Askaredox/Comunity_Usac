--TRIGGER PARA AUTOINCREMENT DE ID_ROL
CREATE SEQUENCE rol_seq;
CREATE OR REPLACE TRIGGER Rol_TRG
BEFORE INSERT ON Rol 
FOR EACH ROW
WHEN (new.id_rol IS NULL)
BEGIN
  SELECT rol_seq.NEXTVAL
  INTO   :new.id_rol
  FROM   dual;
END;

--TRIGGER PARA AUTOINCREMENT DE ID_facultad
CREATE SEQUENCE fac_seq;
CREATE OR REPLACE TRIGGER Fac_TRG
BEFORE INSERT ON Facultad
FOR EACH ROW
WHEN (new.id_facultad IS NULL)
BEGIN
  SELECT fac_seq.NEXTVAL
  INTO   :new.id_facultad
  FROM   dual;
END;

--TRIGGER PARA AUTOINCREMENT DE ID_carrera
CREATE SEQUENCE car_seq;
CREATE OR REPLACE TRIGGER Car_TRG
BEFORE INSERT ON Carrera 
FOR EACH ROW
WHEN (new.id_carrera IS NULL)
BEGIN
  SELECT car_seq.NEXTVAL
  INTO   :new.id_carrera
  FROM   dual;
END;



INSERT ALL
    INTO Rol(nombre, descripcion) VALUES ('admin','admin')
    INTO Rol(nombre, descripcion) VALUES ('estudiante','estudiante')
    INTO Rol(nombre, descripcion) VALUES ('catedratico','catedratico')
    INTO Rol(nombre, descripcion) VALUES ('auxiliar','ayudante del catedratico')
SELECT 1 FROM DUAL;--INSERSION MULTIPLE DE ROLES

INSERT ALL
    INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (1,1,'admin','1234')
    INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (201612272,2,'Andres Carvajal','111')
    INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (201602975,2,'Ruth Lechuga','111')
    INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (333,3,'Oscar Paz','222')
    INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (423,3,'Adonai Navas','222')
    INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (713,3,'Becilia Pacheco','222')
    INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (4231,4,'Juan de Dios Molina','333')
    INTO Usuario(id_usuario, id_rol, nombre, contrasena) VALUES (4152,4,'Rolando Pineda','333')
SELECT 1 FROM DUAL;--INSERSION MULTIPLE DE Usuario

INSERT ALL
    INTO Facultad(id_facultad, nombre) VALUES ('Ingenieria')
    INTO Facultad(id_facultad, nombre) VALUES ('Arquitectura')
    INTO Facultad(id_facultad, nombre) VALUES ('Derecho')
    INTO Facultad(id_facultad, nombre) VALUES ('Medicina')
SELECT 1 FROM DUAL;--INSERSION MULTIPLE DE Facultad

INSERT ALL
    INTO Carrera(id_facultad, nombre) VALUES (1,'Ciencias y sistemas')
    INTO Carrera(id_facultad, nombre) VALUES (1,'Civil')
    INTO Carrera(id_facultad, nombre) VALUES (1,'Industrial')
    INTO Carrera(id_facultad, nombre) VALUES (2,'construccion')
    INTO Carrera(id_facultad, nombre) VALUES (2,'diseño')
    INTO Carrera(id_facultad, nombre) VALUES (3,'juridico')
    INTO Carrera(id_facultad, nombre) VALUES (3,'penal')
    INTO Carrera(id_facultad, nombre) VALUES (3,'juez')
    INTO Carrera(id_facultad, nombre) VALUES (4,'medicina')
SELECT 1 FROM DUAL;--INSERSION MULTIPLE DE carrera
