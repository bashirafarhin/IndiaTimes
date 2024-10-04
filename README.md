# India Times - A Real Time News App

![Screenshot 2024-10-03 172431](https://github.com/user-attachments/assets/9af80e0f-4a6d-43a5-bb10-eca3df0d7ab5)

India Times is a full-stack news application that aggregates real-time news from various trusted sources, including [NDTV](https://www.ndtv.com/), [BBC](https://www.bbc.com/), [Hindustan Times](https://www.hindustantimes.com/), and [The New York Times](https://www.nytimes.com/international/). It provides users with instant access to the latest news updates, ensuring they are always informed about current events.

## Features

- **Real-Time News Aggregation**: India Times collects data from major news websites using web scraping to bring you the latest updates instantly.
- **Web Scraping with [Puppeteer](https://pptr.dev/)**: The app utilizes Puppeteer, a Node.js library, to automate the process of scraping real-time data from news websites. Puppeteer controls a headless browser, allowing the app to extract news efficiently and accurately.
- **User-Friendly UI**: Built using React and MUI ([Material-UI](https://mui.com/)), the app offers a clean and intuitive interface that enhances the user experience.
- **Responsiveness**: The app is fully responsive, ensuring seamless access on any device, whether desktop, tablet, or mobile.
- **Login Authentication**: Secure login via Google authentication is integrated to enhance user security and personalization.
- **Session and Cookies**: User sessions are managed effectively with cookies to provide a smooth, uninterrupted experience.
- **Payment Integration**: [Razorpay](https://razorpay.com/) payment gateway integration for future features like premium content or donations (currently in test mode).
- **Read More Feature**: If a user wants more details, they can access the full article with the 'Read More' option.

## Tech Stack

- **MERN Stack**: 
  - MongoDB: For efficient storage of user data, sessions, and news bookmarks.
  - Express: Backend framework to handle API requests and authentication.
  - React: Frontend built with Vite for fast and efficient development.
  - Node.js: Backend server to handle news scraping and user management.

- **Google Authentication**: Users can securely log in with their Google accounts using OAuth2.0, ensuring a quick and safe login process.
  
- **Puppeteer**: Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. It allows the app to scrape data from websites like NDTV, BBC, and more in real time by simulating user interaction in a browser without needing manual input.

- **[Vite](https://vite.dev/guide/)**: The React app is powered by Vite, which ensures faster development build times and hot-reload features for seamless development.

- **React Router DOM**: The app uses `react-router-dom` for client-side routing, making navigation between different pages (home, news details, login, etc.) smooth and efficient.

## How It Saves Time

- The app gathers all the latest news in one place, saving users the time and effort required to visit multiple websites.
- With a simple, clean UI and a fast-loading interface, India Times ensures that users can quickly find the news they are interested in.
- The 'Read More' option lets users dive deeper into the articles they find important without any hassle.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Razorpay (for payments)
- Google Developer Console (for authentication)

  
### Installation

1. Clone the repository:
   `git clone https://github.com/yourusername/indiatimes.git`
2. Install dependencies:
   `cd indiatimes`
   `npm install`
3. Set up environment variables:
   A sample `SampleEnvFile.txt` file is provided in the repository for your reference. You should create your own `.env` file in both directory of the project and update it with your own credentials.
4. Run the application:
   `npm run dev`
5. Open your browser and go to:
   `http://localhost:3000`
### LICENSE
[MIT LICENSE](https://github.com/bashirafarhin/IndiaTimes/blob/main/LICENSE)

### Demo

https://github.com/user-attachments/assets/8b456588-5878-4cc7-99c0-ee4a5f30059e
