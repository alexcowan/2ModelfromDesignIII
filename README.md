# Parts Catalog Web Application

A web application for browsing and managing a catalog of parts, featuring user authentication, search functionality, and a review system.

## Project Structure

```
/
├── index.html          # Main entry point
├── css/
│   ├── main.css       # Styles for the main page
│   └── detail.css     # Styles for the detail page
├── js/
│   ├── main.js        # Main page functionality
│   └── detail.js      # Detail page functionality
└── pages/
    └── detail.html    # Part detail page
```

## Features

- User authentication (login/register)
- Parts search and filtering
- Part details view
- User reviews and ratings
- Shopping cart functionality

## Dependencies

- Firebase 8.2.5 (Authentication, Firestore, Analytics)
- Font Awesome 4.7.0

## Setup

1. Clone the repository
2. Open `index.html` in a web browser
3. The application requires an active internet connection for Firebase services

## Notes

- Firebase configuration is included in both HTML files
- The application uses client-side JavaScript for all functionality
- CSS is split between main and detail pages for better organization
