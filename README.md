# 🏢 Jobless & Found

## 🚀 Project Overview

**Jobless & Found** is a web application project developed for the Epitech Nancy Web course. The project aims to create an online job board website similar to platforms like **Welcome to the Jungle** or **LinkedIn**. It leverages **C# for the backend** and **React with TypeScript** for the frontend, integrating a MySQL database to store all job-related data.

## 📋 Table of Contents
- [🛠 Technologies Used](#-technologies-used)
- [🌟 Project Features](#-project-features)
- [🗃 Database Design](#-database-design)
- [🌐 Application Pages and Functionality](#-application-pages-and-functionality)
- [🔒 API and Authentication](#-api-and-authentication)
- [📝 Step-by-Step Guide](#-step-by-step-guide)
- [✨ Bonus Features](#-bonus-features)

## 🛠 Technologies Used
- **Backend:** C# with Entity Framework and MySQL
- **Frontend:** React (TypeScript)
- **Database Management:** MySQL (Workbench)
- **API Documentation:** Swagger + RESTful API
- **Authentication:** Email, Password (hashed), Session Cookies, Websockets

## 🌟 Project Features

1. **Job Advertisements**: Create, view, and manage job advertisements.
2. **User Management**: Handle users (applicants and companies) and their details.
3. **Application Management**: Track job applications, send emails, and record interactions.
4. **Admin Panel**: A dedicated admin page to perform CRUD operations on all tables.
5. **Authentication**: Secure user login and session management.

## 🗃 Database Design

The project uses MySQL to store information with the following tables:
- Several Table types that globally encapsulate the following:
1. **Companies Tables**: Stores company information such as name, location, and size.
2. **User Tables**: Stores user data, including applicants and HR personnel.
3. **Job Application Tables**: Tracks emails, messages, and applications.

## 🌐 Application Pages and Functionality

- **Home Page**: Displays a scrollable feed of job postings (LinkedIn-like view).
- **Job Details Page**: Shows detailed job information when clicking "Learn More".
- **Application Form**: Opens a form to enter user info (name, email, phone) and send messages to the ad owner.
- **Admin Panel**: Lists all database records with options to create, update, or delete entries.

## 🔒 API and Authentication

The API provides CRUD operations for managing the database and supports secure access using:

- **RESTful Routes**: For fetching and managing job ads and user data.
- **Authentication**: User login and registration with hashed passwords and session cookies (Jwt keys).
- **Authorization**: Only admin users can access the admin panel.

## 📝 Step-by-Step Guide

1. **Step 01**: Create the SQL database with tables for advertisements, companies, people, and job applications.
2. **Step 02**: Develop a basic HTML/CSS page to display job advertisements with "Learn More" buttons.
3. **Step 03**: Implement "Learn More" button functionality to show job details dynamically.
4. **Step 04**: Create a REST API with CRUD operations to interact with the database.
5. **Step 05**: Add an "Apply" button for each ad that opens a form to enter user details and send messages.
6. **Step 06**: Integrate an authentication mechanism for secure login and session handling.
7. **Step 07**: Build an admin page for monitoring and managing the database with pagination support.
8. **Step 08**: Polish the front-end pages, refine styles, and enhance the UI/UX.

## ✨ Bonus Features
These Bonuses are marked by Most likely to be implemented to less likely to be implemented on time.
1. **💬 Real-Time Chat:**
   - Add a chat feature that allows applicants and recruiters to communicate directly in real-time.
   - Use WebSockets to manage chat sessions and notifications.

2. **📈 Analytics Dashboard:**
   - Create an analytics dashboard for admins and companies to visualize metrics like application trends, page views, and applicant demographics.
   - Use graphs and charts to display these insights clearly.

3. **🔔 Notification System:**
   - Implement an email and in-app notification system to alert users about new job postings, application status updates, or messages received.
   - Utilize push notifications for a more modern experience.

4. **🔎 Advanced Job Search & Filtering:**
   - Create an advanced search system with filters for job type, location, salary range, company size, and more.
   - Implement keyword matching and AI-based job recommendations.

5. **📅 Job Application Scheduling:**
   - Allow recruiters to schedule interviews directly within the platform.
   - Include calendar integration for automated reminders and scheduling management.

6. **👥 Role-Based Access Control (RBAC):**
   - Add multiple user roles such as **Recruiters**, **Job Seekers**, and **Admins**, each with distinct permissions and views.
   - Provide different dashboards and restricted access based on roles.

7. **🏆 Gamification & Achievements:**
   - Introduce gamification elements like badges, points, and leaderboards for users who frequently apply, interact, or post jobs.
   - Create a progression system to encourage user engagement.

8. **📄 Resume Parsing & Generation:**
   - Implement a feature that allows users to upload resumes, which are then parsed and auto-filled into the application form fields.
   - Offer resume generation with templates based on user-provided data.

9. **🌐 Multi-Language Support:**
   - Provide multi-language support for the website to cater to international users.
   - Implement language toggles and localization strategies for a global reach.

10. **📍 Map Integration:**
    - Integrate Google Maps or a similar service to display company locations.
    - Show nearby jobs based on the user's current location or entered address.

11. **📂 File Management System:**
    - Develop a file management system for recruiters to manage candidate resumes, cover letters, and other documents.
    - Allow users to upload additional files such as portfolios or certifications.

12. **🧑‍🤝‍🧑 Social Connections & Endorsements:**
    - Add social networking features, allowing users to connect, endorse skills, and write recommendations for each other.
    - Enable recruiters to see mutual connections and endorsements for a candidate.

13. **💡 Suggestions & Feedback System:**
    - Create a suggestion and feedback feature to collect user opinions on the platform.
    - Enable users to vote on new feature requests or report issues.

14. **🗣 Voice Commands & Accessibility Features:**
    - Include voice command support for accessibility, enabling visually impaired users to navigate the platform.
    - Add high-contrast themes, text-to-speech, and keyboard navigation support.

15. **🎥 Video Tutorials & Onboarding:**
    - Provide video tutorials or onboarding guidance for new users to help them navigate the platform.
    - Include tooltips and guided tours for complex features.

16. **📊 Job Market Insights:**
    - Offer job market insights like average salaries, demand for roles, and career growth statistics.
    - Display this data visually in a separate section or integrate it into job posts.
---
We hope you find **Jobless & Found** a helpful project for job seekers and recruiters alike! Feel free to contribute or suggest new features. 😊
