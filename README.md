# Portfolio Backend - Contact Form API

A secure Node.js backend for handling portfolio contact form submissions with email notifications using Nodemailer.

## Features

- ✅ **Secure Email Handling** - Uses Nodemailer with Gmail/SMTP
- ✅ **Input Validation** - Comprehensive validation for name, email, and message
- ✅ **Rate Limiting** - Prevents spam with 5 requests per 15 minutes per IP
- ✅ **Security Headers** - Helmet.js for security best practices
- ✅ **Spam Protection** - Basic spam pattern detection
- ✅ **Environment Variables** - Secure credential management
- ✅ **Error Handling** - Comprehensive error handling and logging
- ✅ **CORS Support** - Configurable cross-origin requests

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your credentials:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
```

### 3. Gmail App Password Setup

For Gmail, you need to create an App Password:

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Scroll down to **App passwords**
4. Generate a new app password for "Mail"
5. Use this 16-character password in `EMAIL_PASS`

### 4. Start the Server

Development mode with auto-restart:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### POST /api/contact

Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to get in touch!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully! I'll get back to you soon.",
  "messageId": "email-message-id"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Validation error 1", "Validation error 2"]
}
```

### GET /api/health

Health check endpoint.

**Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Validation Rules

### Name
- Required string
- 2-100 characters
- Only letters, spaces, hyphens, and apostrophes

### Email
- Required valid email format
- Maximum 254 characters
- Normalized using validator.js

### Message
- Required string
- 10-5000 characters
- Basic spam pattern detection

## Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Input Sanitization**: HTML escaping for all inputs
- **Spam Detection**: Pattern matching for common spam content
- **CORS Protection**: Configurable allowed origins
- **Security Headers**: Helmet.js middleware
- **Environment Variables**: Sensitive data protection

## Deployment

### Heroku Deployment

1. Create a new Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git:

```bash
git add .
git commit -m "Initial commit"
heroku git:remote -a your-app-name
git push heroku main
```

### Environment Variables for Production

Set these in your hosting platform:

```
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-portfolio-domain.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
```

## Frontend Integration

Update your frontend contact form to use the new API:

```javascript
// Replace EmailJS with fetch API
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: formData.get('user_name'),
        email: formData.get('user_email'),
        message: formData.get('message')
    })
});

const result = await response.json();
```

## Troubleshooting

### Common Issues

1. **Gmail Authentication Error**
   - Ensure 2FA is enabled
   - Use App Password, not regular password
   - Check EMAIL_USER and EMAIL_PASS in .env

2. **CORS Errors**
   - Update FRONTEND_URL in .env
   - Ensure frontend and backend URLs match

3. **Rate Limiting**
   - Wait 15 minutes between testing
   - Adjust rate limits in server.js if needed

### Logs

Check server logs for detailed error information:
```bash
npm run dev  # Shows detailed logs in development
```

## License

MIT License - feel free to use this for your own portfolio!
