function buildNav() {
  var isSubpage = window.location.pathname.indexOf("/views/") !== -1;
  var prefix = isSubpage ? "../" : "./";
  var viewPrefix = isSubpage ? "" : "views/";

  var nav = document.getElementById("site-nav");
  if (!nav) return;

  nav.innerHTML =
    '<nav class="nav_bar">' +
      '<a href="' + prefix + 'index.html" class="nav-logo">' +
        '<img id="logo" src="' + prefix + 'static/monomuselogo.png" alt="MonoMuse Museum Logo" style="height:60px;"/>' +
      '</a>' +
      '<a href="' + prefix + 'index.html">Home</a>' +
      '<a href="' + viewPrefix + 'explore.html">Explore</a>' +
      '<a href="' + viewPrefix + 'exhibitions.html">Exhibitions</a>' +
      '<a href="' + viewPrefix + 'buytickets.html">Buy Tickets</a>' +
      '<span class="nav-spacer"></span>' +
      '<div class="nav-dropdown">' +
        '<button class="nav-dropdown-toggle" onclick="toggleExtras()"> ADDITIONAL &#9662;</button>' +
        '<div class="nav-dropdown-menu">' +
          '<a href="' + viewPrefix + 'designguide.html">Design Guide</a>' +
          '<a href="' + viewPrefix + 'designrationale.html">Design Rationale</a>' +
          '<a href="' + prefix + 'increments.html">Increments</a>' +
        '</div>' +
      '</div>' +
      '<a href="javascript:void(0);" class="hamburger" onclick="toggleNav()">&#9776;</a>' +
    '</nav>';
}

function toggleExtras() {
  var menu = document.querySelector(".nav-dropdown-menu");
  if (menu) {
    menu.classList.toggle("open");
  }
}

document.addEventListener("click", function(e) {
  var dropdown = document.querySelector(".nav-dropdown");
  var menu = document.querySelector(".nav-dropdown-menu");
  if (dropdown && menu && !dropdown.contains(e.target)) {
    menu.classList.remove("open");
  }
});

var GOOGLE_MAPS_API_KEY = "AIzaSyC2pPp5rkIENtDJkiIpPeGOcqBYD5K7kZE";
var MUSEUM_LAT = 40.4433;
var MUSEUM_LNG = -79.9500;
var MUSEUM_ZOOM = 15;
var MUSEUM_NAME = "MonoMuse Museum";
var YOUTUBE_VIDEO_ID = "ruXv972PEcQ";

function ActiveNav() {
  var navLinks = document.querySelectorAll('nav a');
  var currentpage = window.location.href;
  navLinks.forEach(function(link) {
    if (currentpage === link.href) {
      link.classList.add("active");
    }
  });
}

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

function addYear() {
  var yearEl = document.getElementById("copyYear");
  if (yearEl) {
    yearEl.innerHTML = "Copyright \u00A9 " + new Date().getFullYear() + " MonoMuse. All rights reserved." + "<br> <small> 67250 S26 TECHNOLOGY PROJECT - FINAL PROJECT </small>";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  buildNav();
  ActiveNav();
  greeting(new Date().getHours());
  addYear();
  loadGoogleMaps();
});

if (typeof $ !== 'undefined') {
  $(document).ready(function() {
    $("#readLess").click(function() {
      $("#longIntro").hide();
      $("#readLess").hide();
      $("#readMore").show();
    });

    $("#readMore").click(function() {
      $("#longIntro").show();
      $("#readLess").show();
      $("#readMore").hide();
    });
  });
}

function showPurchaseForm() {
  var form = document.getElementById("purchaseForm");
  if (form) {
    form.style.display = "block";
  }
}

function toggleNav() {
  var navbar = document.querySelector(".nav_bar");
  if (navbar) {
    navbar.classList.toggle("responsive");
  }
}

function initMap() {
  var mapEl = document.getElementById("map");
  if (mapEl && typeof google !== 'undefined' && google.maps) {
    var museumLocation = { lat: MUSEUM_LAT, lng: MUSEUM_LNG };
    var map = new google.maps.Map(mapEl, {
      center: museumLocation,
      zoom: MUSEUM_ZOOM
    });
    var marker = new google.maps.Marker({
      position: museumLocation,
      map: map,
      title: MUSEUM_NAME
    });
    var infoWindow = new google.maps.InfoWindow({
      content: "<h3>" + MUSEUM_NAME + "</h3>"
    });
    marker.addListener("click", function() {
      infoWindow.open(map, marker);
    });
  }
}

var ytPlayer;

function onYouTubeIframeAPIReady() {
  var playerEl = document.getElementById("youtube-player");
  if (playerEl) {
    ytPlayer = new YT.Player('youtube-player', {
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        rel: 0
      }
    });
  }
}

function loadGoogleMaps() {
  if (document.getElementById("map")) {
    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_MAPS_API_KEY + "&callback=initMap&loading=async";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
}
