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
        championContainer.classList.add('col-md-6', 'order-md-1', 'order-sm-2', 'order-lg-1');

        // Crear la tarjeta blanca para los detalles del campeón
        const championCard = document.createElement('div');
        championCard.classList.add('card', 'bg-light', 'text-center');

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
          <p class="card-text">Champion Type: ${champion.tags.join(', ')}</p>
        `;
        championCard.appendChild(championCardBody);

        championContainer.appendChild(championCard);
        championDetails.appendChild(championContainer);

        // Crear el contenedor de la gráfica de estadísticas
        const statsContainer = document.createElement('div');
        statsContainer.classList.add('col-md-5', 'order-md-2', 'order-sm-1', 'order-lg-2', 'text-center');

        // Crear la gráfica de Chart.js con las estadísticas del campeón
        const statsChart = document.createElement('canvas');
        statsChart.setAttribute('id', 'statsChart');
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

        championDetails.appendChild(statsContainer);
      })
      .catch(error => console.error('Error:', error));

