
# LERNG - Backend

Lerng is a platform that allows users to learn Linux for free through interactive courses, quizzes, and learning paths. This repository hosts the backend for the Lerng application, handling core logic, data management, user authentication, and communication with the frontend and database.


## Features

- **User Authentication & Authorization**: Secure sign-up, login, password recovery, and user roles.
- **Course Management**: CRUD operations for courses, including course creation, editing, and deletion(soon) by instructors.
- **Interactive Learning**: Users can follow learning paths with lessons, quizzes, and challenges.
- **Progress Tracking**: Store user progress from quizes and sum it up per course.
- **Search & Filtering**: Search and filter for specific courses.
- **Admin Dashboard**: Manage users, courses, and reports (admin privileges required).



## Demo

See: https://www.lerng.site


## Tech Stack

**Server:** NestJS, JWT, Mailtrap

**Database:** MySQL


## Run Locally

Clone the project

```bash
  git clone https://github.com/kayYZ1/lerng-backend.git
```

Go to the project directory

```bash
  cd lerng-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```


## Environment Variables

Environment variables should be placed in ~/src/config/env.development.

**JWT secrets**

`ACCESS_TOKEN`

`REFRESH_TOKEN`

`PASSWORD_RESET`

**Server port**

`APP_PORT`

**MySQL**

`TYPE`

`HOST`

`PORT`

`USERNAME`

`PASSWORD`

`DATABASE`

**Mailtrap**

`MAIL_HOST`

`MAIL_PORT`

`MAIL_USER`

`MAIL_PASS`


## API Reference

#### soon

****
