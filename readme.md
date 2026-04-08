GraphQL Profile Page
📌 Overview

This project aims to introduce and practice the GraphQL query language by building a personal profile page. The application connects to the Zone01 Oujda GraphQL API to fetch and display user-specific data such as XP, grades, audits, and more.

The project also includes authentication using JWT and a dynamic UI with SVG-based statistics.

🎯 Objectives
Learn how to use GraphQL queries (basic, nested, and with arguments)
Implement JWT authentication
Build a profile dashboard UI
Display user data dynamically from the API
Create interactive statistics graphs using SVG
Deploy the project online
🔐 Authentication

To access the GraphQL API, users must log in via the authentication endpoint:

POST https://learn.zone01oujda.ma/api/auth/signin
Requirements:
Support login using:
username:password
email:password
Use Basic Authentication (Base64 encoded)
Store the received JWT
Use JWT in GraphQL requests:
Authorization: Bearer <your_token>
Features:
Login page with error handling
Logout functionality (clear token)
📊 Features
👤 Profile Information

The profile displays key user data such as:

User identification (login / id)
Total XP earned
Level
Audit ratio
Skills or grades
📈 Statistics (SVG Graphs)

A dedicated section visualizes user progress using SVG graphs.

At least two graphs are implemented, for example:

XP progression over time
XP earned per project
Pass/Fail ratio
Audit ratio

Graphs can be:

Static or animated
Interactive (hover effects, tooltips)
🧠 GraphQL Usage

This project uses different types of GraphQL queries:

1. Basic Query
   {
   user {
   id
   login
   }
   }
2. Query with Arguments
   {
   object(where: { id: { \_eq: 3323 }}) {
   name
   type
   }
   }
3. Nested Query
   {
   result {
   id
   user {
   id
   login
   }
   }
   }
   🗂️ Database Tables Used
   User
   id
   login
   Transaction (XP)
   amount
   type
   createdAt
   path
   Progress
   grade
   path
   Result
   grade
   type
   Object
   name
   type
   🎨 UI / UX
   Clean and responsive design
   Clear separation between sections
   User-friendly navigation
   Data visualization with SVG
   Focus on readability and usability
   🚀 Hosting

The project is deployed online using one of the following:

GitHub Pages
Netlify
Any preferred hosting platform
🛠️ Technologies Used
HTML / CSS / JavaScript
GraphQL
SVG (for charts)
Fetch API
JWT Authentication
⚠️ Error Handling
Invalid login credentials
API request failures
Empty or missing data
📚 Learning Outcomes

By completing this project, you will gain knowledge in:

GraphQL & GraphiQL
Authentication & Authorization (JWT)
Frontend development
Data visualization using SVG
UI/UX best practices
Deployment and hosting
✅ Conclusion

This project combines frontend development with API interaction, giving you hands-on experience in building a real-world dashboard powered by GraphQL.
