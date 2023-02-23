import BlogComment from "../models/Comments";
import Blog from "../models/Blog";
const mongoose = require("mongoose");

export function blogComment_get_all(res) {
  BlogComment.find()
    .select("blogTitle blogContent _id blogImage")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        blogs: docs.map((doc) => {
          return {
            blogTitle: doc.blogTitle,
            blogContent: doc.blogContent,
            blogImage: doc.blogImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:2023/blogs/" + doc._id,
            },
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
}

export async function add_blogComment(req, res) {
  const blog = await Blog.findById(req.body.blogId);
  if (!blog) {
    return res.status(404).json({
      message: "Not Found",
    });
  }

  try {
    const blogComment = new BlogComment({
      _id: mongoose.Types.ObjectId(),
      blogComment: req.body.blogComment,
      blogId: req.body.blogId,
      userId: req.body.userId,
    });
    blogComment
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Comment added successfully",
          createdComment: {
            _id: result._id,
            blogId: result.blogId,
            blogComment: result.blogComment,
            userId: result.userId,
          },
          request: {
            type: "GET",
            url: "http://localhost:2023/comments/" + result._id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
}

// Delete a comment
export function comment_delete_one(req, res, next) {
  const id = req.params.commentId;
  BlogComment.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Comment Deleted",
        request: {
          type: "DELETE",
          url: "http://localhost:2023/comments",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
}
