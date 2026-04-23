# TechFlow - Static Web Server

A professional Node.js static web server application that serves a modern, responsive website. This project demonstrates the use of core Node.js modules including `http`, `fs`, `path`, and `url` for building a fully functional web server.

## 📋 Features

- **HTTP Server**: Built using Node.js `http` module
- **Static File Serving**: Serves HTML, CSS, JavaScript, images, and more
- **Responsive Design**: Mobile-friendly interface for all devices
- **Multiple Pages**: Home, About, Services, and Contact pages
- **Modern UI**: Beautiful gradient design with smooth animations
- **Error Handling**: Custom 404 and error pages
- **Security**: Directory traversal attack prevention
- **MIME Type Support**: Automatic content-type detection
- **Caching**: Browser caching headers for performance
- **Logging**: Request logging for monitoring

## 📁 Project Structure

```
assignment 3)a_project/
├── server.js                 # Main server file
├── package.json              # Node.js package configuration
├── README.md                 # This file
└── public/                   # Static files directory
    ├── index.html            # Homepage
    ├── about.html            # About page
    ├── services.html         # Services page
    ├── contact.html          # Contact page
    ├── style.css             # Global styles and responsive design
    └── script.js             # Client-side interactivity
```

## 🛠️ Technologies Used

### Server-Side
- **Node.js**: Runtime environment
- **http**: HTTP server module
- **fs**: File system operations
- **path**: File path utilities
- **url**: URL parsing

### Client-Side
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations and gradients
- **Vanilla JavaScript**: DOM manipulation and form handling

### Features
- Responsive Grid Layout
- CSS Animations and Transitions
- Mobile Navigation with Hamburger Menu
- Form Validation
- Counter Animations
- Intersection Observer API for scroll effects

## 🚀 Getting Started

### Prerequisites
- Node.js (version 12.0.0 or higher)
- npm (comes with Node.js)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd "/Users/nimisha/Desktop/PICT/PICT 6TH SEM/SUBJECTS/LAB/WADL/assignment 3)a_project"
   ```

2. *(Optional) Install dependencies:*
   ```bash
   npm install
   ```
   This is optional since the server uses only built-in Node.js modules.

### Running the Server

**Option 1: Using npm**
```bash
npm start
```

**Option 2: Direct Node.js**
```bash
node server.js
```

**Expected Output:**
```
╔════════════════════════════════════════════════════╗
║     🚀 Static Web Server Started Successfully 🚀   ║
╠════════════════════════════════════════════════════╣
║  Server running at: http://localhost:8000          ║
║  Public directory: /path/to/public                ║
║  Press Ctrl+C to stop the server                  ║
╚════════════════════════════════════════════════════╝
```

### Accessing the Website

Open your web browser and navigate to:
- **Homepage**: [http://localhost:8000](http://localhost:8000)
- **About**: [http://localhost:8000/about.html](http://localhost:8000/about.html)
- **Services**: [http://localhost:8000/services.html](http://localhost:8000/services.html)
- **Contact**: [http://localhost:8000/contact.html](http://localhost:8000/contact.html)

### Stopping the Server

Press `Ctrl+C` in the terminal to stop the server.

## 📖 Website Pages

### 🏠 Home Page (index.html)
- Hero section with call-to-action
- Features showcase (6 key features)
- Statistics section
- Service overview
- Footer with contact information

### 👥 About Page (about.html)
- Company story and mission
- Team members showcase
- Company values
- Why choose us section

### 💼 Services Page (services.html)
- 12 different services offered
- Pricing plans (Starter, Professional, Enterprise)
- Service descriptions and features

### 📞 Contact Page (contact.html)
- Contact form with validation
- Contact information (address, phone, email)
- Business hours
- FAQ section
- Social media links

## 🎨 Design Features

### Color Scheme
- **Primary**: Purple (#667eea)
- **Secondary**: Violet (#764ba2)
- **Text Dark**: #2d3748
- **Background**: Light gray (#f7fafc)

### Responsive Breakpoints
- Desktop: Full layout
- Tablet (≤768px): Modified grid and navigation
- Mobile (≤480px): Optimized single-column layout

### Animations
- Hero content slide-up
- Card hover effects with transforms
- Counter animations for statistics
- Smooth scroll behavior
- Floating background elements

## 🔒 Security Features

1. **Directory Traversal Protection**: Validates file paths to prevent unauthorized access
2. **Error Handling**: Graceful error handling for missing files
3. **MIME Type Detection**: Prevents mime-type sniffing attacks
4. **Input Validation**: Form validation on both client and server side

## ⚙️ Server Configuration

### Port Configuration
- Default Port: **8000**
- Default Host: **localhost**

To change the port, edit `server.js`:
```javascript
const PORT = 8000; // Change this value
```

### MIME Types
The server automatically detects file types and sets appropriate content-type headers:
- `.html` → text/html
- `.css` → text/css
- `.js` → application/javascript
- `.png`, `.jpg`, `.gif` → image types
- And many more...

## 📊 Request Logging

All requests are logged to the console:
```
✓ GET / - 200 OK
✓ GET /style.css - 200 OK
✗ GET /unknown.html - 404 Not Found
```

## 🐛 Troubleshooting

### Port Already in Use
If port 8000 is already in use:
```bash
# Find and kill the process on port 8000
# On macOS/Linux:
lsof -i :8000
kill -9 <PID>

# Or change the port in server.js
```

### Cannot Find Module
If you get module errors, ensure you're in the correct directory:
```bash
cd "/Users/nimisha/Desktop/PICT/PICT 6TH SEM/SUBJECTS/LAB/WADL/assignment 3)a_project"
```

### CSS/JavaScript Not Loading
- Check browser console for specific file errors
- Ensure files are in the `public/` directory
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

## 📚 Code Highlights

### Server Request Handler
```javascript
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;
    
    // ... file reading and response
});
```

### File System Operations
```javascript
fs.readFile(filePath, (err, data) => {
    if (err) {
        // Handle errors
    } else {
        // Send file content
    }
});
```

### MIME Type Detection
```javascript
const ext = path.extname(filePath).toLowerCase();
const contentType = mimeTypes[ext] || 'application/octet-stream';
```

## 📈 Production Considerations

For production use, consider:
1. Use a proper web server (Apache, Nginx, Express.js)
2. Implement SSL/TLS (HTTPS)
3. Add compression middleware
4. Implement rate limiting
5. Add request logging to files
6. Use environment variables for configuration
7. Implement proper error tracking
8. Add security headers (CSP, X-Frame-Options, etc.)

## 📝 Assignment Objectives Met

✅ **Create a Node.js application** - Static web server implemented  
✅ **Use necessary modules** - http, fs, path, url utilized  
✅ **File operations** - Reading files, MIME type detection  
✅ **Server-side operations** - Request routing and error handling  
✅ **Good website** - Professional, modern, responsive website  
✅ **Multiple pages** - Home, About, Services, Contact  
✅ **Proper styling** - CSS with animations and responsive design  
✅ **User interactivity** - JavaScript form handling and navigation  

## 🤝 Contributing

Feel free to modify and extend this project:
- Add more pages
- Enhance styling
- Add new features
- Improve error handling

## 📄 License

MIT License - Feel free to use this project for educational purposes.

## 📞 Support

For issues or questions, check the console output or contact the development team.

---

**Created**: 2026  
**Version**: 1.0.0  
**Node.js Required**: 12.0.0+
