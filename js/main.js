$("#year").text(new Date().getFullYear());

$(document).ready(function() {
  $(".showTrailer").on("click", function(event) {
    event.preventDefault();
    let url = $(this).attr("href");
    $("#trailerVideo").attr("src", url);
    $("#trailerModal").modal("show");
  });

  // scroll to id
  $("a[href^='#']").click(function(e) {
    e.preventDefault();
    var position = $($(this).attr("href")).offset().top;
    $("body, html").animate(
      {
        scrollTop: position
      },
      700 /* speed */
    );
  });

  // Scroll back to top
  if ($("#back-to-top").length) {
    var scrollTrigger = 100;
    var backToTop = function() {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > scrollTrigger) {
        $("#back-to-top").addClass("show");
      } else {
        $("#back-to-top").removeClass("show");
      }
    };
    backToTop();
    $(window).on("scroll", function() {
      backToTop();
    });
    $("#back-to-top").on("click", function(e) {
      e.preventDefault();
      $("html,body").animate(
        {
          scrollTop: 0
        },
        700
      );
    });
  }

  $("#trailerModal").on("hide.bs.modal", function() {
    $("#trailerVideo").attr("src", "");
  });
});

$(document).on("submit", "#booking_form", function(e) {
  e.preventDefault();

  let name = $("#name").val();
  let email = $("#email").val();
  let tickets = $("#tickets").val();
  let date = $("#date").val();

  setBooking(name, email, tickets, date);
  showSuccesModal();
  showTotalSeats();
  $("#booking_form input").val("");
});

localStorage.bookings = localStorage.bookings ? localStorage.bookings : "";

let clearBookings = (function() {
  localStorage.bookings = "";
  // setAllBookings([]);
})();

let setAllBookings = function(bookings) {
  localStorage.bookings = JSON.stringify(bookings);
};

var setBooking = function(name, email, tickets, date) {
  addBooking(name, email, tickets, date);
};

let addBooking = function(name, email, tickets, date) {
  let bookings = getAllBookings();
  bookings.push({
    name: name,
    email: email,
    tickets: tickets,
    date: date
  });
  setAllBookings(bookings);
};

let getAllBookings = function() {
  try {
    let bookings = JSON.parse(localStorage.bookings);
    return bookings;
  } catch (e) {
    return [];
  }
};

let getTotalTickets = function() {
  let total = 0;
  let bookings = getAllBookings();
  $.each(bookings, function(index, value) {
    total += value.tickets * 1;
  });
  return total;
};

let getTotalSeats = function() {
  return 5000;
};

var showTotalSeats = function() {
  $("#seat_count").text(getTotalSeats() - getTotalTickets());
};

let showSuccesModal = function() {
  $("#bookingModal").modal("hide");
  $("#bookedModal").modal("show");
};
