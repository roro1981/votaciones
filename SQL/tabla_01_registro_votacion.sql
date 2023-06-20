CREATE TABLE `registro_votacion` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `rut` double NOT NULL,
  `dv` char(1) COLLATE utf8_spanish2_ci NOT NULL,
  `alias` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `region` int(11) NOT NULL,
  `comuna` int(11) NOT NULL,
  `candidato` int(11) NOT NULL,
  `recomendaciones` varchar(1000) COLLATE utf8_spanish2_ci NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);