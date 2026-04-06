function highlightActiveNav() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (window.location.href === link.href) {
      link.classList.add("active");
    }
  });
}

highlightActiveNav();

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
  document.getElementById("purchaseForm").style.display = "block";
}
