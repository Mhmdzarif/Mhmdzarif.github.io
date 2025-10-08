document.addEventListener("scroll", () => {
  document.querySelectorAll(".section").forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) sec.classList.add("visible");
  });
});

