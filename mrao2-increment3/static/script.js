var x = 5;
var y = 7;
var z = x + y;
console.log(z);

var A = "Hello ";
var B = "world!";
var C = A + B;
console.log(C);

function sumnPrint(x1, x2) {
  var result = x1 + x2;
  console.log(result);
}

sumnPrint(x, y);
sumnPrint(A, B);

if (C.length > z) {
  if (C.length < z) {
    console.log(z);
  }
  console.log(C);
} else {
  if (C.length < z) {
    console.log(z);
  } else {
    console.log("good job!");
  }
}

var L1 = ["Watermelon", "Pineapple", "Pear", "Banana"];
var L2 = ["Apple", "Banana", "Kiwi", "Orange"];

// function findTheBanana(arr) {
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] === "Banana") {
//       alert("Found the Banana!");
//     }
//   }
// }

// function findTheBanana(arr) {
//   arr.forEach(function (item) {
//     if (item === "Banana") {
//       alert("Found the Banana!");
//     }
//   });
// }

// findTheBanana(L1);
// findTheBanana(L2);

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
