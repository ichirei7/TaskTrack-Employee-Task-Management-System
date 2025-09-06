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

## 🔧 Frontend Setup (React)

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

The backend will start at http://localhost:8080

---

## 📸 Screenshots
Manager Dashboard with Kanban Board overview
<img width="1920" height="1080" alt="Screenshot 2025-09-06 112807" src="https://github.com/user-attachments/assets/0df40b20-5fae-4497-95f4-f7656a280a8a" />

Creating new task
<img width="1920" height="1080" alt="Screenshot 2025-09-06 112853" src="https://github.com/user-attachments/assets/a3bb2adb-13bb-4954-bbca-ddb60243804e" />

Reports overview
<img width="1920" height="813" alt="Screenshot 2025-09-06 112927" src="https://github.com/user-attachments/assets/daf9a29c-8d5e-454c-9b38-af92c3593898" />

Employee Dashboard overview
<img width="1920" height="1080" alt="Screenshot 2025-09-06 112949" src="https://github.com/user-attachments/assets/bd53baf3-b7ac-46ff-b62c-d24982baf096" />

## 📜 License

This project is licensed under the MIT License.
