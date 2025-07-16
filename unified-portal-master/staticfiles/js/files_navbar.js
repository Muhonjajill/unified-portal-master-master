document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const userProfile = document.getElementById('userProfile');
  const modal = document.getElementById("profileModal");
  const modalContent = document.getElementById("profileModalContent");
  const closeBtn = document.getElementById("closeProfileModal");
  const searchInput = document.getElementById("searchInput");

  // 1. Toggle dropdown
  if (hamburger && userProfile) {
    hamburger.addEventListener('click', () => {
      userProfile.classList.toggle('show-dropdown');
    });

    window.addEventListener('click', function (event) {
      if (!userProfile.contains(event.target) && !hamburger.contains(event.target)) {
        userProfile.classList.remove('show-dropdown');
      }
    });
  }

  // 2. Search filter
  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const filter = searchInput.value.toLowerCase();
      const table = document.querySelector("table");
      if (!table) return;

      const rows = table.querySelectorAll("tbody tr");
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
      });
    });
  }

  // 3. Modal close logic
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// 4. Global function to open modal
window.openProfileModal = function (event) {
  event.preventDefault();
  const modal = document.getElementById("profileModal");
  const modalContent = document.getElementById("profileModalContent");

  modal.style.display = "block";
  modalContent.innerHTML = "Loading...";

  fetch(profileViewUrl, {
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  })
    .then(res => res.text())
    .then(html => {
      modalContent.innerHTML = html;
      setupProfileForm();
    })
    .catch(() => {
      modalContent.innerHTML = "<p>Error loading profile.</p>";
    });
};

// 5. Setup profile form AJAX
function setupProfileForm() {
  const form = document.getElementById('profileForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(profileViewUrl, {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    })
      .then(res => res.text())
      .then(html => {
        document.getElementById("profileModalContent").innerHTML = html;
        setupProfileForm(); 
      });
  });
}