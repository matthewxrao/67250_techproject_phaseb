/* === Global Constants === */
var GOOGLE_MAPS_API_KEY = "AIzaSyC2pPp5rkIENtDJkiIpPeGOcqBYD5K7kZE";
var MUSEUM_LAT = 40.4433;
var MUSEUM_LNG = -79.95;
var MUSEUM_ZOOM = 15;
var MUSEUM_NAME = "MonoMuse Museum";
var YOUTUBE_VIDEO_ID = "ruXv972PEcQ";
var TICKET_PRICE = 18;
var IMAGE_DURATION = 8000; // 8 seconds

/* === Navigation Bar === */
function buildNav() {
  var isSubpage = window.location.pathname.indexOf("/views/") !== -1;
  var prefix = isSubpage ? "../" : "./";
  var viewPrefix = isSubpage ? "" : "views/";

  var nav = document.getElementById("site-nav");
  if (!nav) return;

  nav.innerHTML =
    '<nav class="nav_bar">' +
    '<a href="' +
    prefix +
    'index.html" class="nav-logo">' +
    '<img id="logo" src="' +
    prefix +
    'static/monomuselogo.png" alt="MonoMuse Museum Logo" style="height:60px;"/>' +
    "</a>" +
    '<a href="' +
    prefix +
    'index.html">Home</a>' +
    '<a href="' +
    viewPrefix +
    'explore.html">Explore</a>' +
    '<a href="' +
    viewPrefix +
    'exhibitions.html">Exhibitions</a>' +
    '<a href="' +
    viewPrefix +
    'buytickets.html">Buy Tickets</a>' +
    '<span class="nav-spacer"></span>' +
    '<div class="nav-dropdown">' +
    '<button class="nav-dropdown-toggle" onclick="toggleExtras()"> EXTRAS &#9662;</button>' +
    '<div class="nav-dropdown-menu">' +
    '<a href="' +
    viewPrefix +
    'designguide.html">Design Guide</a>' +
    '<a href="' +
    viewPrefix +
    'designrationale.html">Design Rationale</a>' +
    "</div>" +
    "</div>" +
    '<a href="javascript:void(0);" class="hamburger" onclick="toggleNav()">&#9776;</a>' +
    "</nav>";
}

function toggleExtras() {
  var menu = document.querySelector(".nav-dropdown-menu");
  if (menu) {
    menu.classList.toggle("open");
  }
}

document.addEventListener("click", function (e) {
  var dropdown = document.querySelector(".nav-dropdown");
  var menu = document.querySelector(".nav-dropdown-menu");
  if (dropdown && menu && !dropdown.contains(e.target)) {
    menu.classList.remove("open");
  }
});

function highlightActiveNav() {
  var navLinks = document.querySelectorAll("nav a");
  var currentpage = window.location.href;
  navLinks.forEach(function (link) {
    if (currentpage === link.href) {
      link.classList.add("active");
    }
  });
}

function toggleNav() {
  var navbar = document.querySelector(".nav_bar");
  if (navbar) {
    navbar.classList.toggle("responsive");
  }
}

/* === Greeting === */
function greeting(x) {
  var el = document.getElementById("greeting");
  if (el) {
    if (x < 5 || x >= 20) {
      el.innerHTML = "Good night! Welcome to the MonoMuse Museum";
    } else if (x < 12) {
      el.innerHTML = "Good morning! Welcome to the MonoMuse Museum";
    } else if (x < 18) {
      el.innerHTML = "Good afternoon! Welcome to the MonoMuse Museum";
    } else {
      el.innerHTML = "Good evening! Welcome to the MonoMuse Museum";
    }
  }
}

/* === Footer === */
function addYear() {
  var yearEl = document.getElementById("copyYear");
  if (yearEl) {
    yearEl.innerHTML =
      "Copyright \u00A9 " +
      new Date().getFullYear() +
      " MonoMuse. All rights reserved." +
      "<br> <small> 67250 S26 TECHNOLOGY PROJECT - FINAL PROJECT </small>";
  }
}

