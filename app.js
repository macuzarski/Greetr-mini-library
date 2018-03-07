//adding jQuery .click function to the button
$('#login').click(() => {
   
    //creating new Greetr obj
    let loginGrtr = G$($('#loginName').val(), $('#loginLast').val());
    
    $('#logindiv').hide();
    
    //deciding if the greeting should be formal or informal depending on the age
    const ages = $('#ageE').val();
    const countAge = () => { if (ages >= 18) { return true; } else { return false; } };
   
    
    //updating the header in HTML with the obj, setting 
    //language value based on users choice, also loggin in the console
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', countAge()).log();
   
    
});

