fetch("http://localhost:2023/blogs")
  .then((response) => response.json())
  .then(({ blogs }) => {
    const blogPostsContainer = document.getElementById("blog-posts-container");

    blogs.forEach((blogPost) => {
      const link = document.createElement("a");
      link.href = `/UI/Blog Details/blog_details.html?id=${blogPost._id}`;

      const container = document.createElement("div");
      container.classList.add("container-summary");

      const title = document.createElement("h1");
      title.textContent = blogPost.blogTitle;
      container.appendChild(title);

      const category = document.createElement("h3");
      category.textContent = blogPost.category;
      container.appendChild(category);

      const content = document.createElement("p");
      content.textContent = blogPost.blogContent;
      container.appendChild(content);

      const image = document.createElement("img");
      image.src = "/UI/IMAGES/pexels-pixabay-163097.jpg";
      image.alt = blogPost.blogTitle;
      image.width = "300";
      container.appendChild(image);

      link.appendChild(container);

      blogPostsContainer.appendChild(link);
    });
  })
  .catch((error) => {
    console.error(error);
  });
