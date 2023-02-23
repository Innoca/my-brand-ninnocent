const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

const blogContainer = document.querySelector(".blog-container");

// Display loading message
blogContainer.innerHTML = "<p>Loading blog...</p>";

// Fetch blog data from API
fetch(`http://localhost:2023/blogs/${blogId}`)
  .then((response) => response.json())
  .then((blogData) => {
    if (blogData.status === "error") {
      blogContainer.innerHTML = `<p>${blogData.message}</p>`;
    } else {
      // Display blog data
      blogContainer.innerHTML = `
        <h1 class="blog-title">${blogData?.data?.blogTitle}</h1>
        <div class="container-img">
          <img src="/UI/IMAGES/pexels-pixabay-163097.jpg" alt="Article Image" width="500">
        </div>
        <p>${blogData?.data?.blogContent}</p>
        <div class="like-btn">
          <button class="like-btn"><span id="count"> 0 Likes</span><span id="icon"><i class="fa fa-thumbs-up" aria-hidden="true"></i></span></button>
        </div>
      `;

      const likeCountSpan = document.querySelector("#count");
      console.log(likeCountSpan);
      // Fetch likes data from API
      fetch(`http://localhost:2023/likes/blogs/${blogId}`)
        .then((response) => response.json())
        .then((likesData) => {
          console.log(likesData);
          if (likesData.count) {
            // Filter likes data for the current user
            const currentUserLikes = likesData.likes.filter(
              (like) => like.created_by === window.location.hostname
            );

            // Update like count
            likeCountSpan.textContent = likesData.count + " Likes";

            // Update like button appearance if the user has liked the blog
            if (currentUserLikes.length > 0) {
              const likeButton = document.querySelector(".like-btn button");
              likeButton.classList.add("liked");
              likeButton.setAttribute("disabled", "true");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  })
  .catch((error) => {
    console.log(error);
    blogContainer.innerHTML =
      "<p>An error occurred while fetching the blog data. Please try again later.</p>";
  });
