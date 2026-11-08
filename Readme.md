Community Crime Reporting App
A mobile-first community safety application designed to help residents report suspicious activities and crime-related incidents, stay informed about local safety concerns, and engage with their residential community.
Academic project: B.Sc. Information Technology — 2025–2026
Author: Shagun Pandey

Table of Contents
- Overview
- Objectives
- Key Features
- Technology Stack
- System Architecture
- Application Workflow
- Database
- Security
- Getting Started
- Testing
- Current Limitations
- Future Enhancements
- Project Information
Overview
The Community Crime Reporting App is a mobile application concept intended to improve communication between residents and local authorities. It provides a digital way to submit information about suspicious behaviour or incidents, including a description, incident category and location.

The project aims to reduce dependence on manual or paper-based reporting, improve community awareness, and encourage residents to participate in neighbourhood safety.

The application is designed with a React Native mobile frontend and a Node.js backend connected to a MongoDB database.
Objectives
- Make it easier for residents to report crime-related incidents.
- Support the sharing of incident details and relevant evidence.
- Help residents stay informed about important community safety updates.
- Improve communication between residents and authorised administrators.
- Encourage community participation through feedback and polling.
- Organise information digitally and reduce paper-based processes.
- Consider privacy, access control, usability and scalability in the system design.
Key Features
The project report describes the following application modules:
Module	Purpose
User registration and login	Provides an entry point for registered users.
Crime reporting	Allows users to submit an incident category, location and description.
Report history / dashboard	Gives users access to the application's main reporting functions and submitted information.
Community alerts	Intended to share important safety information with residents.
Polls and announcements	Supports community participation and communication.
Feedback and complaints	Allows users to share feedback about the application or community.
Profile management	Provides a place to view or manage user details.
Administrator functions	Designed for reviewing and managing reports and community updates.


Feature-status note: The project report describes a broader proposed system than the limitations section confirms as working in the current version. In particular, it lists authentication, role-based access, real-time notifications and some administrator functions as limitations or future work. Please verify each feature against the code in your repository before describing it as fully implemented.
Technology Stack
Technology	Usage
React Native	Mobile application user interface
Expo CLI	React Native development and app execution
JavaScript	Frontend and backend development language
Node.js	Backend runtime
Express.js	Backend routing and REST API development
MongoDB	NoSQL database
Mongoose	MongoDB schema definition and data modelling
Axios	HTTP requests from the mobile app to the backend
React Navigation	Navigation between application screens
React Context API	Shared application state, including authentication state
JSON Web Token (JWT)	Token-based API authentication, as described in the backend design
bcrypt	Password hashing, as described in the backend design


System Architecture
The application follows a client-server architecture:
1. Mobile frontend: React Native provides the screens and user interface.
2. API layer: The mobile application communicates with backend endpoints using HTTP requests.
3. Backend: Node.js and Express.js process requests and apply application logic.
4. Database: MongoDB stores application data, with Mongoose used for data modelling.
+------------------------------+
|       React Native App       |
|                              |
| Login | Dashboard | Reports  |
| Alerts | Feedback | Profile  |
+---------------+--------------+
                |
                | HTTP / REST API
                v
+------------------------------+
|       Node.js + Express      |
|                              |
| Routes | Controllers         |
| Validation | Middleware      |
+---------------+--------------+
                |
                | Mongoose
                v
+------------------------------+
|           MongoDB            |
|                              |
| Users | Reports | Alerts     |
| Feedback | Other app data    |
+------------------------------+
Application Workflow
1. A user opens the mobile application.
2. The user proceeds through the application's entry and account screens.
3. The user accesses the main dashboard.
4. To report an incident, the user enters the relevant incident details, such as category, location and description.
5. The app sends the report data to the backend API.
6. The backend processes the request and stores the report data in MongoDB.
7. Report information can then be retrieved for the relevant application functions.
The availability of administrator review, status updates and notification delivery depends on the functionality implemented and configured in the current codebase.
Database
MongoDB is used as the project's NoSQL database. The report describes data collections/models for areas such as:
- Users — user account information.
- Reports — incident descriptions and related report details.
- Alerts — community safety updates.
- Feedback — feedback or complaints submitted by users.
Mongoose is used to define schemas and interact with MongoDB.
Security
The project report discusses the following security measures in its backend design:
- Password hashing using bcrypt.
- JSON Web Tokens (JWT) for token-based authentication.
- Middleware for checking authentication and user roles.
- Role-based access restrictions for sensitive operations.
Implementation note: The report's limitations section also states that authentication and role-based access are not supported in the current version. Treat the measures above as documented design/implementation details and confirm their actual status in the source code before relying on them.
Getting Started
The report identifies Expo CLI, Node.js, MongoDB and a mobile development environment as the main development requirements. The exact repository folder names, environment variable names and npm scripts depend on the code you upload.
Prerequisites
Install or prepare:
- Node.js and npm
- MongoDB (local installation or a MongoDB connection string)
- Expo CLI / Expo development tooling
- Android Studio or an Android device for running the mobile app
- A code editor such as Visual Studio Code
Installation
1. Clone this repository:
   git clone https://github.com/<your-username>/<your-repository-name>.git
   cd <your-repository-name>
2. Install the backend dependencies from the backend project directory:
   cd backend
   npm install
3. Configure the backend environment variables according to the names expected by your backend code. Typical configuration values may include a MongoDB connection string and a server port. Do not commit credentials or secret keys to GitHub.
4. Start the backend using the start script defined in its package.json. For example, if the project defines a start script:
   npm start
5. Open a separate terminal, navigate to the React Native / Expo app directory, and install its dependencies:
   cd frontend
   npm install
6. Start the Expo development server using the script or command configured by the project:
   npx expo start
7. Run the application on an Android emulator or a compatible device. Make sure the mobile app's API base URL points to the backend server and is reachable from that device.
Important: backend and frontend are example directory names. Replace them with the actual folder names in your repository. The commands above are a setup template, not verified project-specific scripts; check the package.json files and backend configuration before running them.

Testing
The project report discusses three levels of testing:
- Unit testing: Checking individual functions and modules.
- Integration testing: Checking communication between the mobile app, backend APIs and database.
- End-to-end testing: Checking complete user flows, such as submitting a report and viewing the resulting application response.
The report also includes test cases for form validation and application workflows. Refer to the actual test results and current source code when documenting the final status of each test.
Current Limitations
The project report identifies the following limitations in the current version:
- User authentication and admin/user role-based access are not available in the reported current version.
- Real-time push notifications for updates or authority responses are not available.
- Automatic GPS-based location detection is not integrated.
- Input validation is basic and does not include advanced spam or false-report detection.
- Backend hosting and infrastructure may not support high traffic at scale.
- The administrator panel and report verification workflow require further development, as noted in the user documentation.
Future Enhancements
Potential improvements identified in the project report include:
- Implementing secure user authentication and role-based access.
- Adding real-time push notifications for urgent community updates.
- Integrating GPS to capture more accurate incident locations.
- Improving validation and adding mechanisms to identify spam or false reports.
- Expanding administrator tools for report review, verification and status management.
- Improving hosting, scalability and performance for larger communities.
- Extending community features and improving the overall user experience.
Project Information
Detail	Information
Project	Community Crime Reporting App
Project type	Final-year academic project
Degree	Bachelor of Science in Information Technology
Academic year	2025–2026
Author	Shagun Pandey
Institution	Karmaveer Bhaurao Patil College of Arts and Commerce, Thane
University	University of Mumbai


Note: This README is based on the submitted project report. Update the setup instructions, screenshots, feature status and repository structure to match the actual source code before publishing the repository