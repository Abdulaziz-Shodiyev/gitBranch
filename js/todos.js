const todosList = document.getElementById('todosList');
const userId = JSON.parse(localStorage.getItem('userId'));

if (!userId) {
  window.location.href = '../index.html';
}

fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
  .then(response => response.json())
  .then(todos => {
    todos.forEach(todo => {
      const todoItem = document.createElement('div');
      todoItem.className = 'todo-item';
      

      const statusIcon = todo.completed 
        ? '<span class="check-icon">✓</span>' 
        : '<span class="close-btn">✕</span>';
      
      todoItem.innerHTML = `
        <div>
          <h5><b>Title:</b> ${todo.title}</h5>
          <p><b>Completed:</b></p>
          ${statusIcon}
          <a href="albums.html" onclick="saveAlbumId(${userId})" class="btn btn-albums mt-2">Albums</a>
        </div>
      `;
      
      todosList.appendChild(todoItem);
    });
  })
  .catch(error => {
    console.error('Error fetching todos:', error);
    todosList.innerHTML = '<div class="text-center text-white"><h3>Error loading todos. Please try again later.</h3></div>';
  });

function saveAlbumId(userId) {
  localStorage.setItem('userId', JSON.stringify(userId));
}