# Event Genesis

## Table of Contents

- [About The Project](#about-the-project)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
- [Pages](#pages)
- [Features](#features)
- [Contributing](#contributing)

## About The Project

Event Genesis is an innovative event management platform designed to simplify the way users organize and participate in events. This platform supports users in taking on both roles - as an organizer and a participant, providing a suite of tools to search, register, and manage events effectively and efficiently.

## Technology Stack

This project is built with a robust set of technologies:

- **React:** A JavaScript library for building user interfaces, particularly single-page applications where you need a fast interaction with the user.
- **Material-UI:** A popular React UI framework that implements Google's Material Design.
- **Java EE (Java Platform, Enterprise Edition):** A standard platform for developing multi-tier enterprise applications.
- **CSS:** For styling and improving the user interface.

## Getting Started

### Requirements

To run Event Genesis, you'll need to set up the following:

- **Java DB (Derby)**
  - **Database Name:** `EventManagementDB`
  - **Username:** `administrator`
  - **Password:** `password`

### Installation

1. Clone the repository to your local machine.
2. Ensure you have Node.js and Java EE installed and configured.
3. Set up your Java DB instance with the name `EventManagementDB`.
4. Update the database connection settings in the application to match your username and password.
5. Install all required npm packages for the front-end by running `npm install` in the project directory.
6. Build your React application using `npm run build`.
7. Deploy the built React application and the Java EE backend to your server (e.g., Tomcat for Java EE and serve the static files with any web server or cloud platform like Netlify or AWS).

### Pages

Home Page
![Home Page](https://github.com/ryantangmj/Event-Management-System-React/assets/110431837/ec348461-aac7-4c3f-af68-e85cd07a3641)
My Events Page
![My Events Page](https://github.com/ryantangmj/Event-Management-System-React/assets/110431837/9ffc56cb-ec7e-40e7-a162-e26a08eae676)
Event Detail Page
![Details Dialog](https://github.com/ryantangmj/Event-Management-System-React/assets/110431837/dc0ee0e9-eb38-46fb-91ae-93179b1d0ae3)
Attendance Page
![Attendance Page](https://github.com/ryantangmj/Event-Management-System-React/assets/110431837/3b298a39-209a-4ee2-94c0-1293a59e6541)
Edit Profile Page
![Edit Profile Page](https://github.com/ryantangmj/Event-Management-System-React/assets/110431837/b1cae731-d56f-481f-9314-70038f4e8a43)
### Features

Event Genesis is designed with an array of features to enhance user engagement and streamline event management:

- **Search for Events**: Facilitates users in finding events that cater to their specific interests through a comprehensive search functionality.
- **Register/Unregister from Event**: Offers a straightforward process for users to sign up or withdraw from events.
- **Create New Event**: Allows organizers to introduce new events, detailing essential information such as date, time, location, and description.
- **Mark Attendance for Event**: Enables organizers to keep track of participant attendance, ensuring efficient event management.
- **Edit Profile**: Provides users with the capability to update their profile details, maintaining current and relevant information.

### Contributing

Contributions are what make the open-source community such a powerful platform for learning, inspiring, and creating. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

- Fork the Project
- Create your Feature Branch (git checkout -b feature/AmazingFeature)
- Commit your Changes (git commit -m 'Add some AmazingFeature')
- Push to the Branch (git push origin feature/AmazingFeature)
- Open a Pull Request
