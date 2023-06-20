var Fn = {
	// Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut : function (rutCompleto) {
		rutCompleto = rutCompleto.replace("‐","-");
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		
		return (Fn.dv(rut) == digv );
	},
	dv : function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}
$( document ).ready(function(e) {
    //cargamos regiones y candidatos al iniciar 
    cargaRegiones(); 
    cargaCandidatos();
});

$(document).on('click','#generar_votacion',function(){

    //validaciones de campos (se usa div #det_error para enviar mensaje de error y el div .error se muestra u oculta)
    if($("#nombre").val()==""){ //validamos que nombre no esté vacío
        $("#det_error").text("El campo nombre y apellido no puede estar vacío");
        $(".error").show();
        return false;
    }else{
        $(".error").hide();
    }
    if(validarAlias($("#alias").val())==false){ //validamos que alias tenga mas de 5 caracteres, letras y numeros
        $("#det_error").text("Alias debe contener al menos 5 caracteres además debe contener letras y números");
        $(".error").show();
        return false;
    }else{
        $(".error").hide();
    }
    if($("#rut").val() != ""){ //validamos que rut no esté vacío
        if(!Fn.validaRut($("#rut").val())){ //validamos que rut tenga fomato correcto
            $("#det_error").text("Rut no válido favor corregir");
            $(".error").show();
            return false;
        }else{
            $(".error").hide();
        }
    }else{
        $("#det_error").text("Campo rut no puede estar vacío favor corregir");
        $(".error").show();
        return false;
    }
    if(validarEmail($("#corr_elec").val())==false){ //validamos email que este en formato correcto
        $("#det_error").text("Email no válido favor corregir");
        $(".error").show();
        return false;
    }else{
        $(".error").hide();
    }

    if($("#region").val()==0){ //validamos que se haya seleccionado región
        $("#det_error").text("El campo region no puede estar vacío");
        $(".error").show();
        return false;
    }else{
        $(".error").hide();
    }

    if($("#comuna").val()==0){ //validamos que se haya seleccionado comuna
        $("#det_error").text("El campo comuna no puede estar vacío");
        $(".error").show();
        return false;
    }else{
        $(".error").hide();
    }

    if($("#candidato").val()==0){ //validamos que se haya seleccionado un candidato
        $("#det_error").text("El campo candidato no puede estar vacío");
        $(".error").show();
        return false;
    }else{
        $(".error").hide();
    }
    var checkboxesSeleccionados = $('.chk:checked'); //validamos que se hayan seleccionado al menos 2 opciones de recomendaciones
    if (checkboxesSeleccionados.length < 2) {
        $("#det_error").text("Debe seleccionar al menos 2 de las 4 opciones disponibles");
        $(".error").show();
        return false;
    } else {
        $(".error").hide();
    }
    //fin validaciones de campos

    //guardamos en un array las recomendaciones seleccionadas
    var valores = [];
    $('input[type="checkbox"]:checked').each(function() {
        valores.push($(this).val());
    });

    //procedemos a enviar parametros por POST al controlador votacion_controller.php para proceder a grabar votación
    $.ajax({
        type	 : "POST",
        url		 : "votacion_controller.php",
        data	 : {
        opt		 : 'grabar_votacion',
        nombre   : $("#nombre").val(),
        alias    : $("#alias").val(),
        rut      : $("#rut").val(),
        correo   : $('#corr_elec').val(),
        region   : $("#region").val(),
        comuna   : $("#comuna").val(),
        candidato: $("#candidato").val(),
        recomendaciones: valores
        },
        success: function(data) {
           var respuesta=$.trim(data);
           if(respuesta=="NOK"){
                $("#det_error").text("Rut ya registra votación");
                $(".error").show();
                $(".exito").hide();
           }else if(respuesta==1){
                $("#det_exito").text("Votación registrada correctamente");
                $(".exito").show();
                $(".error").hide();
                setTimeout(function() {
                    $("#nombre").val("");
                    $("#alias").val("");
                    $("#rut").val("");
                    $("#corr_elec").val("");
                    $("#region").val(0);
                    $("#comuna").val(0);
                    $("#candidato").val(0);
                    $('.chk').prop('checked', false);
                    $(".exito").hide();
                    $("#nombre").focus();
                },5000);    
           }else{
                $("#det_error").text(respuesta);
                $(".error").show();
                $(".exito").hide();
           }
        }
    })
});    

//funcion que trae regiones desde controlador
function cargaRegiones(){
   $.ajax({
        type	: "POST",
        url		: "votacion_controller.php",
        data	: {
        opt		: 'trae_regiones',
        },
        success: function(data) {
            $("#region").html(data);
        }
    })
}  

//funcion que trae candidatos desde controlador
function cargaCandidatos(){
    $.ajax({
         type	: "POST",
         url		: "votacion_controller.php",
         data	: {
         opt		: 'trae_candidatos',
         },
         success: function(data) {
             $("#candidato").html(data);
         }
     })
 } 

 //funcion que trae comunas desde controlador según región seleccionada
 function traeComunas(id_region){
    $.ajax({
         type	: "POST",
         url		: "votacion_controller.php",
         data	: {
         opt		: 'trae_comunas_segun_region',
         idRegion   : id_region
         },
         success: function(data) {
             $("#comuna").html(data);
         }
     })
 } 

 // funcion que valida que email esté en formato correcto
function validarEmail(valor) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valor)){
    return true;
    } else {
    return false;
    }
}

//funcion que valida alias (que tenga al menos 5 caracteres además de letras y numeros)
function validarAlias(valor) {
    var letras = /[a-zA-Z]/;
    var numeros = /[0-9]/;

    return valor.length >= 5 && letras.test(valor) && numeros.test(valor);
  }