document.addEventListener('DOMContentLoaded', () => {
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