# Blood Donation Management System

A comprehensive platform designed to bridge the gap between blood donors and recipients. This application allows users to create blood donation requests, manage donor profiles, and facilitate life-saving donations through an organized dashboard.

## 🌐 Live URL
[Click here to view the Live Site](https://blood-donation-11.vercel.app)

## 🎯 Purpose
The primary goal of this project is to create an efficient, transparent, and user-friendly system for managing blood donation activities. It helps recipients find donors quickly in emergencies and allows donors to track their contribution history.

## 🚀 Key Features
* **User Authentication:** Secure login and registration using Firebase Authentication.
* **Donor Dashboard:** A personalized space for donors to manage their requests and view donation history.
* **Donation Requests:** Users can create, edit, and delete blood donation requests with detailed information (location, hospital, time, etc.).
* **Search & Filter:** Advanced filtering options to find donors based on blood group, district, and upazila.
* **Admin & Staff Roles:** Dedicated panels for admins to manage users, block/unblock accounts, and oversee all donation requests.
* **Secure Payments:** Integrated Stripe payment gateway for funding or voluntary contributions.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop screens.

## 🛠️ Technologies & NPM Packages Used

### Frontend:
* **React.js**: Core library for building the UI.
* **React Router**: For seamless navigation between pages.
* **Axios**: For making API requests to the backend.
* **Firebase**: For authentication and hosting.
* **Stripe (@stripe/stripe-js)**: For secure payment processing.
* **TanStack Query (React Query)**: For efficient data fetching and state management.
* **SweetAlert2**: For beautiful and interactive popup notifications.
* **Tailwind CSS & DaisyUI**: For modern and responsive styling.

### Backend:
* **Node.js & Express**: To handle server-side logic and API routes.
* **MongoDB**: NoSQL database for storing user data and donation requests.
* **Firebase Admin SDK**: To verify user tokens and manage secure backend operations.
* **Dotenv**: To manage environment variables securely.
* **Cors**: To handle Cross-Origin Resource Sharing.

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/blood-donation-client.git](https://github.com/your-username/blood-donation-client.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Environment Variables:**
    Create a `.env` file and add your Firebase and Stripe configuration keys.
4.  **Run the application:**
    ```bash
    npm run dev
    ```

---
Developed with ❤️ for the community.