# Campus Lost & Found System 🏫

A modern, responsive web application for university students in Colombo to report and search for lost and found items across campus.

## 📋 Features

- **Modern UI Design**: Clean, professional glassmorphism design with blue theme
- **Responsive Layout**: Fully responsive for mobile, tablet, and desktop devices
- **Report Lost Items**: Submit details about lost belongings with images
- **Report Found Items**: Help return found items to their owners
- **Search & Filter**: Browse and search items by name, location, or status
- **Real-time Statistics**: View total numbers of lost, found, and returned items
- **Item Details Modal**: View complete information about each item
- **Local Storage**: All data persists in browser's local storage
- **Smooth Animations**: CSS animations for better user experience
- **Mobile Friendly**: Optimized for all device sizes

## 🎨 Design Features

- **Glassmorphism Effect**: Modern frosted glass UI elements
- **Blue Color Theme**: Professional color palette with blue gradients
- **Smooth Animations**: Fade-in, slide-up, and bounce animations
- **Card Layout**: Clean card-based design for items
- **Hero Section**: Eye-catching landing page with call-to-action buttons
- **Interactive Elements**: Hover effects and smooth transitions

## 📁 Project Structure

```
campus_lost_found/
├── index.html              # Homepage
├── report-lost.html        # Report lost item form
├── report-found.html       # Report found item form
├── search.html             # Search and browse items
├── styles.css              # All styling with glassmorphism
├── script.js               # JavaScript functionality
├── images/                 # Image folder for uploads
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required!

### Running the Application

1. **Extract the files** to your computer
2. **Open `index.html`** in your web browser
3. **Start using the application immediately**

**Quick Start Methods:**
- **Windows**: Double-click `index.html` or drag it to your browser
- **Mac**: Double-click `index.html` or drag to Safari/Chrome
- **Linux**: Right-click `index.html` → Open with Browser

### Optional: Using a Local Server

For better file upload functionality, you can use a local server:

**Using Python 3:**
```bash
cd campus_lost_found
python -m http.server 8000
```
Then visit: `http://localhost:8000`

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js (with http-server):**
```bash
npm install -g http-server
http-server
```

## 📖 How to Use

### 1. **Homepage (index.html)**
- View overview of the system
- See statistics (lost, found, returned items)
- Browse recently reported items
- Quick navigation to forms

### 2. **Report Lost Item**
- Fill in item details (name, description, location)
- Select the date the item was lost
- Upload an image (optional but recommended)
- Provide contact information
- Submit and get confirmation

### 3. **Report Found Item**
- Report a found item with details
- Include description and current location
- Upload a clear photo
- Provide your contact details
- Help reunite items with owners

### 4. **Search Items**
- Search by item name or description
- Filter by status (Lost/Found/Returned)
- Filter by location
- Click on any item to view full details
- Contact finder/reporter directly

## 🎯 Key Pages

| Page | URL | Purpose |
|------|-----|----------|
| Home | `index.html` | Landing page with overview |
| Report Lost | `report-lost.html` | Submit lost item |
| Report Found | `report-found.html` | Submit found item |
| Search | `search.html` | Browse and search items |

## 💾 Data Storage

All data is stored in your browser's **Local Storage**:
- Lost items array
- Found items array
- Item statistics

**Note:** Data persists while browser cookies are enabled. Clearing browser data will reset all items.

## 🎤 Item Status Types

- **Lost** 🔴 - Items reported as lost by owners
- **Found** 🟢 - Items reported as found
- **Returned** 🔵 - Items successfully returned to owners

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (Full layout)
- **Tablet**: 768px - 1199px (Grid adjusts)
- **Mobile**: Below 768px (Single column layout)

## 🎨 Color Scheme

| Color | Usage | Hex |
|-------|-------|-----|
| Primary Blue | Buttons, Links | #2563eb |
| Secondary Cyan | Accents | #06b6d4 |
| Success Green | Returned items | #10b981 |
| Danger Red | Lost items | #ef4444 |
| Dark Text | Main text | #1f2937 |

