function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  
    document.getElementById("theme-toggle-light").classList.toggle("hidden", theme === "dark");
    document.getElementById("theme-toggle-dark").classList.toggle("hidden", theme === "light");
  }
  
  function toggleTheme() {
    const current = localStorage.getItem("theme") || 
                    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(current === "dark" ? "light" : "dark");
  }
  
  (function () {
    // Set initial theme
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(saved || (prefersDark ? "dark" : "light"));
  
    // Add event listener
    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  })();