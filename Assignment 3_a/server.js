// Static Web Server using Node.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Define the port

const PORT = 8000;
const HOST = 'localhost';

// Base directory for static files
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME types mapping
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain',
    '.pdf': 'application/pdf'
};

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Parse the requested URL
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Remove leading slash and handle root path
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Get the file path by combining public directory and pathname
    const filePath = path.join(PUBLIC_DIR, pathname);

    // Prevent directory traversal attacks
    if (!filePath.startsWith(PUBLIC_DIR)) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>403 Forbidden</h1><p>Access denied.</p>');
        return;
    }

    // Try to read the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // File not found or error reading
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end(`
                    <html>
                        <head>
                            <title>404 - Not Found</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    height: 100vh;
                                    margin: 0;
                                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                }
                                .container {
                                    text-align: center;
                                    background: white;
                                    padding: 40px;
                                    border-radius: 10px;
                                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                                }
                                h1 { color: #667eea; }
                                p { color: #666; }
                                a { color: #667eea; text-decoration: none; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>404 - Page Not Found</h1>
                                <p>The page you requested does not exist.</p>
                                <a href="/">Go back to home</a>
                            </div>
                        </body>
                    </html>
                `);
            } else {
                // Server error
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('500 - Internal Server Error\n' + err.message);
            }
            console.error(`Error: ${req.method} ${req.url} - ${err.message}`);
        } else {
            // File found - determine content type
            const ext = path.extname(filePath).toLowerCase();
            const contentType = mimeTypes[ext] || 'application/octet-stream';

            // Set response headers
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.setHeader('Cache-Control', 'public, max-age=3600');

            // Send the file content
            res.end(data);
            console.log(`✓ ${req.method} ${req.url} - 200 OK`);
        }
    });
});

// Start the server
server.listen(PORT, HOST, () => {
    console.log(`
╔════════════════════════════════════════════════════╗
║     🚀 Static Web Server Started Successfully 🚀   ║
╠════════════════════════════════════════════════════╣
║  Server running at: http://${HOST}:${PORT}          ║
║  Public directory: ${PUBLIC_DIR}              ║
║  Press Ctrl+C to stop the server                ║
╚════════════════════════════════════════════════════╝
    `);
});

// Handle server errors
server.on('error', (err) => {
    console.error(`Server error: ${err.message}`);
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Try a different port.`);
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n📛 Server shutting down gracefully...');
    server.close(() => {
        console.log('✓ Server closed');
        process.exit(0);
    });
});
