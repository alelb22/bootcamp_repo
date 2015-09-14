$(document).ready(function(){
  var nick ="";
  function highlight_name() {
    replace_string = $('.section_hidden').html().replace( nick, "<b>" + nick + "</b>" );
    console.log("final_value: " + replace_string);
    $(".section_hidden").html(replace_string);
  };	
  $('.section_hidden').fadeIn(1000);
  $('.alias').focus();
  $(".response_button").click(function() {
    nick = $('.alias').val();
    console.log("Alias: " + nick);
    $.get("http://bootcamp.aws.af.cm/welcome/" +nick, respond_function).error(error_function);
  });
  function respond_function(response) {
    $(".section_hidden").append("<BR>" + response.response);
    console.log("Respuesta obtenida");
	highlight_name();
  }
  function error_function() {
    $(".section_hidden").html("<BR>Error al obtener la respuesta.");
    console.log("Error en respuesta.");
  }
});