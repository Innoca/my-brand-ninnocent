import { Router } from "express";
const router = Router();

import {
  add_blogComment,
  comment_delete_one,
  blogComment_get_all,
} from "../controllers/comments";

// Get all comments

router.get("/", blogComment_get_all);

router.post("/", add_blogComment);

// router.get('/:commentId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Comments Details!',
//         commentId: req.params.commentId
//     })
// })

router.delete("/:commentId", comment_delete_one);

export default router;
