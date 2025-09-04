# URL Shortener Frontend

A modern, responsive React application for shortening URLs with a clean and intuitive user interface.

## 🚀 Features

- **User Authentication**: Sign up and sign in functionality
- **URL Shortening**: Create short URLs from long ones
- **Custom Aliases**: Option to create custom short URLs
- **Dashboard**: View and manage all your shortened URLs
- **Copy to Clipboard**: One-click copy functionality for shortened URLs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant feedback and updates

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API calls
- **React Router DOM** - Client-side routing
- **CSS3** - Styling with custom properties and responsive design

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd url-shortner/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:3000/api/v1
   VITE_BASE_URL=http://localhost:3000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

## 📁 Project Structure

```
frontend/
├── public/
│   ├── _redirects          # Netlify redirects for SPA routing
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── urlShortener/
│   │       ├── UrlForm.jsx
│   │       └── UrlList.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── SignIn.jsx
│   │   └── SignUp.jsx
│   ├── styles/
│   │   ├── App.css
│   │   ├── Auth.css
│   │   ├── Dashboard.css
│   │   ├── Home.css
│   │   ├── Navbar.css
│   │   ├── UrlForm.css
│   │   └── UrlList.css
│   ├── utils/
│   │   └── config.js
│   ├── assets/
│   │   └── react.svg
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.development
├── .env.production
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Configuration

### Environment Variables

- `VITE_API_URL`: Backend API base URL
- `VITE_BASE_URL`: Base URL for shortened links

### API Endpoints

The frontend communicates with these backend endpoints:

- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/signin` - User login
- `GET /api/v1/auth/verify` - Token verification
- `POST /api/v1/short-url/new` - Create shortened URL
- `GET /api/v1/user/urls` - Get user's URLs

## 🎨 Styling

The application uses CSS custom properties for theming and responsive design:

- **Light/Dark Mode**: Automatic theme detection
- **Responsive Design**: Mobile-first approach
- **Custom Properties**: Consistent colors and spacing
- **Smooth Animations**: Hover effects and transitions

## 🚀 Deployment

### Netlify (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your Git repository for automatic deployments

3. **Environment Variables**
   Set these in Netlify dashboard:
   ```
   VITE_API_URL=https://your-backend-url.herokuapp.com/api/v1
   VITE_BASE_URL=https://your-backend-url.herokuapp.com
   ```

### Other Platforms

The built `dist` folder can be deployed to any static hosting service:
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 🔒 Authentication

The app uses JWT tokens for authentication:
- Tokens are stored in localStorage
- Automatic token verification on app load
- Protected routes require authentication

## 📱 Responsive Design

- **Mobile**: Optimized for screens 320px and up
- **Tablet**: Enhanced layout for medium screens
- **Desktop**: Full-featured experience

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for your domain
   - Check API URL configuration

2. **Authentication Issues**
   - Verify backend is running
   - Check token storage in browser dev tools

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript/ESLint errors

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Links

- [Backend Repository](../backend/README.md)
- [Live Demo](https://your-netlify-url.netlify.app)
- [API Documentation](../backend/README.md#api-documentation)

---

**Note**: Make sure your backend server is running and properly configured before using the frontend application.