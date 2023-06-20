CREATE TABLE candidatos( 
    id INT PRIMARY KEY AUTO_INCREMENT , 
    nombre_candidato VARCHAR(200) NOT NULL , 
    estado INT NOT NULL);

INSERT INTO candidatos (nombre_candidato,estado) VALUES ('Juan Perez',1);
INSERT INTO candidatos (nombre_candidato,estado) VALUES ('Pedro Arancibia',1);
INSERT INTO candidatos (nombre_candidato,estado) VALUES ('Rodrigo Salgado',1);
INSERT INTO candidatos (nombre_candidato,estado) VALUES ('Claudia Alvarado',1);
INSERT INTO candidatos (nombre_candidato,estado) VALUES ('Anita Reyes',1);