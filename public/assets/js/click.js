$(function() {
    $("#removed").on("click", function(event) {
      var id = $(this).siblings("#removedChip").val();
    
      
  
      var newRemovedState = {
        removed: 1
      };
      console.log("Update Chip", id)
      // Send the PUT request.
      $.ajax("/api/chips/" + id, {
        type: "PUT",
        data: newRemovedState
      }).then(
        function() {
          console.log("Removed a Chip");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $("#createchip").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      console.log("Created Chip")
      var newChip = {
        chip: $("#chipName").val().trim(),
        sku: $("#skuName").val().trim(),
      };
  
      // Send the POST request.
      $.ajax("/api/chips", {
        type: "POST",
        data: newChip
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
  });
  