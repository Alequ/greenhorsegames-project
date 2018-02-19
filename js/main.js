$(document).ready(function() {
    $('form').submit(function(event) { //Trigger on form submit

        event.preventDefault(); //Prevent the default submit

        var postForm = { //Fetch form data
            'name'     : $('.input-name').val(), //Store name fields value
            'email'    : $('.input-email').val(), //Store email field value
            'message'  : $('.input-message').val() // store message field value
        };

        $.ajax({ //Process the form using $.ajax()
            type      : 'POST', //Method type
            url       : 'http://greenhorsegames.com/tests/frontend/process.php', // Change if you want to use process.php
            data      : postForm, //Forms name
            dataType  : 'json',
            success   : function(data) {


                            if (!data.success) { //If fails
                                if (data.errors) { //Returned if any error from process.php
                                   //Throw relevant error
                                   // If device width it's bigger than 620 px, trow nromal tooltip error, else trow a placeholder error.
                                  if(data.errors.name){
                                    if ($(window).width() < 620) {
                                      $('.input-name').val('').attr("placeholder", `${data.errors.name}`).addClass("activeMobile")

                                    }
                                    else {
                                      $('.popup-name').addClass('active').find( "span" ).text(`${data.errors.name}`);
                                    }

                                  }// end error name

                                  if(data.errors.email){
                                    if ($(window).width() < 620) {
                                        $('.input-email').val('').attr("placeholder", `${data.errors.email}`).addClass("activeMobile")

                                    }
                                    else {
                                        $('.popup-email').addClass('active').find( "span" ).text(`${data.errors.email}`);
                                    }

                                  }// end error email

                                  if(data.errors.message){
                                    if ($(window).width() < 620) {
                                        $('.input-message').val('').attr("placeholder", `${data.errors.message}`).addClass("activeMobile")

                                    }
                                    else {
                                      $('.popup-message').addClass('active').find( "span" ).text(`${data.errors.message}`);
                                    }

                                  }// end error message
                                }
                            }
                            else  {
                                    //If successful, than throw a success message

                                    $('#formDiv').html(
                                      `
                                       <div class="alert alert-success" >
                                           <strong>Thank you!</strong>  Your message has been successfully sent!
                                       </div>

                                     `
                                    )
                                }
                          }

        });

    });
      //remove popup on click
    $('.popup').on('click', function(){
      $(this).removeClass('active')
    })
    // remove popup on input focus
    $('.input1').on('focus', function(){
      $(this).prev().removeClass('active')
    })

    //remove input placeholde on focus
    $('.input1').on('focus',function(){
      $(this).removeClass('activeMobile')
    })

});
