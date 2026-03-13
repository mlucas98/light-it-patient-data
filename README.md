# Light It | Patient Data Managment

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Development

The app has a simulated login system. **Sign in with the following credentials:**

_jdoe@example.com_  
_test123_

## About the project

### Framework

The project is built using **_react-router v7_** (former Remix). Robust, simple, scalable, and with SSR and Tailwind 4 included in base project to get on track fast and easy. I chose **_react-router_** since it has the possibility to run server and client actions in each route so as to provide a clean project structure.

### General comments

The project counts with a bunch of simulated behaviour since it was not the objective of the challenge (login, persisting data). Nevertheless, it includes the necessary structure and components to scale: apiClient, authenticated routes, components ready to reuse and global error boundary.

### Furhter improvements

The project could still imporve working on more detailed error handling, the creation of a drag & drop component to handle patients avatar, better cookie handling and skeletons for loading UI (maybe even streaming from server to client).

### Libraries

The project uses a couple of libraries for basic styling and performance:

- **_Taliwind 4_**: primitive library with a wide amount of CSS classes to manage elements and pseudo-classes in a simple way
- **_react-hook-form_**: in charge of handling states and submission of more complex forms (ex: PatientForm)
- **_axios_**: HTTP library for making HTTP Requests
- _**lucide-react**_: light and performant icon library
