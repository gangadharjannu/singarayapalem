// We select the element we want to target
var target = document.querySelector("#header");

var scrollToTopBtn = document.querySelector(".scroll-to-top");
var rootElement = document.documentElement;

// Next we want to create a function that will be called when that element is intersected
function callback(entries, observer) {
  // The callback will return an array of entries, even if you are only observing a single item
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Hide button
      scrollToTopBtn.classList.remove("show-scroll-to-top");
    } else {
      // Show button
      scrollToTopBtn.classList.add("show-scroll-to-top");
    }
  });
}

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);

// Next we instantiate the observer with the function we created above. This takes an optional configuration
// object that we will use in the other examples.
let observer = new IntersectionObserver(callback);
// Finally start observing the target element
observer.observe(target);
