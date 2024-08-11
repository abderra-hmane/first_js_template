let landing = document.querySelector(".landing");
let spin = document.querySelector(".spin");

let colors = document.querySelectorAll(".setting-box .option-box span");
let bgButtons = document.querySelectorAll(".setting-box .option-box .bg-colors button");
let bulletsButtons = document.querySelectorAll(".setting-box .option-box .bullets-option button");
let resetAll = document.querySelectorAll(".setting-box .reset-options");

let skills = document.querySelector(".skills");
let images = document.querySelectorAll(".gallery .images-box img");
let closebutton = document.querySelector(".close-button");
let bullets = document.querySelectorAll(".nav-bullets .bullet");



let id;
if (localStorage.getItem("color")) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color"));
    RemoveActive(colors);
    colors.forEach(span => {
        if (span.dataset.color === localStorage.getItem("color")) {
            span.classList.add("active");
        }
    });
}
if (localStorage.getItem("bgOption")) {
    RemoveActive(bgButtons);
    bgButtons.forEach(btn => {
        if (btn.dataset.option === localStorage.getItem("bgOption")) {
            btn.classList.add("active");
        }
    });

    if (localStorage.getItem("bgOption") == "yes") {
        id = changeBackground(landing);
    }
    else {
        clearInterval(id);
    }
}
if(localStorage.getItem("bulletOption")) {
    RemoveActive(bulletsButtons);
    bulletsButtons.forEach(btn => {
        if (btn.dataset.display === localStorage.getItem("bulletOption")) {
            btn.classList.add("active");
        }
        if(localStorage.getItem("bulletOption")=="show") document.querySelector(".nav-bullets").style.display = "block";
        
        else document.querySelector(".nav-bullets").style.display = "none";
    });
}

spin.addEventListener("click", () => {
    document.querySelector(".setting-box i").classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
});
window.onscroll = function () {
    let top = skills.offsetTop;
    let height = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    if (this.scrollY > (top + height - windowHeight)) {
        document.querySelectorAll(".skills .content span").forEach(span => {
            span.style.width = span.dataset.progress;
        });
    } else {
        document.querySelectorAll(".skills .content span").forEach(span => {
            span.style.width = 0;
        });
    }
};
// Get references to the popup elements
const popupOverlay = document.querySelector(".popup-overlay");
const popupBox = document.querySelector(".popup-box");
const closeButton = document.querySelector(".close-button");

// Close button event listener
closeButton.addEventListener("click", () => {
    popupOverlay.style.display = "none"; // Hide the overlay
    popupBox.style.display = "none"; // Hide the popup box
});

// Image click event listener to show popup
images.forEach(element => {
    element.addEventListener("click", () => {
        popupOverlay.style.display = "block"; // Show the overlay
        popupBox.style.display = "block"; // Show the popup box

        document.querySelector(".popup-box h3").textContent = element.alt; // Set title
        document.querySelector(".popup-box img").src = element.src; // Set image source
    });
});

// bullets
bullets.forEach(bullet => {
    bullet.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({

            behavior: 'smooth'

        });
    });
});


RemoveActiveClicked(colors);
RemoveActiveClicked(bgButtons);
RemoveActiveClicked(bulletsButtons);
RemoveActiveClicked(resetAll);



function RemoveActiveClicked (elements) {
    elements.forEach(element => {
        element.addEventListener("click", e => {

            RemoveActive(elements);
            e.target.classList.add("active");
            if (e.target.tagName == "SPAN") {
                document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
                localStorage.setItem("color", e.target.dataset.color);
            }
            else if (e.target.parentElement.className == "bg-colors") {
                if (e.target.dataset.option == "yes") {
                    id = changeBackground(landing);
                    localStorage.setItem("bgOption", e.target.dataset.option);
                }
                else {
                    clearInterval(id);
                    localStorage.setItem("bgOption", e.target.dataset.option);
                }
            }
            else if(e.target.parentElement.className == "bullets-option") {
                if (e.target.dataset.display == "show") {
                    document.querySelector(".nav-bullets").style.display = "block";
                    localStorage.setItem("bulletOption", e.target.dataset.display);
                }
                else {
                    document.querySelector(".nav-bullets").style.display = "none";
                    localStorage.setItem("bulletOption", e.target.dataset.display);
                }
            }
            else {
                localStorage.clear();
                window.location.reload();
            }

        });
    });
}

function RemoveActive (elements) {
    elements.forEach(el => {
        el.classList.remove("active");
    });
}

// changeBackground function
function changeBackground (element) {
    let id = setInterval(() => {
        let random = Math.round(Math.random() * 10);
        if (random == 10) element.style.backgroundImage = `url("imgs/10.jpg")`;
        else element.style.backgroundImage = `url("imgs/0${ random == 0 ? random = 1 : random }.jpg")`;
    }, 1000);
    return id;
}
