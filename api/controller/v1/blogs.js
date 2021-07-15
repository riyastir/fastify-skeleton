const Blog = require("../../models/Blog");

// Handlers
const getAllBlogs = async (req, reply) => {
  try {
    const blogs = await Blog.find({});
    reply.code(200).send(blogs);
  } catch (e) {
    reply.code(500).send(e);
  }
};

const getBlog = async (req, reply) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    reply.code(200).send(blog);
  } catch (e) {
    reply.code(500).send(e);
  }
};

const addBlog = async (req, reply) => {
  try {
    const blog = req.body;
    const newBlog = await Blog.create(blog);
    reply.code(201).send(newBlog);
  } catch (e) {
    reply.code(500).send(e);
  }
};

const updateBlog = async (req, reply) => {
  try {
    const blogId = req.params.id;
    const updates = req.body;
    await Blog.findByIdAndUpdate(blogId, updates);
    const blogToUpdate = await Blog.findById(blogId);
    reply.code(200).send({ data: blogToUpdate });
  } catch (e) {
    reply.code(500).send(e);
  }
};

const deleteBlog = async (req, reply) => {
  try {
    const blogId = req.params.id;
    const blogToDelete = await Blog.findById(blogId);
    await Blog.findByIdAndDelete(blogId);
    reply.code(200).send({ data: blogToDelete });
  } catch (e) {
    reply.code(500).send(e);
  }
};

module.exports = {
  getAllBlogs,
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
};
