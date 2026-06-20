# Kidora1 MIS - Child Development & Parenting Platform

Kidora1 is a comprehensive Management Information System (MIS) designed to support parents and educators in child behavior management, trauma awareness, and emotional intelligence. This platform bridges the gap between behavioral science and daily parenting through interactive tools and AI-driven guidance.

---

## 🚀 Key Features

### 1. Interactive Learning Systems
*   **Learning Modules:** Structured courses on Neuroscience, Parenting Styles, and Communication. Features progress tracking and difficulty-based content.
*   **Behavioral Simulator:** A "practice-before-you-act" tool where parents can test responses to common triggers (e.g., grocery store tantrums) and see immediate behavioral outcomes.
*   **Emotion Cards:** Empathy-building tools that reveal the "hidden messages" behind complex child behaviors like defiance or withdrawal.

### 2. AI Support Center (AIBOT)
*   **Intelligent Routing:** A custom AI assistant that interprets user queries about child behavior and directs them to the most relevant learning resources or tools.
*   **Contextual Guidance:** Helps users navigate the platform by understanding natural language intents like "How do I handle anger?" or "I want to practice a scenario."

### 3. Resource & Media Library
*   **Multimedia Content:** A curated collection of books (PDFs), video guides, and audio tracks (e.g., calming lullabies) for deep-dive learning.

### 4. Admin Management
*   **Role-Based Access:** Dedicated dashboards for Parents (learning focused) and Admins (management focused).
*   **Audit Logging:** Comprehensive tracking of all system activities, including logins and administrative changes.
*   **Real-time Notifications:** A central alert system for system updates, donor activities, and module completions.

---

## 🛠 Tech Stack
*   **Frontend:** Vanilla HTML5, CSS3, ES6 JavaScript.
*   **Backend:** PHP (using PDO for secure, prepared SQL statements).
*   **Database:** MySQL (Relational schema with JSON support for simulators).
*   **Design:** Modern, responsive UI with Glassmorphism elements and CSS Grid/Flexbox.

---

## 📦 Installation & Setup

### Prerequisites
1.  **XAMPP** installed on Windows.
2.  **Apache** and **MySQL** services running.

### Step-by-Step Setup
1.  **Project Placement:**
    *   Place the `kidora1` folder in `C:\xampp\htdocs\`.
2.  **Database Configuration:**
    *   Open **PHPMyAdmin** (http://localhost/phpmyadmin).
    *   Click the **SQL** tab.
    *   Open the file `full_setup.sql` from the project root.
    *   Copy **all** content from `full_setup.sql`, paste it into the PHPMyAdmin SQL box, and click **Go**.
    *   *This will automatically create the `kidora1_db` database, set up all tables, and seed it with initial data.*
3.  **Access the App:**
    *   Navigate to `http://localhost/kidora1/` in your browser.

### Default Admin Credentials
*   **Email:** `admin@kidora1.com`
*   **Password:** `password`

---

## 🧠 System Architecture

### 1. The Database (MySQL)
The system uses 12 interconnected tables. Notable implementations include:
*   **`simulator_scenarios`:** Uses a `JSON` column to store branching options and outcomes, allowing for flexible "choose-your-own-adventure" logic without complex table joins.
*   **`activity_logs` & `notifications`:** Ensure system accountability and real-time user engagement.

### 2. AI Logic (AIBOT)
The AI support system (`api/ai_support.php`) operates on an **Intelligent Keyword Routing** engine:
*   **Intent Detection:** It parses user input for core behavioral keywords (e.g., "anger", "tantrum", "learn").
*   **Contextual Response:** Instead of generic chat, it provides a scientific explanation and a direct "Deep Link" to the specific platform feature that solves the user's problem.
*   **Scalability:** The logic is abstracted to allow for future integration with LLM APIs (like Gemini or OpenAI) by simply replacing the router logic with an API call.

### 3. Backend (PHP)
*   **Security:** All database interactions use `PDO` with prepared statements to prevent SQL injection.
*   **Session Management:** Role-based sessions ensure that admins can access management tools while parents only see their personal progress and modules.

---

## 📂 Folder Structure
*   `/api`: PHP backend scripts (auth, AI, database connection).
*   `/js`: Frontend logic, broken down by feature (auth.js, dashboard.js, etc.).
*   `/styles`: Modular CSS files for the UI system.
*   `/images`: Asset library for modules and UI elements.
*   `/deprecated_sql`: Original schema files kept for reference (use `full_setup.sql` for new installs).

---

© 2026 Kidora1 MIS. Built for Parent Support and Child Behavioral Excellence.
