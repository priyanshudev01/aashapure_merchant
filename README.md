# Stitch Aasapure Merchant Portal

A comprehensive merchant management portal for Aasapure dairy products. This platform enables merchants to manage inventory, process orders, track earnings, handle KYC documentation, and configure merchant-specific settings.

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Application Flow](#application-flow)
- [Module Documentation](#module-documentation)

---

## Project Overview

**Stitch Aasapure Merchant Portal** is a full-stack web application designed to provide merchants with a centralized platform to:

- Manage dairy product inventory
- Process and track customer orders
- View earnings and payout history
- Complete KYC (Know Your Customer) verification
- Configure account settings and preferences
- Receive notifications and alerts
- Monitor business performance through dashboards

### Target Users

- Dairy merchants and suppliers
- Small to medium business owners
- Milk product vendors

---

## Technology Stack

### Frontend
- **HTML5** - Markup structure
- **CSS3** (via `app.css`) - Styling and responsive design
- **Vanilla JavaScript** - Interactive functionality and API integration
- **No frameworks** - Lightweight, vanilla implementation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js (v5.2.1)** - Web framework
- **MongoDB** - NoSQL database (via MongoDB Atlas)
- **Mongoose (v9.4.1)** - MongoDB ODM (Object Document Mapper)

### Utilities
- **CORS (v2.8.6)** - Cross-Origin Resource Sharing
- **dotenv (v17.4.2)** - Environment variable management

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT SIDE (Frontend)                   │
│  HTML Pages + Vanilla JavaScript + CSS                      │
│  (Multiple modules for different features)                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                  HTTP/CORS
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              EXPRESS.JS SERVER (Backend)                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         API Routes & Request Handlers                 │ │
│  │  - Settings Management                                │ │
│  │  - Merchant Onboarding                                │ │
│  │  - KYC Document Processing                            │ │
│  │  - Additional Features                                │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
                  Database Layer
                       │
┌──────────────────────▼──────────────────────────────────────┐
│         MONGODB ATLAS (Cloud Database)                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Collections:                                           │ │
│  │  - Settings                                            │ │
│  │  - Merchants/Onboarding                                │ │
│  │  - KYC Records                                         │ │
│  │  - Products, Orders, Transactions (Future)            │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
stitch_aasapure_merchant_portal/
├── server.js                          # Main Express server entry point
├── package.json                       # Project dependencies & metadata
├── .gitignore                         # Git ignore rules
├── README.md                          # This file
│
├── shared/                            # Shared resources
│   ├── app.js                         # Global configuration & API utilities
│   └── app.css                        # Global styles
│
├── merchant_dashboard/                # Dashboard module
│   └── code.html                      # Dashboard UI
│
├── inventory_management/              # Inventory management module
│   └── code.html                      # Inventory UI
│
├── products_list/                     # Products listing module
│   └── code.html                      # Products list UI (v1)
│
├── products_list_v2/                  # Products listing v2
│   └── code.html                      # Products list UI (v2)
│
├── orders_management/                 # Orders management module
│   └── code.html                      # Orders management UI (v1)
│
├── orders_management_v2/              # Orders management v2
│   └── code.html                      # Orders management UI (v2)
│
├── add_edit_product/                  # Product add/edit module
│   └── code.html                      # Add/edit product UI
│
├── order_detail/                      # Order details module
│   └── code.html                      # Order detail view
│
├── delivery_handoff/                  # Delivery handoff module
│   └── code.html                      # Delivery handoff UI
│
├── earnings_payouts/                  # Earnings & payouts module
│   └── code.html                      # Earnings UI
│
├── profile_settings/                  # Customer profile settings
│   └── code.html                      # Profile settings UI
│
├── settings/                          # Account settings module
│   └── code.html                      # Settings UI
│
├── merchant_onboarding/               # Merchant onboarding module
│   ├── code.html                      # Onboarding intro
│   ├── kyc.html                       # KYC verification
│   └── settlement.html                # Settlement details
│
├── approval_status/                   # KYC approval status module
│   └── code.html                      # Approval status UI
│
├── notifications/                     # Notifications module
│   └── code.html                      # Notifications UI
│
├── states_errors/                     # Error states module
│   └── code.html                      # Error states UI
│
└── stitch_aasapure_merchant_portal/   # Duplicate module folder
    └── [Same structure as root]
```

---

## Installation & Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (for database)
- **Git** (for version control)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Priyanshu-Bisht-me/aashapure_merchant.git
cd stitch_aasapure_merchant_portal
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web server framework
- `mongoose` - MongoDB connector
- `cors` - Cross-origin requests handling
- `dotenv` - Environment variables

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# API Configuration
API_BASE_URL=http://localhost:5000/api
```

**Replace the following:**
- `<username>` - Your MongoDB Atlas username
- `<password>` - Your MongoDB Atlas password
- `<cluster>` - Your MongoDB cluster name
- `<database>` - Your MongoDB database name

### Step 4: Verify Database Connection

Ensure your MongoDB Atlas connection string is correct:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Connect to your cluster
3. Get the connection string
4. Paste it in the `.env` file

---

## Running the Application

### Start the Server

```bash
npm start
```

Or use nodemon for development (auto-reload on file changes):

```bash
npx nodemon server.js
```

The server will start at: `http://localhost:5000`

You should see:
```
Database Connected
Backend Running Successfully
```

### Accessing the Frontend

Once the server is running, open your browser and navigate to:

```
http://localhost:5000
```

Or directly to specific modules:
- Dashboard: `http://localhost:5000/merchant_dashboard/code.html`
- Products: `http://localhost:5000/products_list/code.html`
- Orders: `http://localhost:5000/orders_management/code.html`
- Settings: `http://localhost:5000/settings/code.html`

---

## Features

### 1. **Merchant Dashboard**
- Overview of key metrics
- Quick access to main features
- Recent orders and activities

### 2. **Inventory Management**
- Add, edit, delete products
- Track stock levels
- Monitor product categories

### 3. **Products Management**
- View all products
- Filter and search products
- Product details and images
- Multiple versions (v1 and v2)

### 4. **Orders Management**
- View all customer orders
- Order status tracking
- Order filtering and sorting
- Order details view
- Multiple versions (v1 and v2)

### 5. **Delivery Handoff**
- Manage delivery logistics
- Track delivery status
- Delivery confirmations

### 6. **Earnings & Payouts**
- View earnings reports
- Payout history
- Settlement information
- Financial analytics

### 7. **Merchant Onboarding**
- Welcome & intro page
- KYC (Know Your Customer) verification
- Settlement account setup
- Document uploads

### 8. **KYC Verification**
- Document verification status
- Approval tracking
- Document management

### 9. **Profile & Settings**
- Customer profile management
- Merchant settings
- Notification preferences
- Language & timezone settings
- Bank account configuration
- Payment method setup

### 10. **Notifications**
- Order notifications
- System alerts
- Email alerts configuration
- App notifications toggle

### 11. **Help Center**
- Support resources
- FAQ
- Error states & guidance

---

## API Endpoints

### Settings Management

#### Save/Update Settings
```http
POST /api/settings
Content-Type: application/json

{
  "merchantId": "DEMO-ASHA-001",
  "merchantName": "John Dairy Supplier",
  "appNotifications": true,
  "emailAlerts": true,
  "instantSettlement": false,
  "businessHours": "9AM-6PM",
  "language": "en",
  "bankName": "HDFC Bank",
  "upiId": "john@upi",
  "updatedAt": "2026-04-30T10:00:00Z"
}
```

**Response:**
```json
{
  "message": "Settings Saved Successfully"
}
```

#### Get Settings
```http
GET /api/settings/:merchantId
```

**Response:**
```json
{
  "_id": "...",
  "merchantId": "DEMO-ASHA-001",
  "merchantName": "John Dairy Supplier",
  "appNotifications": true,
  "emailAlerts": true,
  "instantSettlement": false,
  "businessHours": "9AM-6PM",
  "language": "en",
  "bankName": "HDFC Bank",
  "upiId": "john@upi",
  "updatedAt": "2026-04-30T10:00:00Z"
}
```

### Health Check

```http
GET /
```

**Response:**
```
Backend Running Successfully
```

### Future API Endpoints

The following endpoints are planned for implementation:
- `/api/products` - Product management
- `/api/orders` - Order management
- `/api/inventory` - Inventory tracking
- `/api/earnings` - Earnings reports
- `/api/kyc` - KYC verification
- `/api/onboarding` - Merchant onboarding
- `/api/notifications` - Notification management

---

## Application Flow

### User Journey: Merchant Login & Navigation

```
┌─────────────────────────────────────────────────┐
│          Application Start                      │
│   (Load shared/app.js & shared/app.css)        │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  Retrieve Merchant Profile                      │
│  - Check localStorage for cached profile       │
│  - If not cached, fetch from API              │
│  - Fallback to demo merchant (DEMO-ASHA-001)  │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│  Display Dashboard / Main Navigation             │
│  - Sidebar Navigation Menu                      │
│  - User Profile Section                         │
│  - Quick Action Buttons                         │
└────────────────────┬────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐
│  Navigate Module 1   │  │  Navigate Module 2   │
│  (e.g., Products)    │  │  (e.g., Orders)      │
└──────────────────────┘  └──────────────────────┘
        │                         │
        ▼                         ▼
┌──────────────────────────────────────────────────┐
│  Load Module-Specific HTML & JavaScript         │
│  - Parse routes from app.js ROUTES object       │
│  - Load corresponding HTML file                 │
│  - Execute module-specific scripts              │
└──────────────────────┬───────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼
┌──────────────────────┐    ┌──────────────────────┐
│  Fetch Data via API  │    │  Display UI          │
│  (if needed)         │    │  - Render data       │
│  - GET/POST requests │    │  - Enable interactions
└──────────────────────┘    └──────────────────────┘
        │                             │
        └──────────────┬──────────────┘
                       ▼
┌──────────────────────────────────────────────────┐
│  User Interactions                               │
│  - Click buttons/links                           │
│  - Submit forms                                  │
│  - Update settings                               │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│  API Calls (POST/GET)                            │
│  - Send data to backend                          │
│  - Save to MongoDB                               │
│  - Return response                               │
└──────────────────────┬───────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────┐
│  Update UI & LocalStorage                        │
│  - Display success/error messages                │
│  - Cache merchant profile                        │
│  - Refresh data displays                         │
└──────────────────────────────────────────────────┘
```

### Settings Configuration Flow

```
User Opens Settings Page
         │
         ▼
Load Current Settings
(GET /api/settings/:merchantId)
         │
         ▼
Display Settings Form
- Notifications preferences
- Language & timezone
- Bank details
- UPI ID
         │
         ▼
User Modifies Settings
         │
         ▼
Click "Save" Button
         │
         ▼
POST to /api/settings
with updated data
         │
         ▼
MongoDB Update/Insert
         │
         ▼
Display Success Message
         │
         ▼
Update localStorage
with new profile
```

---

## Module Documentation

### Shared Resources (`shared/app.js`)

**Configuration Constants:**
- `API_BASE` - API endpoint base URL
- `STORAGE_KEY` - LocalStorage key for merchant profile
- `DEMO_MERCHANT_ID` - Default demo merchant ID
- `ROUTES` - Navigation routes mapping
- `PRODUCT_IMAGES` - Product image URLs

**Global Functions:**
- `getMerchantProfile(forceRefresh)` - Retrieve merchant profile
- `getKycRecord(merchantId)` - Fetch KYC status
- `fetchJson(path, options)` - Unified API fetch wrapper
- `getStoredMerchantProfile()` - Get cached profile
- `saveMerchantProfile(profile)` - Cache merchant data

### Shared Styles (`shared/app.css`)

- Global styles for all pages
- Responsive design utilities
- Color schemes and typography
- Component styling
- Layout utilities

---

## Database Schema

### Settings Collection

```javascript
{
  _id: ObjectId,
  merchantId: String,          // Unique merchant identifier
  merchantName: String,         // Name of the merchant
  appNotifications: Boolean,    // Enable app notifications
  emailAlerts: Boolean,         // Enable email alerts
  instantSettlement: Boolean,   // Instant settlement enabled
  businessHours: String,        // Business operating hours
  language: String,             // Preferred language
  bankName: String,             // Bank name for settlement
  upiId: String,                // UPI ID for payments
  updatedAt: Date               // Last update timestamp
}
```

### Future Collections

- **Products** - Product catalog and inventory
- **Orders** - Customer orders and transactions
- **KYC** - KYC verification documents and status
- **Merchants** - Merchant profile details
- **Notifications** - Notification logs

---

## Error Handling

### Common Error Responses

```json
{
  "message": "Error description"
}
```

### Debugging

- Check browser console for JavaScript errors
- Check server logs for backend errors
- Verify MongoDB connection in .env file
- Ensure CORS is properly configured
- Check API endpoint URLs in shared/app.js

---

## Development Workflow

### Adding a New Feature

1. **Create a new module folder** (e.g., `new_feature/`)
2. **Create `code.html`** with the UI
3. **Add route to `ROUTES`** in shared/app.js
4. **Create backend API endpoint** in server.js
5. **Test locally** before committing

### Best Practices

- Use semantic HTML
- Keep JavaScript modular
- Use consistent naming conventions
- Add error handling for API calls
- Test across browsers
- Maintain responsive design

---

## Deployment

### Deploy to Production

1. **Update `.env`** with production values
2. **Set `NODE_ENV=production`**
3. **Deploy to hosting** (Heroku, AWS, DigitalOcean, etc.)
4. **Update database connection** to production MongoDB
5. **Update API URLs** for production domain

### Deployment Platforms

- **Heroku** - Easy Node.js deployment
- **AWS** - EC2, Elastic Beanstalk, Lambda
- **DigitalOcean** - VPS or App Platform
- **Render** - Modern cloud platform
- **Railway** - Simple deployment

---

## Troubleshooting

### Issue: Database Connection Failed

**Solution:**
- Verify MongoDB Atlas IP whitelist includes your IP
- Check connection string in `.env`
- Ensure MongoDB user has proper permissions

### Issue: CORS Errors

**Solution:**
- Frontend URL is added to CORS allowed origins
- Verify server has CORS middleware enabled
- Check Content-Type headers

### Issue: Styles Not Loading

**Solution:**
- Ensure `shared/app.css` path is correct
- Clear browser cache
- Check file permissions

### Issue: API Endpoints 404

**Solution:**
- Verify endpoint exists in server.js
- Check HTTP method (GET, POST)
- Verify request body format

---

## Future Enhancements

- [ ] User authentication & authorization
- [ ] Email verification
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app version
- [ ] Real-time notifications
- [ ] Document management system
- [ ] Multi-language support
- [ ] API rate limiting
- [ ] Automated testing suite

---

## Support & Contributions

For issues, suggestions, or contributions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
5. Contact: [Your Contact Information]

---

## License

ISC License - See package.json for details

---

## Contact

**Project Repository:** https://github.com/Priyanshu-Bisht-me/aashapure_merchant

**Last Updated:** April 30, 2026

---

**Happy coding! 🚀**