/* === Read More / Read Less toggle === */
if (typeof $ !== "undefined") {
  $(document).ready(function () {
    $("#readLess").click(function () {
      $("#longIntro").hide();
      $("#readLess").hide();
      $("#readMore").show();
    });

    $("#readMore").click(function () {
      $("#longIntro").show();
      $("#readLess").show();
      $("#readMore").hide();
    });
  });
}

/* === Checkout === */
function openCheckout() {
  var dialog = document.getElementById("checkoutDialog");
  if (dialog) {
    dialog.showModal();
    updateTotal();
  }
}

function closeCheckout() {
  var dialog = document.getElementById("checkoutDialog");
  if (dialog) dialog.close();
}

function closeConfirm() {
  var dialog = document.getElementById("confirmDialog");
  if (dialog) dialog.close();
}

function updateTotal() {
  var qty = parseInt(document.getElementById("ticketQty").value) || 0;
  if (qty < 1) qty = 1;
  if (qty > 10) qty = 10;
  var total = qty * TICKET_PRICE;
  var el = document.getElementById("orderTotal");
  if (el) el.textContent = "$" + total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", function () {
  var qtyInput = document.getElementById("ticketQty");
  if (qtyInput) {
    qtyInput.addEventListener("input", updateTotal);
  }

  var form = document.getElementById("checkoutForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateCheckout()) {
        showConfirmation();
      }
    });
  }

  // close dialog on backdrop click
  var dialogs = document.querySelectorAll("dialog");
  dialogs.forEach(function (d) {
    d.addEventListener("click", function (e) {
      if (e.target === d) d.close();
    });
  });
});

/* === Form Validation === */
function clearErrors() {
  var msgs = document.querySelectorAll(".error-msg");
  msgs.forEach(function (el) {
    el.textContent = "";
  });
  var inputs = document.querySelectorAll(
    "#checkoutForm input, #checkoutForm select",
  );
  inputs.forEach(function (el) {
    el.classList.remove("input-error");
  });
}

function showError(id, msg) {
  var el = document.getElementById(id);
  if (el) el.textContent = msg;
  // also mark the input
  var inputId = id.replace("Error", "");
  var input = document.getElementById(inputId);
  if (input) input.classList.add("input-error");
}

function validateCheckout() {
  clearErrors();
  var valid = true;

  var date = document.getElementById("visitDate").value;
  if (!date) {
    showError("visitDateError", "Please select a visit date.");
    valid = false;
  }

  var type = document.getElementById("ticketType").value;
  if (!type) {
    showError("ticketTypeError", "Please select a ticket type.");
    valid = false;
  }

  var qty = parseInt(document.getElementById("ticketQty").value);
  if (!qty || qty < 1 || qty > 10 || isNaN(qty)) {
    showError("ticketQtyError", "Please enter a quantity between 1 and 10.");
    valid = false;
  }

  var email = document.getElementById("checkoutEmail").value.trim();
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError("checkoutEmailError", "Please enter your email address.");
    valid = false;
  } else if (!emailPattern.test(email)) {
    showError("checkoutEmailError", "Please enter a valid email address.");
    valid = false;
  }

  var zip = document.getElementById("zipCode").value.trim();
  if (zip && !/^\d{5}$/.test(zip)) {
    showError("zipCodeError", "Zip code must be exactly 5 digits.");
    valid = false;
  }

  return valid;
}

/* === Confirmation === */
function showConfirmation() {
  var qty = parseInt(document.getElementById("ticketQty").value);
  var total = qty * TICKET_PRICE;
  var email = document.getElementById("checkoutEmail").value.trim();
  var date = document.getElementById("visitDate").value;
  var type = document.getElementById("ticketType").value;

  // capitalize type
  var typeLabel = type.charAt(0).toUpperCase() + type.slice(1);

  document.getElementById("confirmEmail").textContent = email;
  document.getElementById("confirmDate").textContent = date;
  document.getElementById("confirmType").textContent = typeLabel;
  document.getElementById("confirmQty").textContent = qty;
  document.getElementById("confirmTotal").textContent = "$" + total.toFixed(2);

  closeCheckout();

  var dialog = document.getElementById("confirmDialog");
  if (dialog) dialog.showModal();
}

