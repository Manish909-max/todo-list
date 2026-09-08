# To-Do List App

A complete, responsive, and purely front-end To-Do list application featuring user authentication and dark/light mode support.

## Features

- **User Authentication**: Register and login functionalities using `localStorage`. Each user gets their own separate to-do list.
- **To-Do Management**: Add tasks, mark them as completed, and delete tasks.
- **Data Persistence**: All users, credentials, and tasks are saved in the browser's `localStorage`, meaning data persists across page reloads.
- **Dark/Light Mode**: Toggle between themes. Your preference is saved in `localStorage`.
- **Responsive Design**: Works on desktop and mobile browsers.

## Project Structure

- `index.html`: The main dashboard page for managing tasks.
- `login.html`: The login page.
- `register.html`: The registration page.
- `style.css`: Contains all styles including CSS variables for theming.
- `script.js`: Handles task management, dark/light mode toggling, and dashboard authorization.
- `auth.js`: Handles user registration and login logic.

## How to Run Locally

Since this is a static front-end project with no backend, you can simply open the HTML files directly in your browser.

1. Clone or download this repository.
2. Open `index.html` (it will redirect you to `login.html` if you aren't logged in).
3. Create an account, log in, and start adding tasks!

*Note: For the absolute best experience (to avoid strict `file://` protocol CORS restrictions in some browsers with ES modules, though this project uses classic scripts), you can serve it via a local development server like VS Code Live Server or python's `http.server`:*

```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

## Deployment to GitHub Pages

This project is fully compatible with GitHub Pages. To deploy:

1. Create a new repository on GitHub.
2. Push all the files (`index.html`, `login.html`, `register.html`, `style.css`, `script.js`, `auth.js`, `README.md`) to the `main` branch.
3. Go to your repository **Settings** > **Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then click **Save**.
6. Wait a minute or two, and your site will be live at `https://<your-username>.github.io/<repository-name>/`.
