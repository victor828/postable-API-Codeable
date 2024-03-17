# Codeable Project

# Postable

# Content table

1. Technologies
2. About.
3. Routes.
   - Users
   - Posts
   - Likes

## Technologies

This project utilizes the following technologies: `NODE`, `Express`, `jsonwebtoken`, `node-pg-migrate`, `zod`, `bcrypt`, `TypeScript`, and `PostgreSQL`.

## About

This project simulates a social web platform where users can post, update, and delete posts. Other users can like these posts, and the total count of likes is displayed on each post.

## Routes

### Users

- `POST` - `/login`: Initiates the session.
- `POST` - `/signup`: Creates a new user.
- `GET` - `/me`: Retrieves the user’s information.
- `PATCH` - `/me`: Updates the user’s profile information.
- `DELETE` - `/me`: Deletes the user’s profile.

### Posts

- `GET` - `/`: Retrieves all posts (admin only).
- `GET` - `/:username`: Retrieves all posts from a specific user.
- `POST` - `/posts`: Creates a new post.
- `PATCH` - `/post/:id`: Updates a post. Only the user who created the post can update it.
- `DELETE` - `/post/:id` : Deletes a post. Only the user who created the post can delete it.

### Likes

- `POST` - `/posts/:postId/like`: A user can like another user’s post.
- `DELETE` - `/posts/:postId/like`: Removes a like from a post.