/* === Google Maps === */
function initMap() {
  var mapEl = document.getElementById("map");
  if (mapEl && typeof google !== "undefined" && google.maps) {
    var museumLocation = { lat: MUSEUM_LAT, lng: MUSEUM_LNG };
    var map = new google.maps.Map(mapEl, {
      center: museumLocation,
      zoom: MUSEUM_ZOOM,
    });
    var marker = new google.maps.Marker({
      position: museumLocation,
      map: map,
      title: MUSEUM_NAME,
    });
    var infoWindow = new google.maps.InfoWindow({
      content: "<h3>" + MUSEUM_NAME + "</h3>",
    });
    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  }
}

function loadGoogleMaps() {
  if (document.getElementById("map")) {
    var script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=" +
      GOOGLE_MAPS_API_KEY +
      "&callback=initMap&loading=async";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
}

/* === YouTube Player === */
var ytPlayer;

function onYouTubeIframeAPIReady() {
  var playerEl = document.getElementById("youtube-player");
  if (playerEl) {
    ytPlayer = new YT.Player("youtube-player", {
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        rel: 0,
      },
    });
  }
}

function highlightActiveHOP(day) {
  var dayMap = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  var dayName = dayMap[day];
  if (dayName) {
    var el = document.getElementById(dayName);
    if (el) {
      el.classList.add("active-hops");
    }
  }
}

/* === Slideshow Progress Bar === */
if (window.location.href.includes("explore.html")) {
  var progress = 0;
  var tickMs = 10;
  var step = 100 / (IMAGE_DURATION / tickMs);
  var fill = document.getElementById("slideshowProgressFill");

  setInterval(function () {
    progress = Math.min(progress + step, 100);
    fill.style.width = progress + "%";
  }, tickMs);

  // whenever slide changes:
  function resetProgress() {
    progress = 0;
    fill.style.width = "0%";
  }
}

/* === DOM Runner === */
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href.includes("explore.html")) {
    const images = [
      "../static/image1.png",
      "../static/image2.png",
      "../static/image3.png",
      "../static/image4.png",
    ];

    const altTexts = [
      "Outside View of MonoMuse Museum",
      "Hall of Statues",
      "Famous Marble Staircases",
      "Statue of Galileo",
    ];

    // set on page load
    var slideshowImage = document.getElementById("slide");
    if (slideshowImage) {
      var track = document.createElement("div");
      track.id = "slideshowProgressTrack";
      track.style.width = "100%";
      track.style.height = "6px";
      track.style.background = "#d9d9d9";
      track.style.borderRadius = "999px";
      track.style.overflow = "hidden";
      track.style.marginTop = "10px";

      var fill = document.createElement("div");
      fill.id = "slideshowProgressFill";
      fill.style.width = "0%";
      fill.style.height = "100%";
      fill.style.background = "#111";
      fill.style.transition = "width 0.05s linear";

      track.appendChild(fill);
      slideshowImage.insertAdjacentElement("afterend", track);

      var progress = 0;
      var tickMs = 50;
      var step = 100 / (IMAGE_DURATION / tickMs);

      setInterval(function () {
        progress = Math.min(progress + step, 100);
        fill.style.width = progress + "%";
      }, tickMs);

      var observer = new MutationObserver(function () {
        progress = 0;
        fill.style.width = "0%";
      });

      observer.observe(slideshowImage, {
        attributes: true,
        attributeFilter: ["src"],
      });
    }

    // auto-advance slideshow
    let i = 0;
    const slide = document.getElementById("slide");

    function showNextImage() {
      i = (i + 1) % images.length;
      slide.src = images[i];
      slide.alt = altTexts[i];
    }
    setInterval(showNextImage, IMAGE_DURATION);
  }

  // load page elements
  buildNav();
  highlightActiveNav();
  highlightActiveHOP(new Date().getDay());
  greeting(new Date().getHours());
  addYear();
  loadGoogleMaps();
});
