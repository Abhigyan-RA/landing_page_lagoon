function scrollToEarlyAccess() {
  const target = document.getElementById("early-access");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  } else {
    console.error("Target section not found!");
  }
}

document.addEventListener("scroll", function () {
  const homeImage = document.querySelector(".home-image img");
  const imagePosition = homeImage.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (imagePosition < screenHeight - 100) {
    // Adjust this number as per your need
    homeImage.classList.add("visible");
  } else {
    homeImage.classList.remove("visible");
  }
});
function scrollToEarlyAccess() {
  const target = document.getElementById("early-access");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  } else {
    console.error("Target section not found!");
  }
}
document
  .getElementById("get-access-btn")
  .addEventListener("click", function () {
    const emailInput = document.getElementById("main-4-input").value;
    const popup = document.getElementById("thank-you-popup");
    const popupText = popup.querySelector(".popup-text");
    const closeIcon = popup.querySelector(".close-icon");
    const icon = popup.querySelector(".icon");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    popup.classList.remove("success-popup", "error-popup");
    popup.classList.remove("show");

    if (emailInput.trim() === "") {
      popupText.innerHTML = "Please enter your email!";
      popup.classList.add("error-popup");
      closeIcon.style.color = "red";
      icon.innerHTML = `<img src="/Images/cross.png" alt="Cross" class="popup-icon-img">`;
      icon.style.backgroundColor = "transparent";
      popup.classList.add("show");
      setTimeout(() => {
        popup.classList.remove("show");
      }, 1000);
    } else if (!emailRegex.test(emailInput)) {
      popupText.innerHTML = "Please enter a correct email!";
      popup.classList.add("error-popup");
      closeIcon.style.color = "red";
      icon.innerHTML = `<img src="/Images/cross.png" alt="Cross" class="popup-icon-img">`;
      icon.style.backgroundColor = "transparent";
      popup.classList.add("show");
      setTimeout(() => {
        popup.classList.remove("show");
      }, 1000);
    } else {
      // First, send email to Google Apps Script (or your preferred method)
      fetch('https://script.google.com/macros/s/AKfycbyLkPuKm5MM62fLQPM5vlceixgYkkqOcpeq2eL0cisZaaGcYkFhy_Is9JCCaiYOMtJQ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(emailInput)}`
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          
          fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailInput })
          })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              popupText.innerHTML = "Thank You for registering. A welcome email has been sent!";
              popup.classList.add("success-popup");
              closeIcon.style.color = "green";
              icon.innerHTML = "&#10003;";
              icon.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
              icon.style.color = "green";
              popup.classList.add("show");
              setTimeout(() => {
                popup.classList.remove("show");
              }, 1000);
            } else {
              popupText.innerHTML = "Something went wrong. Please try again!";
              popup.classList.add("error-popup");
              closeIcon.style.color = "red";
              icon.innerHTML = `<img src="/Images/cross.png" alt="Cross" class="popup-icon-img">`;
              icon.style.backgroundColor = "transparent";
              popup.classList.add("show");
              setTimeout(() => {
                popup.classList.remove("show");
              }, 1000);
            }
          })
          .catch(error => {
            console.error('Error!', error);
            popupText.innerHTML = "An error occurred while sending the email!";
            popup.classList.add("error-popup");
            popup.classList.add("show");
            setTimeout(() => {
              popup.classList.remove("show");
            }, 1000);
          });
        } else {
          popupText.innerHTML = "Something went wrong. Please try again!";
          popup.classList.add("error-popup");
          closeIcon.style.color = "red";
          icon.innerHTML = `<img src="/Images/cross.png" alt="Cross" class="popup-icon-img">`;
          icon.style.backgroundColor = "transparent";
          popup.classList.add("show");
          setTimeout(() => {
            popup.classList.remove("show");
          }, 1000);
        }
      })
      .catch(error => {
        console.error('Error!', error);
        popupText.innerHTML = "An error occurred, please try again!";
        popup.classList.add("error-popup");
        popup.classList.add("show");
        setTimeout(() => {
          popup.classList.remove("show");
        }, 1000);
      });
    }

    closeIcon.addEventListener("click", function () {
      popup.classList.remove("show");
    });
  });
