;(function () {
  //
  // jQuery is a popular library that simplifies many common web development tasks,
  // including AJAX. You can read more about jQuery here:
  // https://jquery.com/
  // https://en.wikipedia.org/wiki/JQuery
  //
  // jQuery uses the '$' symbol and puts itself on the global window object when loaded onto the page.
  // jQuery has been included on this page already for you.
  // Note that all of the following are equivalent ways of accessing the jQuery object:
  // $
  // window.$
  // window['$']
  // window.jQuery
  //
  // Just by reading a list of API methods you may get a sense of what jQuery can do:
  // $.get() - Load data from the server using a HTTP GET request.
  // $.getJSON() - Load JSON-encoded data from the server using a GET HTTP request.
  // $.getScript() - Load a JavaScript file from the server using a GET HTTP request, then execute it.
  // $.post() - Load data from the server using a HTTP POST request.
  // $.load() - Load data from the server and place the returned HTML into the matched element.
  //
  // Most of these methods are shorthand for the "mothership" $.ajax() method:
  // https://api.jquery.com/jQuery.ajax/
  //
  // Below is our jumbotron example from the previous tab done using jQuery's $.load() method:
  //

  $('#loadBtn2').click(clickBtn)

  function clickBtn () {
    $('#jumbotronContainer2').load('jumbotron.html')
    $('#loadBtn2').remove()

  }

  //
  // Pretty simple, right?
  //
  // Next up you will use jQuery AJAX methods to fetch some things from the dog.ceo website.
  // Check out the dog.ceo API here: https://dog.ceo/dog-api/
  //
  // 1) Add a click event to the "Generate Doggo" button
  //
  // 2) In your event handler, make an AJAX request to https://dog.ceo/api/breeds/image/random
  //    which will return JSON data.
  //    Hint: there is a very convenient jQuery method for getting JSON data
  //
  // 3) Look at the Network tab in Chrome Dev Tools and confirm that an HTTP request
  //    is being sent every time you click the "Generate Doggo" button.
  //
  // 4) When the button is clicked, change the button text to "Generating Doggo …"
  //    and add the "disabled" attribute to the button so it is no longer clickable.
  //    Hint: jQuery has methods for changing DOM attributes: http://api.jquery.com/attr/
  //
  // 5) The callback function for your AJAX request takes three parameters (function arguments).
  //    The first argument is the data returned from the request. Note that jQuery took the raw
  //    JSON response text and did JSON.parse() to deserialize the data for you (convenient, right?).
  //
  //    In the data returned from the request there should be an image URL to a random dog picture.
  //    Add an <img> tag inside the <div id="doggoContainer"> element with a "src" attribute pointing to that picture.
  //    Hint: jQuery has methods for DOM creation and insertion
  //          http://api.jquery.com/jQuery/#jQuery-html-ownerDocument
  //          https://api.jquery.com/category/manipulation/dom-insertion-inside/
  //
  // 6) When the request is finished, make sure to change the button text back to "Generate Doggo"
  //    and remove the "disabled" attribute so the button is clickable again.
  //
  // 7) When the button is clicked again, it should fetch another dog and replace the image
  //    inside of <div id="doggoContainer">. There should be a loop where you click the button,
  //    get a new dog, click the button, get a new dog, etc.
  //

  // TODO: your code goes here :)

  $('#generateDoggoBtn').click(clickBtn2)

  function clickBtn2() {
    $('#generateDoggoBtn').text('Generating Doggo ...'); //changes text of button
    $('#generageDoggoBtn').prop("disabled", true) //disables button 
    $.ajax({
      datatype: 'JSON',
      url: 'https://dog.ceo/api/breeds/image/random',
      success: insertDogPic,
      error: function(error){
        console.log("error")
      }
    })
    function insertDogPic(pic){
      var dogImageLink = pic.message; // targets image

      $('#doggoContainer').html(`<img id='image' src='${dogImageLink}'>`)
      
      $('#image').on('load', function(){
          $('#generateDoggoBtn').text('Generate Dog');
          $('#generageDoggoBtn').prop("disabled", false)
      })
    }
  }

  //
  // Cool. Now let's kick it up a notch and allow selecting a specific breed of dog!
  //
  // 1) Add an empty dropdown menu (ie: <select></select>) to the <div id="selectBreedContainer"> element.
  //
  // 2) Using a *different* jQuery AJAX method than you used in the above example, make a
  //    GET request to https://dog.ceo/api/breeds/list when the page first loads.
  //
  //    For example, if you used $.getJSON() above, try out $.ajax() for this exercise.
  //
  //    Hint: check out the $.ready() method https://api.jquery.com/ready/
  //
  // 3) Confirm that this AJAX request shows up in the Network tab everytime you reload the page
  //
  // 4) In the callback function for that GET request there should be an array of dog breeds.
  //    For each breed, add an <option value="poodle">Poodle</option> to your <select> menu.
  //
  //    Your drop down list should now contain a list of dog breeds.
  //
  // 5) Add a "change" event to the <select> element using $.on() http://api.jquery.com/on/
  //
  //    In your change event, make a GET request to https://dog.ceo/api/breed/{breed name}/images/random
  //    where {breed name} is the value from your <select> menu.
  //
  //    Use whichever AJAX method you prefer for this request.
  //
  // 6) Confirm that this AJAX request shows up in the Network tab everytime you select a breed from the list
  //
  // 7) In the callback function, create a new dog <img> tag and add it to the page, similar to the
  //    first exercise.
  //
  //    You should now be able to view random pictures of specific dog breeds via the menu!
  //

  // TODO: your code goes here :)
//var breed = document.getElementById("selectBreedContainer");
//breed.innerHTML = `<select></select>`

/*

$.ajax({
  datatype: 'JSON',
  url: 'https://dog.ceo/api/breeds/list',
  success: addBreeds,
  error: function(error){
    console.log("error")
  }
})

*/

$.getJSON('https://dog.ceo/api/breeds/list', function(breeds){
  $("#selectBreedContainer").html(`<select id="selector"> <option id="first"> -- select an option -- </option></select>`)
  var breeds = breeds.message;
  console.log(breeds)
  $.each(breeds, function addBreeds(i){

     $("#selector").append(`<option value ="${breeds[i]}">${breeds[i]}</option>`);
    
      
  })
   $('#selector').on('change', consoleDog)
 })



 //$('#selector').on('change', insertDog)
   function consoleDog(){
    var dogNames = $("#selector").val()  
    console.log(dogNames)
      //var dogImageLinks = `https://dog.ceo/api/breed/${dogNames}/images/random`
      //console.log(dogImageLinks)
      $.ajax({
        datatype: 'JSON',
        url: 'https://dog.ceo/api/breeds/image/random',
        success: insertDog,
        error: function(error){
          console.log("error")
        }
      })
      
      function insertDog(pic){
        var dogImageLink = pic.message;
        $('#doggoContainer').html(`<img src="${dogImageLink}">`)

      }
    
   
  
    //function consoleDog(pick){
     //
     //var realLinks = pick
     //console.log(dogNames)  
    //$('#doggoContainer').html(``)
    //}
   }

 
 /*
 var output = '';
 for(var i in breeds){
    output +=  '<select>' +
    '<ul> <li>'+breeds+'</li> </ul>' +
    '</select>' 
 }

 $("#selectBreedContainer").html(`${output}`)
 */






  //
  // Excellent work!
  //
  // Hopefully you can see why web developers prefer using the jQuery API over XMLHttpRequest directly.
  //
  // Next let's look at a new contender that is built into modern browsers: the Fetch API
  //
})()
