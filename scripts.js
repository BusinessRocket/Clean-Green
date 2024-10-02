document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.menu-button');
    const navbar = document.querySelector('.navbar');
    const secondaryNav = document.querySelector('.secondary-nav');

    // Toggle navbar visibility on menu button click
    menuButton.addEventListener('click', function () {
        navbar.classList.toggle('active');
    });

    // Show and hide secondary nav on hover
    const servicesNav = document.getElementById('services-nav');

    servicesNav.addEventListener('mouseenter', function () {
        secondaryNav.style.display = 'block';
        setTimeout(() => {
            secondaryNav.style.opacity = '1';
            secondaryNav.style.transform = 'translateY(0)';
        }, 10); // Small delay for smooth transition
    });

    servicesNav.addEventListener('mouseleave', function () {
        secondaryNav.style.opacity = '0';
        secondaryNav.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            secondaryNav.style.display = 'none';
        }, 300); // Duration of transition in milliseconds
    });

    // Slideshow functionality
    let slideIndex = 0;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        const slides = document.querySelectorAll('.slide');
        if (n >= slides.length) { slideIndex = 0; }
        if (n < 0) { slideIndex = slides.length - 1; }
        slides.forEach(slide => slide.style.display = 'none');
        slides[slideIndex].style.display = 'block';
    }

    document.querySelector('.prev').addEventListener('click', () => plusSlides(-1));
    document.querySelector('.next').addEventListener('click', () => plusSlides(1));
});

// Form submission handling
document.getElementById('infoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Grab the form data
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const enquiry = document.getElementById('enquiry').value;
    const message = document.getElementById('message').value.trim(); // Include message field
    
    // Create FormData object to store the data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('enquiry', enquiry);
    formData.append('message', message); // Append message to formData
    
    // Send data to FormSubmit
    fetch('https://getform.io/f/bvreonkb', { // Replace @ with %40
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        console.log(data); // Log the response to check any issues
        if (data.success) {
            alert('Thank you! Your information has been submitted.');
            document.getElementById('infoForm').reset(); // Reset form after successful submission
        } else {
            alert('There was an issue with your submission. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your form. Please try again later.');
    });
});
