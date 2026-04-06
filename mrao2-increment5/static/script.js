var GOOGLE_MAPS_API_KEY = "AIzaSyC2pPp5rkIENtDJkiIpPeGOcqBYD5K7kZE";
var MUSEUM_LAT = 40.2634;
var MUSEUM_LNG = -79.572;
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

ActiveNav();

var now = new Date();
var hour = now.getHours();

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

greeting(hour);

function addYear() {
  var yearEl = document.getElementById("copyYear");
  if (yearEl) {
    yearEl.innerHTML = "Copyright \u00A9 " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
  }
}

addYear();

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

loadGoogleMaps();
