const photosList = document.getElementById('photosList');
const albumId = JSON.parse(localStorage.getItem('albumId'));

if (!albumId) {
  window.location.href = '../index.html';
}

fetch(`https://jsonplaceholder.typicode.com/albums?userId=${albumId}`)
  .then(response => response.json()) .then(albums => {
    if (albums.length > 0) {
      return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albums[0].id}`);
    } else {
      console.log('No albums found for this user');
     
    }
  })
  .then(response => response.json())
  .then(photos => {

    const limitedPhotos = photos.slice(0, 20);
    
    limitedPhotos.forEach(photo => {
      const photoCard = document.createElement('div');
      photoCard.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
      
      photoCard.innerHTML = `
        <div class="photo-card card">
          <img src="${photo.thumbnailUrl}" alt="${photo.title}">
          <div class="card-body">
            <p class="card-text">${photo.title}</p>
          </div>
        </div>
      `;
      
      photosList.appendChild(photoCard);
    });
  })
  .catch(error => {
    console.error('Error:', error);
    photosList.innerHTML = '<div class="col-12 text-center text-white"><h3>Error loading photos. Please try again later.</h3></div>';
  });