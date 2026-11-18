# CampusConnect

CampusConnect is a lightweight college event-management system built for a Java mini-project. React provides the interface, Express is the API gateway and MongoDB layer, and Spring Boot runs the Core Java registration rules.

## Architecture

`React (5173) → Express API (5000) → Spring Boot Java rules (8080)`

Express stores events and approved registrations in MongoDB. A registration is never stored until the Java API approves it. Express then atomically reserves a seat, so concurrent requests cannot exceed event capacity.

## Project structure

- `client/` — React + Vite UI
- `server/` — Express routes, MongoDB models, and Java API client
- `java-service/` — Spring Boot REST API and Core Java domain logic

## Prerequisites

- Node.js 18 or later
- Java 17
- Maven 3.8 or later
- MongoDB running locally or an Atlas connection string

## Run the application

1. Start MongoDB locally, or create an Atlas database.
2. Start the Java service:

```bash
cd java-service
mvn spring-boot:run
```

Check `http://localhost:8080/api/java/health`.

3. Configure and start Express in a second terminal:

```bash
cd server
copy .env.example .env
npm install
npm run dev
```

Update `MONGO_URI` in `.env` when using Atlas. Express starts at `http://localhost:5000`.

4. Start the React client in a third terminal:

```bash
cd client
npm install
npm run dev
```

Open the Vite address shown in the terminal (normally `http://localhost:5173`).

## API endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/events` | List events |
| GET | `/api/events/:id` | Get one event |
| POST | `/api/events` | Create an event |
| PUT | `/api/events/:id` | Update an event |
| DELETE | `/api/events/:id` | Delete an event and its registrations |
| POST | `/api/registrations` | Validate through Java and save a registration |
| GET | `/api/registrations` | List student registrations |
| GET | `/api/dashboard/stats` | Dashboard totals |
| POST | `:8080/api/java/registrations/validate` | Java business-rule endpoint |

## Demo workflow

1. Go to **Admin dashboard** and create an event.
2. On the home page, search or filter events and open one.
3. Submit student details to register.
4. Express checks for the event and duplicates, sends event details to Java, and only saves Java-approved registrations.
5. Try the same register number again to demonstrate duplicate prevention. Create a capacity-one event to demonstrate the full-event error.
6. Return to Admin to show registrations and live dashboard totals.

## Demo login

- **Student:** select Student and enter a name, register number, department, and email. The student is sent to the events dashboard, and those details prefill the event registration form.
- **Admin:** select Admin and use `admin@campusconnect.edu` with password `admin123`. The admin is sent to the admin dashboard.

This login is intentionally client-side only for the mini-project demonstration. It controls the React interface and is not a replacement for production authentication.

## Core Java OOP mapping

| Concept | Implementation |
| --- | --- |
| Encapsulation | private fields/getters and validation in `model/User.java` |
| Inheritance | `Student` and `Admin` extend `User` |
| Abstraction | abstract `User` and `Event` |
| Polymorphism | `TechnicalEvent` and `CulturalEvent` override event methods |
| Interface + generics | `RegistrationPolicy<T>` implemented by `RegistrationService` |
| Collections | `List<Registration>` in `RegistrationService` |
| Exceptions | `EventFullException` and `GlobalExceptionHandler` |
| Multithreading | `NotificationService` submits asynchronous notification tasks to an `ExecutorService` |

## Team split

- Member 1: React pages/components and Java/Spring Boot business logic.
- Member 2: Express API, MongoDB models, routes/controllers, and Node-to-Java integration.

This demo intentionally has no authentication. Do not expose its admin routes publicly without adding authorization.
