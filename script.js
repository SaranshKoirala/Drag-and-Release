const container = document.getElementById("container");
const posts = document.querySelectorAll(".post");

let isDragging = false;
let startY = 0; // Initial mouse Y position
let scrollStart = 0; // Initial scroll position

// Highlight the focused post
const highlightFocusedPost = () => {
  const containerRect = container.getBoundingClientRect();
  const containerCenter = containerRect.top + containerRect.height / 2;

  posts.forEach((post) => {
    const postRect = post.getBoundingClientRect();
    const postCenter = postRect.top + postRect.height / 2;
    const distance = Math.abs(containerCenter - postCenter);

    if (distance < postRect.height / 2) {
      post.classList.add("focused");
    } else {
      post.classList.remove("focused");
    }
  });
};

// Handle mouse down event
container.addEventListener("mousedown", (e) => {
  isDragging = true;
  startY = e.clientY; // Capture the Y position of the mouse
  scrollStart = container.scrollTop; // Capture the initial scroll position
  container.style.cursor = "grabbing"; // Change cursor
});

// Handle mouse move event
container.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const diffY = startY - e.clientY; // Calculate vertical drag distance
  container.scrollTop = scrollStart + diffY; // Adjust scroll position
  highlightFocusedPost(); // Update the focused post dynamically
});

// Handle mouse up event
container.addEventListener("mouseup", () => {
  isDragging = false; // Stop dragging
  container.style.cursor = "default"; // Reset cursor
  highlightFocusedPost(); // Ensure the correct post is focused after release
});

// Handle mouse leave (stop dragging when cursor leaves the container)
container.addEventListener("mouseleave", () => {
  isDragging = false;
  container.style.cursor = "default";
});

// Update focus when scrolling manually
container.addEventListener("scroll", highlightFocusedPost);

// Initialize focus on page load
highlightFocusedPost();
