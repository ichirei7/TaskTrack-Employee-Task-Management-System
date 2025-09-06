# 🗂️ TaskTrack – Employee Task & Time Tracking System

**TaskTrack** is a full-stack Employee Task Management System built with **React, Spring Boot, and MySQL**.  
It provides a centralized platform for managing projects, assigning tasks, tracking time, and generating productivity reports.  
The system includes a **Kanban Board with drag-and-drop support**, time tracking, and reporting features to help teams stay organized and productive.  

---

## 🚀 Features

- 🔐 User authentication & role-based access (Manager / Employee)  
- 📋 Project & task management  
- 📌 Kanban board with **drag-and-drop** task updates  
- ⏱️ Automatic time tracking  
- 📊 Reporting dashboard with visualizations  
- 📨 RESTful APIs built with Spring Boot  
- 💾 Persistent storage with MySQL  

---

## 🛠 Tech Stack

### Frontend (React)
- **React 19** – UI framework  
- **React Router DOM** – Routing  
- **Axios** – API requests  
- **JWT Decode** – Token-based authentication  
- **Material UI (MUI)** – UI components & icons  
- **Emotion** – Styling (CSS-in-JS)  
- **Hello Pangea DnD** – Drag & Drop Kanban board  
- **Recharts** – Charts & analytics  


### Backend (Spring Boot)
- **Spring Boot** – REST API & business logic  
- **Spring Security + JWT** – Authentication & authorization  
- **Spring Data JPA (Hibernate)** – ORM layer  
- **Maven** – Dependency management  

### Database
- **MySQL** – Relational database
  
---

## 🔧 Setup Frontend (React)

### Navigate to the frontend folder:
cd frontend

#### Install dependencies (node modules)
npm install

### Run development server
npm start  

### Build for production
npm run build  

## 🔧 Backend Setup (Spring Boot)

### Open the `backend` folder in your IDE (IntelliJ / Eclipse).  
### Configure your database connection in `src/main/resources/application.properties`:  

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/tasktrack
   spring.datasource.username=root
   spring.datasource.password=yourpassword

   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
```
### Make sure MySQL is running and a database named tasktrack exists:
CREATE DATABASE tasktrack;
### Run the Spring Boot application using Maven:
mvn spring-boot:run
### The backend will start at http://localhost:8080

### 📸 Screenshots
 (Coming soon)
### 📜 License

This project is licensed under the MIT License.
