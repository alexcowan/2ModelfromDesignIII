/**
 * @File: js/detail.js
 * @Why: Handles individual part detail page functionality including part display, review system, and user interactions.
 * @Does: Manages part data loading, review submission/modification, star ratings, and authentication state.
 * @Inputs: Part ID from localStorage, Firebase Firestore data, user review inputs.
 * @Outputs: Detailed part information display, review system, user-specific review management.
 * @Depends on: Firebase SDK, main.js for shared authentication functions, CSS classes.
 * @Not responsible for: Parts catalog grid display or filtering (handled in main.js).
 */

// Creates an instance of the DB using the Firebase SDK
var db = firebase.firestore();

// Get just the part number that the user clickied on in the parts search page. Splits on '#' and takes the second element.
var partnum = localStorage.getItem("part-index").split("#", 2)[1];
console.log("incoming with part number " + partnum);

// Define the file path for where the part data lives
var part_file_path = "parts/" + partnum;

// Go get the part data from the applicable document in Firestore
db.doc(part_file_path)
  .get()
  .then(function (docSnapshot) {
    var part = docSnapshot.data();
    var id = docSnapshot.id;

    // Render the specific part information on the page
    document.getElementById("partnum").textContent = "Part #: " + id;
    document.getElementById("availability").textContent =
      "Availability: " + part.Availability;
    document.getElementById("orders").textContent =
      "Orders (90 day): " + part.Orders;
    document.getElementById("price").textContent =
      "Price: $" + parseFloat(part.Price).toFixed(2);
    document.getElementById("part-title").textContent =
      part.Manufacturer + " " + part.Model + " " + part.Type;
    document
      .getElementById("part-img")
      .setAttribute("src", "https://" + part.imageURL);

    // Initialize the stars and number of ratings
    var review_file_path = "parts/" + partnum + "/reviews";
    
    postReviews(review_file_path);
  });

function postReviews(reviewFilePath) {
  let totalRating = 0;
  let numReviews = 0;

  return db
    .collection(reviewFilePath)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        totalRating += doc.data().rating;
        numReviews++;
      });
      return { totalRating, numReviews };
    })
    .then(({ totalRating, numReviews }) => {
      const avgRating = totalRating / numReviews;
      const roundedRating = Math.floor(avgRating);
      displayStars(roundedRating, "star-rating");
      document.getElementById("numReviews").textContent =
        numReviews + " Reviews";
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const reviewSignifier = document.getElementById("review-signifier");
  if (reviewSignifier) {
    reviewSignifier.addEventListener("click", handleReviewClick);
  }
  document
    .getElementById("mod-link")
    .addEventListener("click", handleModifyReviewClick);
});


// Define the function that handles the review submission logic
function handleReviewClick(e) {
  if (e.target && e.target.matches("input.star")) {
    var rating = parseInt(e.target.id.split("-")[1], 10);
    selectedRating = rating;
    console.log("User selected rating: " + rating);
    addReview(partnum, rating);
  }
}

// Define the function that handles the review submission logic
function handleModifyReviewClick(e) {
  document.getElementById("review-signifier").style.display = "block";
  document.getElementById("mod-link").style.display = "none";
  document.getElementById("review-title").textContent = "Review this item";
  document.getElementById("user-star-rating").style.display = "none";
  handleReviewClick(e);
}

// Function to afford the user adding a review
function addReview(part_num, rating) {
  var review_file_path = "parts/" + part_num + "/reviews";
  var userId = firebase.auth().currentUser.uid;
  var docref = db.collection(review_file_path).doc(userId);
  docref
    .set(
      {
        partnum: part_num,
        rating: rating,
        user: userId,
        emailAddress: firebase.auth().currentUser.email,
      },
      { merge: true },
    )
    .then(function () {
      // Handle successful update
    })
    .then(function () {
      document.getElementById("review-title").textContent =
        "Thanks for your review.";
      document.getElementById("review-signifier").innerHTML = "";
      displayStars(rating, "user-star-rating");
    });
}

