document.addEventListener("DOMContentLoaded", function() {
  let currentPage = 1;
  const cardsPerPage = 25;
  const container = document.getElementById('doctor-container');
  const nextButton = document.getElementById('next-button');
  const prevButton = document.getElementById('prev-button');

  function updateButtons(totalPages) {
    nextButton.style.display = currentPage < totalPages ? 'inline-block' : 'none';
    prevButton.style.display = currentPage > 1 ? 'inline-block' : 'none';
  }

  function loadCards(page) {
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    fetch('images.json')
      .then(response => response.json())
      .then(data => {
        container.innerHTML = '';
        const pageData = data.slice(start, end);

        pageData.forEach(doctor => {
          const card = document.createElement('div');
          card.className = 'doctor-card';

          const img = new Image();
          img.src = doctor.image;
          img.alt = doctor.name;
          card.appendChild(img);

          const name = document.createElement('h3');
          name.textContent = doctor.name;
          card.appendChild(name);

          const specialty = document.createElement('p');
          specialty.textContent = doctor.specialty;
          card.appendChild(specialty);

          container.appendChild(card);
        });

        // Calculate the total number of pages
        const totalPages = Math.ceil(data.length / cardsPerPage);
        updateButtons(totalPages);
      })
      .catch(error => {
        console.error('Error loading doctors:', error);
      });
  }

  // Load the first page of cards
  loadCards(currentPage);

  // Add event listener for the "Next" button
  nextButton.addEventListener('click', () => {
    currentPage++;
    loadCards(currentPage);
  });

  // Add event listener for the "Previous" button
  prevButton.addEventListener('click', () => {
    currentPage--;
    loadCards(currentPage);
  });
});
