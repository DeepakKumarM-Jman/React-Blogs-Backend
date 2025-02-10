import Blog from "../models/blog.model.js";

/**
 * @desc    Get all blogs
 * @route   GET /api/blogs
 */
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name");
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Get a single blog by ID
 * @route   GET /api/blogs/:id
 */
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Increment view count when a blog is retrieved
    blog.views += 1;
    await blog.save();

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Create a new blog
 * @route   POST /api/blogs
 */
export const createBlog = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const author = req.user._id;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const blog = new Blog({ title, content, author, imageUrl });
    await blog.save();

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


/**
 * @desc    Update a blog
 * @route   PUT /api/blogs/:id
 */
export const updateBlog = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this blog" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.imageUrl = imageUrl || blog.imageUrl;

    await blog.save();
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Delete a blog
 * @route   DELETE /api/blogs/:id
 */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this blog" });
    }

    await blog.deleteOne();
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Add a comment to a blog
 * @route   POST /api/blogs/:id/comment
 */
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments.push({ user: userId, text });
    await blog.save();

    res.status(201).json({ success: true, data: blog.comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPopularBlogs = async (req, res) => {
  try {
    const popularBlogs = await Blog.find().populate("author", "name").sort({ views: -1 }).limit(5);
    res.status(200).json({ success: true, data: popularBlogs });
  } catch (error) {
    res.status(500).json({ message: "Error Fetching", error });
  }
}