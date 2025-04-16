# 🚗 Vehicle Booking Dashboard

Welcome to the **Vehicle Booking Dashboard** — a sleek and responsive web application built with [Next.js](https://nextjs.org) to help you manage and visualize vehicle bookings effortlessly.

---

## ✨ Features

- Dynamic booking management with clean, intuitive UI  
- Individual booking detail pages with dynamic routing  
- Data sourced from a JSON file for simplicity and quick prototyping  
- Responsive design with global and component-level styling  
- Built with Next.js latest features for performance and SEO optimization  

---

## 🛠️ Tech Stack

- **Framework:** Next.js (React)  
- **Language:** TypeScript  
- **Styling:** CSS Modules / Global CSS  
- **Data:** Static JSON file in `public` directory  
- **Routing:** App directory with dynamic routes  

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)  
- npm (comes with Node.js) or yarn / pnpm / bun  

### Installation & Running

1. Clone the repo:

   ```bash
   git clone <repository-url>
   cd vehicle-booking-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit [http://localhost:3000](http://localhost:3000) to explore the dashboard.

### Production Build

To create an optimized production build:

```bash
npm run build
npm start
```

---

## 🧩 Development Approach

This project leverages Next.js's modern `app` directory structure for flexible and scalable routing. The source code is organized as follows:

- **`src/app`**: Main pages and layouts, including dynamic routes for individual bookings (`src/app/bookings/[id]`).  
- **`src/components`**: Reusable UI components like `BookingTable`, `StatsSection`, and `Sidebar`.  
- **`public`**: Static assets, including `bookings.json` which serves as the data source.

Booking data is loaded from the JSON file and displayed in a user-friendly table. Styling combines global CSS with component-level styles to ensure a polished and responsive interface.

Next.js features such as automatic font optimization, server-side rendering, and dynamic routing are utilized to deliver a fast, SEO-friendly experience.

---

## 🔧 Extending the Project

Feel free to enhance the dashboard by:

- Integrating a backend API for real-time booking data  
- Adding authentication and user roles  
- Implementing filters, search, and advanced statistics  
- Writing unit and integration tests for robustness  

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)  
- [Learn Next.js](https://nextjs.org/learn)  
- [React Documentation](https://reactjs.org/docs/getting-started.html)  

---

## ☁️ Deployment

Deploy effortlessly with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform from the creators of Next.js.

More deployment options in the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

---

Thank you for checking out the Vehicle Booking Dashboard! 🚘
