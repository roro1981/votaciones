<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb18030">
    <title>FORMULARIO DE VOTACIÓN</title>
    <!--css-->
    <link rel="stylesheet" href="css/index.css">
	  <!-- jQuery 2.1.4 -->
    <script src="js/jQuery-2.1.4.min.js"></script>
    <!-- JS -->
    <script src="js/index.js"></script>
  </head>
<body>
  <h3 style="margin-left:15px;">FORMULARIO DE VOTACIÓN</h3>
  <div class="error" style="display:none">
    <p id="det_error"></p>
  </div>
  <form>
    <div class="form-row">
      <label>Nombre y Apellido:</label>
      <input type="text" id="nombre" autocomplete="off" autofocus>
    </div>

    <div class="form-row">
      <label>Alias:</label>
      <input type="text" id="alias" autocomplete="off">
    </div>

    <div class="form-row">
      <label>RUT:</label>
      <input type="text" id="rut" autocomplete="off">  (Sin puntos y con guión, ejemplo 12345789-0)
    </div>

    <div class="form-row">
      <label>Email:</label>
      <input type="text" id="corr_elec" autocomplete="off">
    </div>
    <div class="form-row">
      <label>Región:</label>
      <select id="region" onchange="traeComunas(this.value);">
      </select>
    </div>

    <div class="form-row">
      <label>Comuna:</label>
      <select id="comuna">
      </select>
    </div>

    <div class="form-row">
      <label>Candidato:</label>
      <select id="candidato">
      </select>
    </div>

    <div class="form-row">
      <label>¿Cómo se enteró de nosotros?</label>
      <input class="chk" type="checkbox" name="entero" value="web">
      <span>Web</span>

      <input class="chk" type="checkbox" name="entero" value="tv">
      <span>TV</span>

      <input class="chk" type="checkbox" name="entero" value="redes">
      <span>Redes sociales</span>

      <input class="chk" type="checkbox" name="entero" value="amigo">
      <span>Amigo</span>
    </div>
    <br>
    <div class="exito" style="display:none">
      <p id="det_exito"></p>
    </div>
    <button id="generar_votacion" type="button">Votar</button>
  </form>
</body>
</html>
