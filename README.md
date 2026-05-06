# Mini CRM Application

A simple **Mini CRM (Customer Relationship Management)** application built using **Laravel**, **React**, and **Inertia.js**. This system helps manage client details efficiently with a modern SPA-like experience.

---

## Features

- Manage client information (Create, Read, Update, Delete)
- Responsive UI with React
- Seamless integration using Inertia.js
- Form validation and error handling
- Clean and scalable architecture

---

## Tech Stack

- **Backend:** Laravel
- **Frontend:** React (Inertia.js)
- **Database:** MySQL
- **Build Tool:** Vite

---

## nstallation & Setup

Follow the steps below to set up the project locally.

---

### 1. Clone the Repository

```bash id="c3z9qk"
git clone https://github.com/Mushkir/mini-crm.git
cd mini-crm
```

---

### 2. Install Backend Dependencies

```bash id="2wh1hi"
composer install
```

---

### 3. Install Frontend Dependencies

You can use **npm** or **pnpm**.

#### Using npm:

```bash id="g8ew80"
npm install
```

#### Using pnpm:

```bash id="z7t6l5"
pnpm install
```

---

### 4. Environment Setup

```bash id="9krt5y"
cp .env.example .env
```

Update your database configuration:

```env id="h6s2bj"
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

---

### 5. Generate Application Key

```bash id="9nj9n3"
php artisan key:generate
```

---

### 6. Run Fresh Migrations with Seeders

```bash id="xk6y6s"
php artisan migrate:fresh --seed
```

---

### 7. Run the Application

You have **two options** to run the project:

---

#### Option 1: Run Everything with One Command (Recommended)

```bash id="o1bq3n"
composer run dev
```

> This will start the Laravel server, queue worker, logs, and Vite dev server together.

---

#### Option 2: Run Manually

Start Laravel server:

```bash id="f2cv0z"
php artisan serve
```

Run frontend dev server:

**Using npm:**

```bash id="7s7o8j"
npm run dev
```

**Using pnpm:**

```bash id="r9tb1s"
pnpm run dev
```

---

## Access the Application

```id="3k8kqk"
http://127.0.0.1:8000
```

---

## Project Structure

```id="4c5l7n"
app/
resources/
  └── js/
      ├── Pages/
      ├── Components/
routes/
database/
```

- **app/** → Backend logic
- **resources/js/** → React (Inertia pages & components)
- **routes/** → Web routes
- **database/** → Migrations & seeders

---

## Usage

- Create new clients
- View client list
- Update client details
- Delete clients

---

## Development Notes

- Inertia.js removes the need for a separate API layer
- Laravel handles validation and backend logic
- React handles UI rendering

---

## Contributing

Feel free to fork and submit pull requests.

---

## License

This project is licensed under the MIT License.

---

## Author
