$("#year").text(new Date().getFullYear());

$(document).ready(function() {
  $(".showTrailer").on("click", function(event) {
    event.preventDefault();
    let url = $(this).attr("href");
    console.log(url);
    $("#trailerVideo").attr("src", url);
    $("#trailerModal").modal("show");
  });

  /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
  // $("#trailerModal").on("show.bs.modal", function() {
  //   $("#trailerVideo").attr("src", url);
  // });

  /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
  $("#trailerModal").on("hide.bs.modal", function() {
    $("#trailerVideo").attr("src", "");
  });
});
