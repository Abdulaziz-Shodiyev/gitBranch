const albumsList = document.getElementById('albumsList');
const userId = JSON.parse(localStorage.getItem('userId'));

if (!userId) {
  window.location.href = '../index.html';
}

fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
  .then(response => response.json())
  .then(albums => {
    albums.forEach(album => {
      const albumItem = document.createElement('div');
      albumItem.className = 'album-item';
      
      albumItem.innerHTML = `
        <h3>${album.title}</h3>
        <button class="btn btn-primary mt-2" onclick="viewPhotos(${album.id})">View Photos</button>
      `;
      
      albumsList.appendChild(albumItem);
    });
  })
  .catch(error => {
    console.error('Error fetching albums:', error);
    albumsList.innerHTML = '<div class="text-center text-white"><h3>Error loading albums. Please try again later.</h3></div>';
  });

function viewPhotos(albumId) {
  localStorage.setItem('albumId', JSON.stringify(albumId));
  window.location.href = 'photos.html';
}