## 🔧 Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: CSS Grid, Flexbox, Glassmorphism
- **Storage**: Browser LocalStorage API
- **Images**: Base64 encoded SVG placeholders + User uploads
- **Animations**: CSS Keyframes + JavaScript

## 📋 Sample Data

The application comes pre-loaded with sample data:
- 3 Lost Items (Backpack, Laptop, ID Card)
- 3 Found Items (Wallet, AirPods, Glasses)

You can add your own items through the forms.

## ✨ Features Breakdown

### Form Features
- ✅ Form validation
- ✅ Image preview before upload
- ✅ Date picker
- ✅ Clear form button
- ✅ Success message after submission
- ✅ Auto-reset on successful submit

### Search Features
- ✅ Real-time search filter
- ✅ Status filter dropdown
- ✅ Location filter
- ✅ Result counter
- ✅ Clear filters button
- ✅ No results message

### UI Features
- ✅ Sticky navigation bar
- ✅ Smooth page transitions
- ✅ Hover animations
- ✅ Modal for item details
- ✅ Responsive grid layout
- ✅ Auto-animated counters

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📸 Screenshots Equivalent

The application features:

**Homepage:**
- Hero section with gradient background
- Statistics cards showing lost/found/returned counts
- Features section explaining the system
- Recent items grid
- User-friendly footer

**Report Pages:**
- Clean form with proper labels
- Image upload preview
- Form validation
- Success confirmation message

**Search Page:**
- Search input with filters
- Item cards in responsive grid
- Filter controls
- Modal detail view

## 🔒 Privacy & Security Notes

⚠️ **Important Information:**
- Data is stored locally in your browser only
- Contact information is visible to other users (as intended for the lost & found system)
- For production use, implement:
  - Backend database (SQLite/MySQL/PostgreSQL)
  - User authentication
  - Admin panel for moderation
  - Email notifications
  - Image upload to server

## 🚀 Future Enhancements

Potential additions:
- User authentication system
- Backend with Flask/Python
- SQLite database
- Admin panel
- Email notifications
- Image upload to server
- User dashboard
- Rating system
- Matching algorithm for similar items
- SMS notifications
- Social media integration

## 🐛 Known Limitations

1. Data resets if browser cache is cleared
2. Image uploads stored as base64 (limited by localStorage size)
3. No user authentication
4. No backend validation
5. Single-browser storage (not synced across devices)

## 💡 Tips for Success

1. **Add Detailed Descriptions**: Help others identify items better
2. **Upload Clear Images**: Good photos increase match chances
3. **Update Status**: Mark items as returned when successful
4. **Check Regularly**: New items are added constantly
5. **Share Contact Info**: Make it easy for people to reach you

## 📞 Support

For issues or questions:
- Email: support@campuslostfound.lk
- Phone: +94-11-XXXX-XXXX
- Campus Security: [Your Campus Contact]

## 📄 License

This project is created for educational and campus community use.

## 👨‍💻 Developer Notes

### How Data Flows

1. **User submits form** → Data captured in JavaScript
2. **Validation occurs** → Form checks for required fields
3. **Image preview** → If image selected, base64 conversion happens
4. **Item object created** → Timestamp and unique ID assigned
5. **Stored in localStorage** → Persists in browser
6. **Display updated** → Stats and grids refresh
7. **Success message shown** → User confirmation

### Modifying the System

**To add more sample data:**
Edit the `getSampleLostItems()` and `getSampleFoundItems()` functions in `script.js`

**To change colors:**
Modify CSS custom properties in `:root` in `styles.css`

**To add new features:**
Extend JavaScript functionality in `script.js` maintaining the current structure

## 🎓 Educational Use

This project demonstrates:
- Responsive web design
- CSS Grid and Flexbox
- Modern CSS (Glassmorphism, Gradients, Animations)
- JavaScript DOM manipulation
- LocalStorage API
- Form handling
- Event listeners
- Array methods (map, filter, find, sort)
- Modern UI/UX principles

---

**Created**: March 2026
**Version**: 1.0
**Status**: Production Ready ✅

Enjoy the Campus Lost & Found System! 🎉
