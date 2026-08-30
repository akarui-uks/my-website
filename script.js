document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive Like Button
  const likeBtn = document.getElementById('like-btn');
  const likeCount = document.getElementById('like-count');
  let isLiked = false;
  let currentLikes = 1248;

  if (likeBtn && likeCount) {
    likeBtn.addEventListener('click', () => {
      isLiked = !isLiked;
      if (isLiked) {
        likeBtn.classList.add('liked');
        currentLikes += 1;
      } else {
        likeBtn.classList.remove('liked');
        currentLikes -= 1;
      }
      likeCount.textContent = currentLikes.toLocaleString();
    });
  }

  // 2. Comments System
  const commentForm = document.getElementById('comment-form');
  const commentList = document.getElementById('comments-list');
  const commentUser = document.getElementById('comment-user');
  const commentText = document.getElementById('comment-text');
  const focusCommentBtn = document.getElementById('focus-comment-btn');

  // Load saved comments from localStorage
  const savedComments = JSON.parse(localStorage.getItem('post_comments') || '[]');

  function renderComment(user, text) {
    const item = document.createElement('div');
    item.className = 'comment-item';
    
    const authorSpan = document.createElement('span');
    authorSpan.className = 'comment-author';
    authorSpan.textContent = user;

    const textSpan = document.createElement('span');
    textSpan.className = 'comment-text';
    textSpan.textContent = text;

    item.appendChild(authorSpan);
    item.appendChild(textSpan);
    commentList.appendChild(item);
  }

  // Render stored comments on load
  savedComments.forEach(c => renderComment(c.user, c.text));

  // Handle new comment submission
  if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = commentUser.value.trim();
      const text = commentText.value.trim();

      if (user && text) {
        renderComment(user, text);
        savedComments.push({ user, text });
        localStorage.setItem('post_comments', JSON.stringify(savedComments));

        commentText.value = '';
        commentList.scrollTop = commentList.scrollHeight;
      }
    });
  }

  // Focus input when clicking the speech bubble icon
  if (focusCommentBtn && commentText) {
    focusCommentBtn.addEventListener('click', () => {
      commentText.focus();
    });
  }

  // 3. Smooth scrolling for nav links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});