# CampusConnect – Integrated MERN + Core Java

A college event-management mini project. React is the UI, Express is the Node API gateway and MongoDB persistence layer, and a Spring Boot service runs the Java business rules.

## Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.8+ (or use an IDE with Maven support)
- MongoDB local instance or Atlas URI

## Run order

### 1. MongoDB
Start MongoDB locally, or obtain an Atlas connection string.

### 2. Java Spring Boot service
```bash
cd java-service
mvn spring-boot:run
```
Check `http://localhost:8080/api/java/health`.

### 3. Node / Express API
In another terminal:
```bash
cd server
npm install
```
Copy `.env.example` to `.env`, update `MONGO_URI` if needed, then:
```bash
npm run dev
```
Node runs at `http://localhost:5000`. It calls Java at `http://localhost:8080`.

### 4. React frontend
In another terminal:
```bash
cd client
npm install
npm run dev
```
Open the Vite URL, normally `http://localhost:5173`.

## Demo flow
1. Open `/admin` and create an event.
2. Return to the homepage and open that event.
3. Register a student.
4. Express loads the event and current registration count from MongoDB.
5. Express calls the Spring Boot validation endpoint.
6. Java applies registration rules and returns approval/rejection.
7. Express persists an approved registration in MongoDB.
8. Admin views the registration and dashboard totals.

## OOP mapping
- Encapsulation: private fields and accessors in `User`, `Event`, `Registration`
- Inheritance: `Student` and `Admin` extend `User`; event types extend `Event`
- Abstraction: abstract `User` and `Event`
- Polymorphism: overridden `getRole`, `getEventType`, `getDisplayLabel`
- Interfaces: `RegistrationPolicy<T>`
- Generics: `RegistrationPolicy<T>`
- Collections: `List<Registration>` in `RegistrationService`
- Exception handling: `EventFullException`, `GlobalExceptionHandler`, Express error handling
- Multithreading: `NotificationService` uses a fixed thread pool and async tasks

## Important notes / limitations
- Java performs the authoritative business-rule validation; Node persists approved registrations. This is a lightweight educational integration, not a production-safe distributed transaction.
- The registration count check can race if two requests arrive simultaneously. For production, move capacity enforcement into an atomic MongoDB operation or a transaction with a unique constraint and retry.
- Admin endpoints have no authentication in this mini-project. Do not expose this demo publicly without adding authentication/authorization.
- Event category mapping in the Java example uses a simple title heuristic to demonstrate polymorphism. For a polished submission, add an explicit `category` field to the Java event DTO and choose the subtype from it.
