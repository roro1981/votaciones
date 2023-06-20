<?php
include 'includes/conex.php';
$link=conectar(); 

$opt = 0; if (isset($_POST['opt'])){ $opt=$_POST['opt']; }
        switch ($opt) {
            
			case 'trae_regiones':
				$opciones="";
				$opciones="<option value=0>--Seleccione--</option>";
				$sql = mysqli_query($link, "SELECT * FROM regiones order by orden") or die(mysqli_error($link));
                    while ($row = mysqli_fetch_array($sql)){
					$opciones.="<option value='".$row['id']."'>".utf8_encode($row['nombre'])."</option>";
				}	
				
				echo $opciones;
            break;
			case 'trae_candidatos':
				$opciones="";
				$opciones="<option value=0>--Seleccione--</option>";
				$sql = mysqli_query($link, "SELECT * FROM candidatos where estado=1 order by nombre_candidato") or die(mysqli_error($link));
                    while ($row = mysqli_fetch_array($sql)){
					$opciones.="<option value='".$row['id']."'>".utf8_encode($row['nombre_candidato'])."</option>";
				}	
				
				echo $opciones;
            break;
			
			case 'trae_comunas_segun_region':
				if (isset($_POST['idRegion'])){
					$opciones="";
					$opciones="<option value=0>--Seleccione--</option>";
					$sql = mysqli_query($link, "SELECT * FROM comuna where id_region=".$_POST['idRegion']." order by nombre") or die(mysqli_error($link));
						while ($row = mysqli_fetch_array($sql)){
						$opciones.="<option value='".$row['id']."'>".utf8_encode($row['nombre'])."</option>";
					}	
					
					echo $opciones;
				}
            break;
			
			case 'grabar_votacion':
				$nombre=$_POST['nombre'];
				$alias=$_POST['alias'];
				$separa_rut=explode("-",$_POST['rut']); //separamos el rut del dv
				$email=$_POST['correo'];
				$region=$_POST['region'];
				$comuna=$_POST['comuna'];
				$candidato=$_POST['candidato'];	

				// Obtener los valores del array de recomendaciones
				$recomendaciones = $_POST['recomendaciones'];

				// Convertimos el array en una cadena separada por comas
				$valoresRecomendacionesString = implode(',', $recomendaciones);

				//verificamos que el rut no haya votado anteriormente
				$sql_v = mysqli_query($link, 
				"SELECT * FROM registro_votacion where rut=".$separa_rut[0]." and dv='".$separa_rut[1]."'") 
				or die(mysqli_error($link));
				$cant=mysqli_num_rows($sql_v);
				if($cant>0){ //si ya votó enviamos la respuesta al frontend
					echo "NOK";
				}else{
					try{
						$grabar = mysqli_query($link, 
						"INSERT INTO `registro_votacion`(`rut`,`dv`,`alias`,`email`,`region`,`comuna`,`candidato`,`recomendaciones`) 
						VALUES (".$separa_rut[0].",'".$separa_rut[1]."','".$alias."','".$email."',".$region.",".$comuna.",".$candidato.",
								'".$valoresRecomendacionesString."')") or die(mysqli_error($link));
						echo $grabar;	
					}catch (Exception $e) {
						// En caso de excepción, realizar un rollback para deshacer los cambios
						mysqli_rollback($link);
						echo 'Error al grabar voto: ' . $e->getMessage();
					}
				}	
			break;
			
			
        }
?>


    

   
        
    


