$(function() {
  $('h1').css('color', 'orange');

  // get/list all contacts
  var all = $.getJSON('/contacts', function(contacts){
    var contactsTable = $('#contactstable');
    contacts.forEach(function(contact){
      var tr = $("<tr>").appendTo(contactstable);
      var a = $("<a>").attr('href', '#').attr('data-id', contact.id).addClass('contact_link').text('Click to view contact');
      $("<td>").text(contact.full_name).appendTo(tr);
      $("<td>").appendTo(tr).append(a);
    });
  });

  // show a specific contact detail
  $('#contactstable').on('click', '.contact_link', function(e){
    contact_id = $(this).data("id");
    e.preventDefault(); 
    console.log(contact_id);
    $.getJSON('/contacts/' + contact_id, function(contact){
      $("#contactdetail").empty();
      $('<p>').text(contact.full_name).appendTo('#contactdetail');
      $('<p>').text(contact.email).appendTo('#contactdetail');
      $('<p>').text(contact.phone).appendTo('#contactdetail');
    });
  });

  // TODO: post save
  $('#enter').on('click', function(e){
    e.preventDefault();
    var postData = {
      fullname: $("#fullname").val(),
      email: $("#email").val(),
      phone: $("#phone").val()
    };
    if(postData.fullname == '' || postData.email == '' || postData.phone == '') {
      alert('Please fill everything');
      return false;
    }
    $.post("/contacts/new", postData, function(result){
      if (result.success == true){
        $("#contactdetail").empty();
        $('<h3>').text('New!').appendTo('#contactdetail');
        $('<p>').text(postData.fullname).appendTo('#contactdetail');
        $('<p>').text(postData.email).appendTo('#contactdetail');
        $('<p>').text(postData.phone).appendTo('#contactdetail');


        // append table
        var tr = $("<tr>").appendTo(contactstable);
        var a = $("<a>").attr('href', '#').attr('data-id', result.contact.id).addClass('contact_link').text('Click to view contact');
        $("<td>").text(postData.fullname).appendTo(tr);
        $("<td>").appendTo(tr).append(a);
      }else {
        alert('Fail to save!');
      }
    },'json');
  });

  // TODO: get find

  // function displayContacts(data) {
  //   var firstName = data[0].full_name
  //   console.log(data[0].full_name);
  //   var showClass = $('.show');
  //   $('<p>' + firstName + '</p>').appendTo(showClass);
  // }

  // $('#enter').on('click', function(e){
  //   e.preventDefault();
  //   $.ajax({
  //     url: '/contacts',
  //   }).then(function successContacts(data) {
  //     console.log('contacts', data);
  //     var parsedData = JSON.parse(data);
  //     displayContacts(parsedData);
  //   }, function errorContacts(err) {
  //     console.error('error dude!', err);
  //   } );
    // var test = '<p>TEST</p>';
    // $('.show').append(test);
  //});
});
