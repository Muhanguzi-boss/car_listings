// Redirect to login if not authenticated
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

const grid = document.getElementById("grid");
const template = document.getElementById("card-template");

// Desktop elements
const searchInput = document.getElementById("search");
const typeFilter = document.getElementById("typeFilter");
const addCarBtn = document.getElementById("addCarBtn");

// Mobile elements
const searchMobile = document.getElementById("searchMobile");
const typeFilterMobile = document.getElementById("typeFilterMobile");
const addCarBtnMobile = document.getElementById("addCarBtnMobile");

// Modal elements
const modal = document.getElementById("modal");
const carForm = document.getElementById("carForm");
const cancelBtn = document.getElementById("cancelBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

async function fetchCars() {
  const searchValue = searchInput?.value || searchMobile?.value || "";
  const typeValue = typeFilter?.value || typeFilterMobile?.value || "";

  const q = encodeURIComponent(searchValue);
  const type = encodeURIComponent(typeValue);
  const query = new URLSearchParams();
  if (q) query.set("q", q);
  if (type) query.set("type", type);

  const res = await fetch("/api/cars?" + query.toString());
  return res.json();
}

function renderCars(cars) {
  grid.innerHTML = "";
  if (!cars.length) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-16">
        <div class="text-6xl mb-4">🚗</div>
        <p class="text-gray-500 text-lg">No cars found.</p>
        <p class="text-gray-400 text-sm mt-2">Try adjusting your filters or add a new car!</p>
      </div>
    `;
    return;
  }

  cars.forEach((car) => {
    const node = template.content.cloneNode(true);
    const img = node.querySelector("img");
    const title = node.querySelector("h2");
    const brandInfo = node.querySelector(".brand-info");
    const typeBadge = node.querySelector(".type-badge");
    const priceText = node.querySelector(".price-text");
    const viewBtn = node.querySelector(".view-btn");
    const delBtn = node.querySelector(".delete-btn");

    img.src =
      car.imgUrl ||
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop";
    img.alt = car.title;
    title.textContent = car.title;

    // Build brand info with icons
    const brandParts = [];
    if (car.brand) brandParts.push(`${car.brand}`);
    if (car.fuel) brandParts.push(`⛽ ${car.fuel}`);
    if (car.seats) brandParts.push(`👥 ${car.seats} seats`);
    brandInfo.textContent = brandParts.join(" • ");

    typeBadge.textContent = car.type || "Car";
    priceText.textContent = `$${car.pricePerDay || "N/A"}`;

    // View button - show detailed modal
    viewBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showCarDetails(car);
    });

    // Delete button
    delBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!confirm(`Delete ${car.title}?`)) return;

      try {
        const res = await fetch("/api/cars/" + car._id, { method: "DELETE" });
        if (res.ok) {
          // Fade out animation before removing
          const cardElement = delBtn.closest(".bg-white");
          cardElement.style.opacity = "0";
          cardElement.style.transform = "scale(0.9)";
          setTimeout(() => load(), 300);
        } else {
          alert("Failed to delete car");
        }
      } catch (err) {
        alert("Error: " + err.message);
      }
    });

    grid.appendChild(node);
  });
}

function showCarDetails(car) {
  const details = `
🚗 ${car.title}

📋 Details:
• Brand: ${car.brand || "N/A"}
• Type: ${car.type || "N/A"}
• Fuel: ${car.fuel || "N/A"}
• Seats: ${car.seats || "N/A"}

💰 Price: $${car.pricePerDay || "N/A"}/day
  `.trim();

  alert(details);
}

async function load() {
  try {
    const cars = await fetchCars();
    renderCars(cars);
  } catch (err) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-16">
        <div class="text-6xl mb-4">⚠️</div>
        <p class="text-red-500 text-lg">Failed to load cars</p>
        <p class="text-gray-400 text-sm mt-2">${err.message}</p>
      </div>
    `;
  }
}

// Open modal functions
function openModal() {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
  carForm.reset();
}

// Event listeners for opening modal
if (addCarBtn) addCarBtn.addEventListener("click", openModal);
if (addCarBtnMobile) addCarBtnMobile.addEventListener("click", openModal);

// Event listeners for closing modal
if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

// Close modal on background click
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Form submission
carForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(carForm);
  const carData = {};

  formData.forEach((value, key) => {
    if (value) {
      carData[key] = value;
    }
  });

  // Convert number fields
  if (carData.seats) carData.seats = parseInt(carData.seats);
  if (carData.pricePerDay)
    carData.pricePerDay = parseFloat(carData.pricePerDay);

  // Disable submit button to prevent double submission
  const submitBtn = carForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Adding...";

  try {
    const res = await fetch("/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });

    if (res.ok) {
      closeModal();
      load();
      // Show success message
      showNotification("Car added successfully! 🎉", "success");
    } else {
      const error = await res.json();
      showNotification(
        "Failed to add car: " + (error.error || "Unknown error"),
        "error"
      );
    }
  } catch (err) {
    showNotification("Error: " + err.message, "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

// Simple notification function
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-medium z-50 fade-in ${
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500"
  }`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(-10px)";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Sync search inputs (desktop and mobile)
if (searchInput && searchMobile) {
  searchInput.addEventListener("input", () => {
    searchMobile.value = searchInput.value;
    load();
  });
  searchMobile.addEventListener("input", () => {
    searchInput.value = searchMobile.value;
    load();
  });
}

// Sync type filters (desktop and mobile)
if (typeFilter && typeFilterMobile) {
  typeFilter.addEventListener("change", () => {
    typeFilterMobile.value = typeFilter.value;
    load();
  });
  typeFilterMobile.addEventListener("change", () => {
    typeFilter.value = typeFilterMobile.value;
    load();
  });
}

// Initial load
load();