// Set the review file path for retrieving reviews
var review_file_path = "parts/" + partnum + "/reviews";

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("seeing user " + user.email);
    
    var reviews = db.collection(review_file_path);

    reviews
      .where("user", "==", user.uid)
      .get()
      .then(function (querySnapshot) {
        if (!querySnapshot.empty) {
          console.log(
            "I see you have a review; in fact, " +
              querySnapshot.size +
              " review/s"
          );

          document.getElementById("review-title").textContent = "Your Review";
          document.getElementById("review-signifier").style.display = "none";

          querySnapshot.forEach(function (doc) {
            var userReview = doc.data();
            var userRating = userReview.rating;
            console.log("The rating is " + userRating);

            displayStars(userRating, "user-star-rating");
            document.getElementById("mod-link").style.display = "block";
          });
        }
      });
  } else {
    console.log("no user");
    document.getElementById("user-reviews").style.display = "none";
  }
});

// Utility to display visual stars in a review
function displayStars(rating, elementId) {
  const container = document.getElementById(elementId);
  if (!container) return;
  container.innerHTML = "";

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    const star = document.createElement("span");
    star.className = "fa fa-star checked";
    container.appendChild(star);
  }

  if (hasHalfStar) {
    const halfStar = document.createElement("span");
    halfStar.className = "fa fa-star-half-o checked";
    container.appendChild(halfStar);
  }

  for (let i = 0; i < emptyStars; i++) {
    const star = document.createElement("span");
    star.className = "fa fa-star";
    container.appendChild(star);
  }
}

// Authentication Functions
document.getElementById('login-trigger').addEventListener('click', authUser);

function authUser() {
  handle_auth();
}

document.getElementById('register-link').addEventListener('click', onReg);

function onReg() {
  document.getElementById('loginForm').style.display = "none";
  document.getElementById('registerForm').style.display = "block";
}

document.getElementById('forgotten-link').addEventListener('click', onForget);

function onForget() {
  document.getElementById('forgottenForm').style.display = "block";
  document.getElementById('before-reset').style.display = "block";
  document.getElementById('loginForm').style.display = "none";
}

function handle_auth() {
  var user = firebase.auth().currentUser;
  console.log("dealing with " + user);

  if (!user) {
    ltState = document.getElementById('login-content').style.display;
    console.log(ltState);
    if (ltState == "block") {
      document.getElementById('login-content').style.display = "none";
    } else {
      document.getElementById('login-content').style.display = "block";
      document.getElementById('registerForm').style.display = "none";
      document.getElementById('before-reset').style.display = "none";
      document.getElementById('after-reset').style.display = "none";
      document.getElementById('if-error').style.display = "none";
      document.getElementById('loginForm').style.display = "block";
    }
  } else {
    firebase.auth().signOut().then(function () {
      console.log("Signed out " + user.email);
    }).catch(function (error) {
      alert("Something went wrong.");
    });
    document.getElementById("auth-text").innerHTML = "Log In";
  }
}

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', loginUser);

function loginUser() {
  console.log("attempting to login user");

  email = document.getElementById("login_email").value;
  pwd = document.getElementById("login_pwd").value;

  firebase.auth().signInWithEmailAndPassword(email, pwd).then(function () {
    document.getElementById("loginForm").reset();
    location.reload(); // Reload the page to show review options
  }, function (error) {
    var errorMessage = error.message;
    alert(errorMessage);
  });
}

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', registerUser);

function registerUser() {
  console.log("I'll try to register this user");

  email = document.getElementById("register_email").value;
  pwd = document.getElementById("register_pwd").value;
  rePwd = document.getElementById("register_re_pwd").value;

  if (pwd != rePwd) {
    document.getElementById("reg-error-response").innerHTML = "Error: passwords do not match.";
    document.getElementById('if-reg-error').style.display = "block";
  } else {
    firebase.auth().createUserWithEmailAndPassword(email, pwd).then(function (user) {
      if (user) {
        document.getElementById("registerForm").reset();
        location.reload(); // Reload the page to show review options
      }
    }, function (error) {
      var errorMessage = error.message;
      document.getElementById("reg-error-response").innerHTML = errorMessage;
      document.getElementById('if-reg-error').style.display = "block";
    });
  }
}

const forgottenForm = document.getElementById('forgottenForm');
forgottenForm.addEventListener('submit', recoverPassword);

function recoverPassword() {
  email = document.getElementById("recovery_email").value;

  firebase.auth().sendPasswordResetEmail(email).then(function () {
    console.log("sending recovery to " + email);
    document.getElementById('before-reset').style.display = "none";
    document.getElementById('after-reset').style.display = "block";
    document.getElementById("forgottenForm").reset();
  }).catch(function (error) {
    var errorMessage = error.message;
    document.getElementById("error-response").innerHTML = errorMessage;
    document.getElementById('if-error').style.display = "block";
  });
}
