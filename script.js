window.addEventListener('load', function () {
  this.window.scrollTo(0, 0);
})

const line = document.querySelector(".timeline-innerline");
const timeline_events = document.querySelectorAll(".jobs ul li");

let i = 0;
let i2 = 1;
let target1 = document.querySelector(".jobs ul");
let target2 = document.querySelectorAll(".jobs ul li");

function slowLoop() {
  setTimeout(function () {
    showTime(timeline_events[i]);
    timelineProgress(i + 1);
    i++;

    if (i < timeline_events.length) {
      slowLoop();
    }
  }, 800);
}

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0.9) {
      showTime(entry.target);
      timelineProgress(i2);
      i2++;
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 1, rootMargin: "0px 0px -50px 0px" });

target2.forEach(t => {
  observer.observe(t);
});


function showTime(e) {
  e.setAttribute("done", "true");
  e.querySelector(".timeline-point").style.background = "rgb(140, 140, 140)";
  e.querySelector(".details .inner-content").style.opacity = "100%";
}

function hideTime(e) {
  e.removeAttribute("done");
  e.querySelector(".timeline-point").style.background = "rgb(228, 228, 228)";
  e.querySelector(".details .inner-content").style.opacity = "0%";
}

timeline_events.forEach((li, index) => {
  li.addEventListener("click", () => {
    if (li.getAttribute("done")) {
      timelineProgress(index);
      timeline_events.forEach((ev, idx) => {
        if (idx >= index) {
          hideTime(ev);
        }
      });
    } else {
      timelineProgress(index + 1);
      timeline_events.forEach((ev, idx) => {
        if (idx <= index) {
          showTime(ev);
        }
      })
    }
  });
});

function timelineProgress(value) {
  let progress = `${((value) / timeline_events.length) * 100}%`;
  line.style.height = progress;
  line.style.width = "4px";
}

var doit;
window.addEventListener("resize", () => {
  clearTimeout(doit);
  doit = setTimeout(resizeEnd, 1200);
});

function resizeEnd() {
  i = 0;
  slowLoop();
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

document.querySelectorAll(".n-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  console.log("removing menu")
  navMenu.classList.remove("active");
}))

// const firstMedia = window.matchMedia("(max-width: 768px)");

// if (firstMedia.matches) {
//   const svgText = document.querySelector("svg-text");
//   const y = parseFloat(svgText.getAttributeNS(null, 'y'));
//   svgText.setAttributeNS(null, 'y', 100);
// }