document.addEventListener("DOMContentLoaded", function () {
    // Navbar Toggle for Mobile
    const navbarToggler = document.querySelector(".navbar-toggler");
    navbarToggler.addEventListener("click", function () {
        document.querySelector("#navbarNav").classList.toggle("show");
    });

    // Smooth Scrolling for Internal Links
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });

    // Add Scroll Animation for Sections
    const sections = document.querySelectorAll("section");
    const options = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Highlight Active Pricing Box on Hover
    const pricingBoxes = document.querySelectorAll(".pricing-box");
    pricingBoxes.forEach(box => {
        box.addEventListener("mouseenter", () => {
            box.classList.add("highlight");
        });
        box.addEventListener("mouseleave", () => {
            box.classList.remove("highlight");
        });
    });
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    
    let form = this;
    let formData = new FormData(form);

    // Show loading state
    let submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.innerText = "Submitting...";

    fetch(form.action, {
        method: form.method,
        body: formData
    }).then(response => {
        if (response.ok) {
            // Hide form and show confirmation message
            document.getElementById("formContainer").style.display = "none";
            document.getElementById("confirmationContainer").style.display = "block";
            form.reset(); // Reset form fields
        } else {
            alert("Submission failed. Please try again.");
        }
    }).catch(error => {
        console.error("Error!", error.message);
        alert("Error submitting the form. Please try again.");
    }).finally(() => {
        submitButton.disabled = false;
        submitButton.innerText = "Join Now";
    });
});

// Close modal when "Okay!" is clicked
document.getElementById("closeModalBtn").addEventListener("click", function() {
    let modal = bootstrap.Modal.getInstance(document.getElementById("signupModal"));
    modal.hide(); // Hide modal
    setTimeout(() => {
        // Reset modal content after closing
        document.getElementById("confirmationContainer").style.display = "none";
        document.getElementById("formContainer").style.display = "block";
    }, 500);
});