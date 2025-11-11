# HVAC Parts Catalog

A modern web application for browsing and managing HVAC parts inventory with user authentication and review system. Built with vanilla HTML, CSS, JavaScript, and Firebase.

## Project Structure

```
project-root/
├─ index.html                    # Main catalog page with parts grid and search
├─ pages/                        # Additional HTML pages
│ └─ detail.html                 # Individual part detail page with reviews
├─ css/                          # Stylesheets
│ ├─ main.css                    # Main styles for catalog page
│ └─ detail.css                  # Styles for detail page
├─ js/                           # JavaScript modules
│ ├─ main.js                     # Catalog functionality, auth, and filtering
│ └─ detail.js                   # Detail page functionality and reviews
├─ assets/                       # Static assets (if any)
│ ├─ images/
│ └─ icons/
├─ data/                         # Static JSON seeds, mock data (if any)
│ └─ products.json
├─ tests/                        # Optional: DOM or logic tests (if any)
│ └─ app.spec.md
└─ README.md                     # This file
```

## Features

### 🔍 **Parts Catalog**
- Browse HVAC parts with images, pricing, and availability
- Real-time data from Firebase Firestore
- Interactive filtering by manufacturer, model, and type
- Responsive grid layout with hover effects

### 🔐 **User Authentication**
- Email/password registration and login
- Password recovery functionality
- Secure Firebase Authentication integration
- Session management with automatic logout

### ⭐ **Review System**
- Star-based rating system (1-5 stars)
- User-specific reviews tied to Firebase Auth
- Review modification capabilities
- Average rating display with visual stars

### 🎨 **Modern UI/UX**
- Clean, professional design with Proxima Nova typography
- Hover effects and smooth transitions
- Responsive layout for various screen sizes
- Font Awesome icons for enhanced visual appeal

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Firebase (Authentication + Firestore)
- **Styling**: Custom CSS with modern design principles
- **Icons**: Font Awesome 4.7.0
- **Analytics**: Firebase Analytics

## Firebase Configuration

The application uses Firebase for:
- **Authentication**: User registration, login, and password recovery
- **Firestore**: Parts catalog data and user reviews
- **Analytics**: Usage tracking and insights

### Firestore Collections Structure
```
parts/
├─ {partId}/                    # Individual part documents
│  ├─ Manufacturer: string
│  ├─ Model: string
│  ├─ Type: string
│  ├─ Price: number
│  ├─ Availability: string
│  ├─ Orders: number
│  └─ imageURL: string
└─ {partId}/reviews/            # Subcollection for part reviews
   └─ {userId}/                 # User-specific review documents
      ├─ partnum: string
      ├─ rating: number
      ├─ user: string
      └─ emailAddress: string
```

## Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Firebase project with Authentication and Firestore enabled

### Installation
1. Clone or download the project files
2. Open `index.html` in a web browser
3. The application will automatically connect to Firebase

### Configuration
1. Update Firebase configuration in both `index.html` and `pages/detail.html`
2. Ensure Firestore security rules allow read/write access for authenticated users
3. Set up Authentication providers in Firebase Console

## Usage

### Browsing Parts
1. Open the application in your browser
2. Browse the parts catalog on the main page
3. Use filters to narrow down by manufacturer, model, or type
4. Click on any part to view detailed information

### User Authentication
1. Click "Log In" in the top navigation
2. Register a new account or sign in with existing credentials
3. Use "Forgot Password" if needed for account recovery

### Adding Reviews
1. Sign in to your account
2. Navigate to a part detail page
3. Click on the star rating system to submit your review
4. Modify existing reviews using the "Modify Review" link

## File Descriptions

### HTML Files
- **`index.html`**: Main catalog page with parts grid, search controls, and authentication forms
- **`pages/detail.html`**: Individual part detail page with review functionality

### CSS Files
- **`css/main.css`**: Global styles, grid layout, authentication forms, and catalog styling
- **`css/detail.css`**: Specific styles for detail page, buttons, and review components

### JavaScript Files
- **`js/main.js`**: 
  - Parts catalog loading and display
  - Firebase Firestore integration
  - User authentication (login, register, password recovery)
  - Parts filtering functionality
  - Review display and star rating system
- **`js/detail.js`**: 
  - Individual part data loading
  - Review submission and modification
  - User-specific review management
  - Authentication state handling

## Key Functions

### Catalog Management
- `drawDiv()`: Renders individual part cards
- `postReviews()`: Fetches and displays part reviews
- `filterParts()`: Handles manufacturer/model filtering
- `displayStars()`: Renders star rating visualizations

### Authentication
- `authUser()`: Toggles login/logout functionality
- `loginUser()`: Handles user sign-in
- `registerUser()`: Handles new user registration
- `recoverPassword()`: Manages password recovery

### Review System
- `addReview()`: Submits new user reviews
- `handleReviewClick()`: Processes star rating selections
- `handleModifyReviewClick()`: Enables review editing

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Security Considerations

- Firebase Authentication provides secure user management
- Client-side validation for form inputs
- Firestore security rules should be configured appropriately
- No sensitive data stored in client-side code

## Future Enhancements

- Shopping cart functionality
- Advanced search with text input
- User profile management
- Admin panel for inventory management
- Mobile app development
- Enhanced filtering options

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues, please contact the development team or create an issue in the project repository.