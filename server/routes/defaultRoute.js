const express = require('express');
const defaultRouter = express.Router();

defaultRouter.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Chat Application API</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        font-family: 'Segoe UI', Arial, sans-serif;
                    }
                    .container {
                        background: #fff;
                        padding: 2.5rem 3rem;
                        border-radius: 18px;
                        box-shadow: 0 8px 32px rgba(44,62,80,0.15);
                        text-align: center;
                    }
                    h1 {
                        color: #4f46e5;
                        margin-bottom: 0.5rem;
                        font-size: 2.2rem;
                        letter-spacing: 1px;
                    }
                    p {
                        color: #444;
                        font-size: 1.1rem;
                        margin-top: 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Welcome to the Chat Application API</h1>
                    <p>Explore the API endpoints for user management and messaging features.</p>
                </div>
            </body>
        </html>
    `);
});

module.exports = defaultRouter;