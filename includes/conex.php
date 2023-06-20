<?php 
function Conectar() 
{ 
global $link;
   $cn_oper =   "localhost"; # Ip del Servidor  
   $user_oper = "root";        # Usuario de la Base de Datos
   $pwd_oper =  "";        # Password del usuario de la Base de datos
   $bd="desis_votacion"; 
   if (!($link= mysqli_connect($cn_oper, $user_oper, $pwd_oper,$bd))) 
   { 
      echo "Error conectando a la base de datos."; 
      exit(); 
   } 
    //mysqli_set_charset('utf8', $link);
   return $link; 
} 
?>