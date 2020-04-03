//form contact ajax

$(function () {

  $("#form").submit(function (e) {



    // enlever cpt par défaut quand soumission form => pas de redirection vers
    // autre page,ttt php sur meme page
    e.preventDefault();
    //vider commentaires apres submit
    $(".comments").empty();
    //mettre toutes les infos du form ds postData apres submit
    var postData = $("#form").serialize();

    $.ajax({

        type: "POST",
        //url ou on envoi infos POST du form
        url: "php/contact.php",
        // data qu'on envoi => stockées ds var postData
        data: postData,
        // envoi en format json
        dataType: 'Json',
        // creation objet resultat si succes
        success: function (result) {

          if (result.isSuccess) {

            // si form est un succes, on rajoute ds html le <p>message bien envoyé!</p>
            $("#form").append("<p class='thank-you'>Votre message a bien été envoyé. Merci de nous avoir contacté!</p>");
            // remmetre à zéro contenus contact form
            $("#form")[0].reset();
          } else {
            //si erreur, ecriture ds html au niveau de la cible du message d'erreur encodé en json
            $("#icon_name + .comments").html(result.nameError);
            $("#icon_prenom + .comments").html(result.prenomError);
            $("#icon_telephone + .comments").html(result.telError);
            $("#icon_email + .comments").html(result.emailError);
            $("#icon_sujet + .comments").html(result.sujetError);
            $("#textarea1 + .comments").html(result.messageError);
          }

        }


      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        alert("error");
      })
  });


});