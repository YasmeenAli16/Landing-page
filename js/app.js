/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

// select all of sections
const sections =document.querySelectorAll("section");
// select the id of ul
const navbar = document.getElementById("navbar__list");



/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function createLink(navLink, sectionId) {
  // create a link
  const sectionLink = `<li><a href="#${sectionId}" class="menu__link">${navLink}</a></li>`;
  // add it to the nav
  navbar.insertAdjacentHTML("beforeend", sectionLink);
  // add event upon click link
    navbar.addEventListener("click", function(elem) {
      elem.preventDefault();
      // getting the clicked link
      const link = document.querySelector(
        `section[id = ${elem.target.getAttribute("href").slice(1)}]`
      );
      // Scroll to section
      scroll(link);
    
  });
}

function viewport(elem) {
  const port = elem.getBoundingClientRect();
  // return true if the element top is near the top of the viewport
  return (port.top >= 0 && port.top < 300);
}

function getDimension(elem) {
  // get the dimensions of section from the viewport
  const view = elem.getBoundingClientRect();
  // return section absolute top position
  return {
    top: view.top + window.pageYOffset
  };
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNav(sections) {
  for (const section of sections) {
    let navLink = section.getAttribute("data-nav");
    let sectionId = section.getAttribute("id");
    createLink(navLink, sectionId);
  }
}
  buildNav(sections);

// Add class 'active' to section when near top of viewport
function active(sections) {
  for (const section of sections) {
    const activeLink = document.querySelector(
      `a[href="#${section.getAttribute("id")}"]`
    );
    // if the current section is near top of viewport
    if (viewport(section)) {
      // if it is, add active styles
      section.classList.add("your-active-class");
      activeLink.classList.add("menu__link--active");
    } else {
      // if it is not, remove active styles
      section.classList.remove("your-active-class");
      activeLink.classList.remove("menu__link--active");
    }
  }
}
 // event upon scrolling
    window.addEventListener("scroll", function() {
    	// Set sections as active
      active(sections); 
    })


// Scroll to section anchor ID using smooth scrollTO event
function scroll(elem) {
  window.scrollTo({
    top: getDimension(elem).top - navbar.offsetHeight,
    behavior: "smooth"});
}


