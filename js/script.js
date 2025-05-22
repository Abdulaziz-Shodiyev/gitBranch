const userCards = document.getElementById('userCards');

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'col-12 col-md-6 col-lg-4';
      card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><b>Name:</b> ${user.name}</h5>
            <h6 class="card-title"><b>User Name:</b> ${user.username}</h6>
            <p class="card-title"><b>Email:</b> ${user.email}</p>
            <p class="card-text"><b>Address:</b> ${user.address.city} ${user.address.street}</p>
            <div class="d-flex align-items-center justify-content-center gap-3">
              <a onclick="saveId(${user.id}, 'Todos')" href="./pages/todos.html" class="btn btn-danger">Todos</a>
              <a onclick="postId(${user.id}, 'Posts')" href="./pages/posts.html" class="btn btn-success">Posts</a>
              <a onclick="photosId(${user.id}, 'Photos')" href="./pages/photos.html" class="btn btn-primary">Photos</a>
            </div>
          </div>
        </div>
      `;
      userCards.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching users:', error);
    userCards.innerHTML = '<div class="col-12 text-center text-white"><h3>Error loading users. Please try again later.</h3></div>';
  });

function saveId(id, point = "Todos") {
  localStorage.setItem("userId", JSON.stringify(id));
  localStorage.setItem("point", JSON.stringify(point));
}

function postId(id, pos = "Posts") {
  localStorage.setItem("userId", JSON.stringify(id));
  localStorage.setItem("Posts", JSON.stringify(pos));
}

function photosId(id, photo = "Photos") {
  localStorage.setItem("albumId", JSON.stringify(id));
  localStorage.setItem("Photos", JSON.stringify(photo));
}