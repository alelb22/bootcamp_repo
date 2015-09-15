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
    $.get("http://bootcamp.aws.af.cm/welcome/" +nick, response_ok_function).error(response_error_function);
  });
  function response_ok_function(response) {
    $(".section_hidden").append("<BR>" + response.response);
    console.log("Respuesta obtenida");
    highlight_name();
  }
  function response_error_function() {
    $(".section_hidden").html("<BR>Error al obtener la respuesta.");
    console.log("Error en respuesta.");
  }
  $(".album_search_button").click(function() {
    var search_term = {
      q:$('.album_search').val(),
      type:'album'
    };
    console.log(search_term);
    $.ajax({
      url:'https://api.spotify.com/v1/search?'+ $.param(search_term), //jQuery.param() Create a serialized representation suitable for use in a URL query string or Ajax request
      dataType:'json',
      success: function(album_data){
        console.dir(album_data);
        $('.albums_section').append("<BR><BR><BR>");
        spotify_ok_function(album_data);
      }
    }).error(spotify_error_function);
    function spotify_error_function() {
      $(".albums_section").html("<BR>Error al conectar con Spotify.");
      console.log("Error en conexión con Spotify.");
    }
    function spotify_ok_function(all_album_data) {
      var album_article = '<article class="album_article_class"></article>';
      var album_name = '';
      var album_type = '';
      var album_cover = '';
      var release_date = '';
      var spotify_link = '';
      $( all_album_data.albums.items ).each( function() {
        album_name = '<div class="album_name_class">'+ this.name+'</div>';
        album_type = '<div class="album_type_class">Type: '+ this.album_type+'</div>';
        album_cover = '<div class="album_cover"><img src="'+ this.images[2].url+'" alt="Image of album '+ this.name+'" /></div>';
        release_date = '<div class="album_release_date">Release date: '+ this.release_date+'</div>';
        spotify_link = '<div class="album_spotify_link"><a href="'+ this.external_urls.spotify+'" target="_blank" >Spotify link.</a></div><br>';
        $('.albums_section').append(
          $(album_article).append(
            album_name + album_type + album_cover + release_date + spotify_link));
      });
    };
  });
});