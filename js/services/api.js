export const getData = async (offset, limit) => {  
  const url = `https://pokeapi.co/api/v2/pokemon-species?offset=${offset}&limit=${limit}`


  try {
    const res = await fetch(url);
    const data = await res.json();

    // Retorna la lista completa sin filtrar evoluciones
    return data.results.map((p) => ({
      id: p.url.split("/").filter(Boolean).pop(),
      name: p.name
    }));
  } catch (error) {
    console.error("Error en API:", error);
    return [];
  }
};
