# 📝 Task Management App

Welcome to the Task Management App! A user-friendly mobile application built with **React Native** that helps you efficiently manage your tasks, categorize them, and track your productivity through insightful statistics.

## 🎥 Demo

![App Demo](/assets/images/gifgit.gif)

> **Note:** Add a short GIF or screen recording showing the app in action to demonstrate its functionality.

## 🌟 Features

**Task Management**: Add, edit, and delete tasks easily.
**Categorization**: Organize tasks into categories for better management.
**Statistics Tracking**: Monitor added and deleted tasks and discover your favorite category.
**User Profile Management**: Upload and manage your profile image for personalization.
**Dark Mode Support**: Toggle between light and dark themes for comfortable viewing.

## 📦 Data Storage

The app utilizes AsyncStorage to persist user data, ensuring that your information remains available even after the app is closed. Here’s what is stored:

**User Profile**:

- **User Name**: Stores the user's name for a personalized experience.
- **User Image**: Saves the user's profile image for display.
- **Task Management**:

- **Task List**: Stores an array of tasks, each with its note and assigned category.
  **User Preferences**:

-**Theme Mode**: Saves the user's preference for dark or light mode.
**Statistics**:

- **Added Tasks Count**: Tracks how many tasks the user has added.
- **Deleted Tasks Count**: Tracks how many tasks have been deleted.
- **Category Counts**: Keeps track of how often each category is used to determine the user's favorite category.

## 🚀 Usage

- **Navigate the App**: Use the bottom navigation to switch between main sections.
- **Manage Tasks**: Tap the "+" button to add new tasks or select existing ones to edit or delete.
- **View Statistics**: Access the Statistics section to see your task metrics and clear statistics when needed.
- **Profile Management**: Select an image for your profile to personalize your experience.

## 🛠️ Technologies Used

- **React Native**: A framework for building native apps using React.
- **Expo**: A platform for universal React applications, simplifying development and deployment.
- **Expo router**: A routing and navigation library for React Native applications.
- **React Native Paper**: A library that provides Material Design components for React Native.
- **Async Storage**: Used for persistent local storage to save user preferences, statistics, and tasks.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and maintainability.
- **Custom Hooks**: For handling specific functionalities like loading fonts and managing theme contexts.
- **Image Picker**: A library for selecting images from the device's library or capturing new profile photos.

## 📸 Screenshots

|                 Light Mode                  |                 Dark Mode                 |
| :-----------------------------------------: | :---------------------------------------: |
| ![Light Mode](/assets/images/lightmode.jpg) | ![Dark Mode](/assets/images/darkmode.jpg) |

## ⚙️ Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Bartosz-Kow/TODO
   ```
2. Navigate to the project directory:

```bash
   cd Todo
```

3. Install the necessary dependencies:

```bash
   npm install
```

4. Run the app:

```bash
    npm start
```

**Author**: Bartosz Kowynia
