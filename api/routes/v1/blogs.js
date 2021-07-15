const blogController = require('../../controller/v1/blogs');

// Validation schema for blogs
const getBlogValidation = {
        params: {
            id: { type: 'string' } // Try changing to object to see error
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    title: { type: 'string' }
                }
            }
        }
}

const addBlogValidation = {
    body: {
        type: 'object',
        additionalProperties: false,
        required: [
            // 'id',
            'title'
        ],
        properties: {
            // id: { type: 'number' },
            title: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' }
            }
        }
    }
}

const routes = [{
        method: 'GET',
        url: '/api/v1/blogs',
        handler: blogController.getAllBlogs
    },
    {
        method: 'GET',
        url: '/api/v1/blogs/:id',
        schema: getBlogValidation, // add validation
        handler: blogController.getBlog
    },
    {
        method: 'POST',
        url: '/api/v1/blogs',
       // schema: addBlogValidation, // add validation
        handler: blogController.addBlog
    },
    {
        method: 'PUT',
        url: '/api/v1/blogs/:id',
        handler: blogController.updateBlog
    },
    {
        method: 'DELETE',
        url: '/api/v1/blogs/:id',
        handler: blogController.deleteBlog
    }
]
module.exports = routes