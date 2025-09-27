// Mobile menu toggle
const mobileMenu = document.getElementById("mobileMenu")
const navLinks = document.getElementById("navLinks")

if (mobileMenu && navLinks) {
  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active")
  })
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    if (navLinks) {
      navLinks.classList.remove("active")
    }
  })
})

let currentSlide = 0
const slides = document.querySelectorAll(".slide")
const totalSlides = slides.length
const heroTitle = document.getElementById("heroTitle")
const heroSubtitle = document.getElementById("heroSubtitle")

function updateHeroText() {
  if (slides.length > 0 && heroTitle && heroSubtitle) {
    const activeSlide = slides[currentSlide]
    const title = activeSlide.getAttribute("data-title")
    const subtitle = activeSlide.getAttribute("data-subtitle")

    if (title && subtitle) {
      // Add fade out effect
      heroTitle.style.opacity = "0"
      heroSubtitle.style.opacity = "0"

      setTimeout(() => {
        heroTitle.textContent = title
        heroSubtitle.textContent = subtitle

        // Add fade in effect
        heroTitle.style.opacity = "1"
        heroSubtitle.style.opacity = "1"
      }, 300)
    }
  }
}

function nextSlide() {
  if (slides.length > 0) {
    slides[currentSlide].classList.remove("active")
    currentSlide = (currentSlide + 1) % totalSlides
    slides[currentSlide].classList.add("active")

    updateHeroText()
  }
}

// Auto-advance hero slides every 5 seconds
if (slides.length > 0) {
  // Initialize first slide text
  updateHeroText()
  setInterval(nextSlide, 5000)
}

// Services background slider code removed

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el)
})

// Initial hero animation
window.addEventListener("load", () => {
  setTimeout(() => {
    const heroFadeIn = document.querySelector(".hero .fade-in")
    if (heroFadeIn) {
      heroFadeIn.classList.add("visible")
    }
  }, 300)

  // Load saved images
  loadSavedImages()
})

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent.replace(/[^\d]/g, ""))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current) + "+"
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target + "+"
      }
    }

    // Start animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter()
          statsObserver.unobserve(entry.target)
        }
      })
    })

    statsObserver.observe(counter)
  })
}

// Initialize counter animation
animateCounters()

// Simplified image upload function that works with HTML img elements
function handleImageUpload(input, targetImgId) {
  const file = input.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const targetImg = document.getElementById(targetImgId)
      if (targetImg) {
        targetImg.src = e.target.result
        targetImg.alt = `Uploaded ${targetImgId}`

        // Save to localStorage for persistence
        localStorage.setItem(targetImgId, e.target.result)
      }
    }
    reader.readAsDataURL(file)
  }
}

// Toggle upload panel visibility
function toggleUploadPanel() {
  const panel = document.getElementById("imageUploadPanel")
  panel.classList.toggle("active")
}

// Load saved images on page load
function loadSavedImages() {
  // List of all image IDs to check for saved images
  const imageIds = [
    "heroImg1",
    "heroImg2",
    "heroImg3",
    "serviceImg1",
    "serviceImg2",
    "serviceImg3",
    "serviceImg4",
    "serviceImg5",
    "serviceImg6",
  ]

  imageIds.forEach((imageId) => {
    const savedImage = localStorage.getItem(imageId)
    if (savedImage) {
      const imgElement = document.getElementById(imageId)
      if (imgElement) {
        imgElement.src = savedImage
        imgElement.alt = `Uploaded ${imageId}`
      }
    }
  })
}
