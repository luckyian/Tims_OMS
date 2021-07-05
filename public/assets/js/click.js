$(function() {
    $("#devoured").on("click", function(event) {
      var id = $(this).siblings("#devouredBurger").val();
    
      
  
      var newDevoueredState = {
        devoured: 1
      };
      console.log("Update Burger", id)
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevoueredState
      }).then(
        function() {
          console.log("Ate burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $("#createburger").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      console.log("Created Burger")
      var newBurger = {
        burger: $("#burgerName").val().trim(),
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
  });
  