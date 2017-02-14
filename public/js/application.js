$('.jl-like-button').one('click', function() {
  $.post('/like', function(data) {
    $('.jl-like-button').text('LIKES: ' + data.likeCount);
    console.log(data.likeCount);
    console.log('like finished');
  });
});

$('.jl-dislike-button').one('click', function() {
  $.post('/dislike', function(data) {
    $('.jl-dislike-button').text('DISLIKES: ' + data.dislikeCount);
    console.log(data.dislikeCount);
    console.log('dislike finished');
  });
});

$('#search-button input').on('keyup', function() {
   var query = $('#search-button input').val();
   console.log($('#search-button input').val());
 
   if (query !== "") {
     $.get('/api/search/' + query, function(data) {
       console.log(data);
       $(".jl-app-search-results").html('');
       console.log(element);
       data.forEach(function(element) {
         $(".jl-app-search-results").append(
         $("<li data-surname="+"'"+element.lastname+"'"+">"+element.firstname + ' ' + element.lastname + "</li>")
         );
         });
       });
     }
   });

   console.log("YESSSSAPPENED!");

   $(".jl-app-search-results").click(function(e) {
     var lastname = (e.target).getAttribute("data-surname");

     $.get('/'+lastname, function(data) {
       window.location.href = '/'+lastname;
     });
   });