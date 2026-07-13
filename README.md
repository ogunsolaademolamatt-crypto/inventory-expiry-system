# Inventory Expiry Alert System

A comprehensive platform designed to help companies and industries managing perishable goods track inventory and automatically alert stakeholders when items are about to expire.

## 🎯 Features

### Core Functionality
- **Inventory Management**: Track items with expiry dates through barcode scanning or manual entry
- **Automated Alerts**: Smart notifications via email and social media (7 days, 3 days, 1 day before expiry)
- **Role-Based Access**: Company admins control permissions for co-workers
- **Multi-Channel Notifications**: Email, SMS, Slack, Twitter, WhatsApp integration
- **Real-Time Dashboard**: Monitor inventory status and alert history
- **Analytics & Reports**: Insights into expiry patterns and waste reduction

### Admin Features
- User permission management
- Alert configuration per company
- Co-worker account management
- Audit logs and compliance tracking

## 🏗️ Project Structure

```
inventory-expiry-system/
├── backend/          # Node.js + Express API
├── frontend/         # React + Vite web app
├── mobile/           # React Native mobile app
└── docs/             # Documentation
```

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React 18, Vite, Tailwind CSS, axios
- **Mobile**: React Native (optional)
- **Real-time**: Socket.io
- **Authentication**: JWT, bcrypt
- **Notifications**: SendGrid (Email), Twilio (SMS/WhatsApp), OAuth (Social)
- **Barcode**: jsbarcode, quagga2

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- MongoDB instance
- Environment variables configured

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Setup Guide](./docs/SETUP.md)

## 👥 User Roles

1. **Company Admin**: Company owner/administrator
2. **Manager**: Inventory manager
3. **Staff**: Basic inventory handlers
4. **Viewer**: Read-only access

## 🔐 Security

- JWT-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- Encrypted password storage
- Environment variable protection
- CORS configuration

## 📞 Alert Channels

- **Email**: SendGrid integration
- **SMS**: Twilio SMS
- **WhatsApp**: Twilio WhatsApp
- **Slack**: Webhook integration
- **Twitter**: OAuth integration (optional)

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💼 Author

Ogunsolá Ademolamatt

## 📧 Support

For issues and feature requests, please open an issue on GitHub.
