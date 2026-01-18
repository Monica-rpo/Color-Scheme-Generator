function renderScheme(seedColor, mode) {
  const schemeArea = document.getElementById("colors-area");
  schemeArea.innerHTML = "";
  const cleanHex = seedColor.replace("#", "");
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${cleanHex}&mode=${mode}&count=5`,
  )
    .then((res) => {
      if (!res.ok) throw new Error("API error");
      return res.json();
    })
    .then((data) => {
      console.log(data.colors[0].hex.value);

      data.colors.forEach((color) => {
        schemeArea.innerHTML += `
      <li class="color-section" style="--color: ${color.hex.value}" data-hex=${color.hex.value}>
      <span class="color-code">${color.hex.value}</span>
      </li>
      `;
      });
    })
    .catch((err) => {
      schemeArea.innerHTML = "<li>Something went wrong</li>";
      console.error(err);
    });
}

document.getElementById("color-form").addEventListener("submit", (event) => {
  event.preventDefault();
  renderScheme(
    document.getElementById("seed-color").value,
    document.getElementById("scheme-mode").value,
  );
});

document.getElementById("colors-area").addEventListener("click", (event) => {
  const swatch = event.target.closest(".color-section");
  if (!swatch) return;

  const hex = swatch.dataset.hex;

  navigator.clipboard.writeText(hex).then(() => {
    console.log(`${hex} copied`);
    swatch.classList.add("copied");

    setTimeout(() => {
      swatch.classList.remove("copied");
    }, 800);
  });
});
