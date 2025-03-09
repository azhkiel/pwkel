document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector("[data-collapse-toggle='mobile-menu-2']");
    const menu = document.getElementById("mobile-menu-2");

    toggleButton.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });
});

// Simulasi database akun

// Toggle password visibility
document.getElementById("togglePassword").addEventListener("click", function() {
    let passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.innerHTML = `<svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>
`; // Ganti ikon jadi mata tertutup
    } else {
        passwordInput.type = "password";
        this.innerHTML = `<svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
  <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>
`; // Ganti ikon jadi mata terbuka
    }
});



const users = [
    { email: "resti@email.com", password: "resti123" },
    { email: "afrida@email.com", password: "afrida123" },
    { email: "azriel@email.com", password: "azriel123" },
    { email: "asep@email.com", password: "asep123" }
];
// Fungsi login
document.getElementById("loginBtn").addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let errorModal = document.getElementById("errorModal");
    let closeModal = document.getElementById("closeModal");

    // Cek apakah email dan password cocok dengan database
    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert("Login berhasil!"); // Redirect bisa ditambahkan di sini
        window.location.href = "dasboard.html"; // Redirect setelah login berhasil
    } else {
        errorModal.classList.remove("hidden");
    }
    closeModal.addEventListener("click", function () {
        errorModal.classList.add("hidden");
    });
});
