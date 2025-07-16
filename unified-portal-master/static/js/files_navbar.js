document.addEventListener("DOMContentLoaded", function () {
  const userProfile = document.getElementById('userProfile');
  if (userProfile) {
    userProfile.addEventListener('click', function (e) {
      this.classList.toggle('active');
      e.stopPropagation();
    });

    window.addEventListener('click', function (e) {
      if (!userProfile.contains(e.target)) {
        userProfile.classList.remove('active');
      }
    });
  }

  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      document.getElementById('sidebar')?.classList.toggle('active');
    });
  }
});

function filterTable() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const rows = document.querySelectorAll(".version-table tbody tr");

  rows.forEach(row => {
    const rowText = row.textContent.toLowerCase();
    row.style.display = rowText.includes(filter) ? "" : "none";
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('navbarSearchInput');

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query !== '') {
        window.location.href = `/search/?q=${encodeURIComponent(query)}`;
      }
    }
  });
});
