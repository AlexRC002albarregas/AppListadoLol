const urlParams = new URLSearchParams(window.location.search);
const championId = urlParams.get('id');
const apiKey = 'RGAPI-5c939060-b4ca-443d-ae1e-0c4c775293ac';

// Realiza una solicitud a la API de Riot Games para obtener los detalles del campeón con el ID proporcionado
const championDetailsUrl = `https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion/${championId}.json`;

fetch(championDetailsUrl)
  .then(response => response.json())
  .then(data => {
    const championDetails = document.getElementById('championDetails');
    const champion = data.data[championId];

    // Establecer el splash art del campeón como fondo de página
    document.body.style.backgroundImage = `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed'; // Asegura que la imagen de fondo no se desplace con el contenido

    // Crear el contenedor de detalles del campeón
    const championContainer = document.createElement('div');
    championContainer.classList.add('row');

    // Crear la tarjeta blanca para los detalles del campeón
    const championCard = document.createElement('div');
    championCard.classList.add('card', 'bg-light', 'text-center', 'col-md-6');

    // Crear la imagen del campeón (icono) y agregarla a la tarjeta
    const championIcon = document.createElement('img');
    championIcon.classList.add('card-img-top', 'img-fluid', 'rounded-circle', 'mx-auto', 'mt-3');
    championIcon.src = `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${championId}.png`;
    championIcon.alt = champion.name;
    championIcon.style.maxWidth = '150px';
    championCard.appendChild(championIcon);

    // Crear los detalles del campeón en la tarjeta blanca
    const championCardBody = document.createElement('div');
    championCardBody.classList.add('card-body');
    championCardBody.innerHTML = `
      <h1 class="card-title">${champion.name}</h1>
      <h3 class="card-subtitle mb-2 text-muted">${champion.title}</h3>
      <p class="card-text">${champion.blurb}</p>
      <p class="card-text"><b>Champion Type: </b>${champion.tags.join(', ')}</p>
    `;
    championCard.appendChild(championCardBody);

    // Agregar la tarjeta de campeón al contenedor
    championContainer.appendChild(championCard);

    // Crear el contenedor de la gráfica de estadísticas
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('col-md-6', 'text-center');

    // Crear la gráfica de Chart.js con las estadísticas del campeón
    const statsChart = document.createElement('canvas');
    statsChart.setAttribute('id', 'statsChart');
    statsChart.style.width = '200px'; // Reducir el tamaño del gráfico

    statsContainer.appendChild(statsChart);

    const statsLabels = Object.keys(champion.info);
    const statsValues = Object.values(champion.info);

    new Chart(statsChart, {
      type: 'doughnut',
      data: {
        labels: statsLabels,
        datasets: [{
          label: 'Estadísticas',
          data: statsValues,
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        },
        color: 'white',
      }
    });

    // Agregar el contenedor de la gráfica de estadísticas al contenedor principal
    championContainer.appendChild(statsContainer);

    // Crear una nueva tarjeta para las estadísticas base
    const baseStatsCard = document.createElement('div');
    baseStatsCard.classList.add('card', 'bg-light', 'text-center', 'col-md-6', 'mx-auto', 'mt-3');

    // Crear el cuerpo de la tarjeta para las estadísticas base
    const baseStatsCardBody = document.createElement('div');
    baseStatsCardBody.classList.add('card-body');

    // Crear una lista para las estadísticas base
    const baseStatsList = document.createElement('ul');
    baseStatsList.classList.add('list-group', 'list-group-flush');
    baseStatsList.innerHTML = `
      <li class="list-group-item no-hover"><b>Base Stats</b></li>
      <li class="list-group-item">HP: ${champion.stats.hp}</li>
      <li class="list-group-item">Movespeed: ${champion.stats.movespeed}</li>
      <li class="list-group-item">Armor: ${champion.stats.armor}</li>
      <li class="list-group-item">Attack Range: ${champion.stats.attackrange}</li>
      <li class="list-group-item">Attack Damage: ${champion.stats.attackdamage}</li>
    `;

    // Agregar efecto de hover a cada elemento de la lista, excepto al encabezado "Base Stats"
    const baseStatsItems = baseStatsList.querySelectorAll('.list-group-item:not(.no-hover)');
    baseStatsItems.forEach(item => {
      item.classList.add('base-stat-item');
    });

    baseStatsCardBody.appendChild(baseStatsList);
    baseStatsCard.appendChild(baseStatsCardBody);

    // Agregar la tarjeta de estadísticas base al contenedor
    championContainer.appendChild(baseStatsCard);

    // Agregar el contenedor principal al documento
    championDetails.appendChild(championContainer);
  })
  .catch(error => console.error('Error:', error));
