const postsList = document.getElementById('postsList');
const userId = JSON.parse(localStorage.getItem('userId'));

if (!userId) {
  window.location.href = '../index.html';
}

fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  .then(response => response.json())
  .then(posts => {
    posts.forEach(post => {
      const postItem = document.createElement('div');
      postItem.className = 'post-item';
      
      postItem.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button class="btn btn-outline-primary mb-3" onclick="toggleComments(${post.id}, this)">Show Comments</button>
        <div id="comments-${post.id}" class="comments-container" style="display: none;"></div>
      `;
      
      postsList.appendChild(postItem);
    });
  })
  .catch(error => {
    console.error('Error fetching posts:', error);
    postsList.innerHTML = '<div class="text-center text-white"><h3>Error loading posts. Please try again later.</h3></div>';
  });

