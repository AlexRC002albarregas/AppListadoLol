document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'RGAPI-5c939060-b4ca-443d-ae1e-0c4c775293ac';
  const url = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json';
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const switchInput = document.getElementById('flexSwitchCheckDefault');
  const championList = document.getElementById('championList');
  let isGrid = true;

  function renderChampions(championsData) {
    championList.innerHTML = '';
    championsData.forEach(champion => {
      const { id, name, title, blurb } = champion;
      const image = `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${id}.png`;

      let item;
      if (isGrid) {
        item = `
          <div class="col-md-3 mb-4">
            <div class="card">
              <img src="${image}" class="card-img-top" alt="${name}">
              <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${title}</h6>
              </div>
              <a href="champion.html?id=${id}" class="stretched-link"></a>
            </div>
          </div>
        `;
      } else {
        item = `
          <div class="list-group-item d-flex align-items-center">
            <img src="${image}" class="img-fluid rounded-start" alt="${name}" style="max-width: 100px;">
            <div class="card-body ml-3">
              <h5 class="card-title">${name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${title}</h6>
              <p class="card-text">${blurb}</p>
              <a href="champion.html?id=${id}" class="stretched-link"></a>
            </div>
          </div>
        `;
      }
      championList.innerHTML += item;
    });

    // Aplicar estilos adicionales según el modo
    if (isGrid) {
      championList.classList.remove('list-group');
      championList.classList.remove('flex-column');
    } else {
      championList.classList.add('list-group');
      championList.classList.add('flex-column');
    }
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const champions = Object.values(data.data);

      // Verificar el estado al cargar la página y ajustar el botón de switch
      switchInput.checked = !isGrid; // Cambiar estado para que coincida con isGrid

      renderChampions(champions);

      searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredChampions = champions.filter(champion => champion.name.toLowerCase().includes(searchTerm));
        renderChampions(filteredChampions);
      });

      // Agregar evento al presionar la tecla "Enter" en el campo de búsqueda
      searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          const searchTerm = searchInput.value.toLowerCase();
          const filteredChampions = champions.filter(champion => champion.name.toLowerCase().includes(searchTerm));
          renderChampions(filteredChampions);
        }
      });

      switchInput.addEventListener('change', function () {
        isGrid = !isGrid;
        renderChampions(champions);
      });
    })
    .catch(error => console.error('Error:', error));
});
