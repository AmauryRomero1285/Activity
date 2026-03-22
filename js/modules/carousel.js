async function createPokemonElement(pokemonId, isFirst = false) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await res.json();
    
    const resSpecie = await fetch(data.species.url);
    const specieData = await resSpecie.json();

    const description = specieData.flavor_text_entries.find(e => e.language.name === "es")?.flavor_text || "Sin descripción.";
    const types = data.types.map(t => `<span class="type-badge ${t.type.name}">${t.type.name}</span>`).join("");
    const abilities = data.abilities.map(a => a.ability.name).join(" / ");

    const section = document.createElement("section");
    section.className = "carousel-item";
    section.style.display = isFirst ? "flex" : "none";

    section.innerHTML = `    
      <div class="image-wrapper">
        <span class="bg-number">#${data.id}</span>
        <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}" />
      </div>
      <div class="info">
        <div class="info-header">
          <h1>${data.name.toUpperCase()}</h1>
          <span class="id-number">${data.id}</span>
        </div>
        <div class="stats-row"><strong>Tipo: </strong><div class="types-container">${types}</div></div>
        <div class="stats-row"><strong>Habilidades: </strong><span class="ability-text">${abilities}</span></div>
        <p class="description">${description.replace(/[\n\f]/g, " ")}</p>
      </div>`;
    return section;
  } catch (e) { return null; }
}

export async function initCarousel(containerId, pokemonList) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  // Pausa simple con clic
  container.addEventListener("click", () => {
    container.classList.toggle("paused");
  });

  for (const [index, pokemon] of pokemonList.entries()) {
    const section = await createPokemonElement(pokemon.id, index === 0);
    if (section) container.appendChild(section);
  }

  startAutoCycle(container);
}

function startAutoCycle(container) {
  let currentIndex = 0;
  setInterval(() => {
    const items = container.querySelectorAll(".carousel-item");
    if (items.length > 0 && !container.classList.contains("paused")) {
      items[currentIndex].style.display = "none";
      currentIndex = (currentIndex + 1) % items.length;
      items[currentIndex].style.display = "flex";
    }
  }, 5000);
}
