document.addEventListener('DOMContentLoaded', function(){

    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
  
    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener('click', function() {
        searchBar.style.visibility = 'visible';
        searchBar.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
        searchInput.focus();
      });
    }
  
    searchClose.addEventListener('click', function() {
      searchBar.style.visibility = 'hidden';
      searchBar.classList.remove('open');
      this.setAttribute('aria-expanded', 'false');
    });
  
  
  });

  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    // Header Animation
    gsap.from(".header", {
      duration: 1,
      y: -100,
      opacity: 0,
      ease: "bounce"
    });

    // Hero Image Animation
    gsap.from(".hero-image", {
      duration: 0.8,
      scale: 0.8,
      opacity: 0,
      ease: "Slowmo",
      delay: 0.5
    });

    // Article List Items Animation
    gsap.from(".article-ul li", {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      delay: 1
    });

    // Footer Animation
    gsap.from(".footer", {
      duration: 1,
      y: 100,
      opacity: 0,
      ease: "power2.out",
      delay: 1.5
    });

    // Search Bar Animation
    const searchBar = document.querySelector(".searchBar");
    const searchBarButton = document.querySelector("#searchButton");
    const searchBarClose = document.querySelector("#searchClose");

    searchBarButton.addEventListener("click", () => {
      gsap.to(searchBar, {
        duration: 0.3,
        y: 0,
        visibility: "visible"
      });
    });

    searchBarClose.addEventListener("click", () => {
      gsap.to(searchBar, {
        duration: 0.3,
        y: -100,
        onComplete: () => {
          searchBar.style.visibility = "hidden";
        }
      });
    });
  });

