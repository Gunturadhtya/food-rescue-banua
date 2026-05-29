# Food Rescue Banua

Food Rescue Banua is a platform connecting local food merchants with users to rescue surplus food, reducing food waste and saving money.

## Design Philosophy

We adhere to a Software Architect mindset. This codebase prioritizes long-lasting, maintainable code over quick, easy hacks. Contributors are expected to follow SOLID principles, Clean Architecture patterns, and the established Laravel best practices. We rely on discrete, single-purpose Action classes (e.g., `App\Actions\Profile\CalculateRescueStatsAction`) to encapsulate business logic instead of bloated controllers.

## Tech Stack

* **Backend:** Laravel (PHP 8.3+), Pest PHP for testing
* **Frontend:** React 19, Inertia.js v3, Tailwind CSS v4, Radix UI Primitives
* **Authentication:** Laravel Fortify (Headless Auth), Passkeys Support
* **Routing:** Laravel Wayfinder
* **Database:** PostgreSQL / MySQL (configurable via `.env`)

## Prerequisites

* PHP 8.3 or higher
* Composer 2.x
* Node.js 22.x or higher
* NPM or PNPM

## Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd food-rescue-banua

```


2. **Install dependencies**
```bash
composer install
npm install

```


3. **Environment Setup**
```bash
cp .env.example .env
php artisan key:generate

```


*Configure your database settings in the `.env` file.*
4. **Database Migration & Seeding**
```bash
php artisan migrate --seed

```


5. **Generate Wayfinder Routes**
To ensure the frontend has the typed backend routes:
```bash
php artisan wayfinder:generate --with-form

```


6. **Run the Development Server**
```bash
npm run dev

```


This will execute `concurrently` to start the Laravel local server, the Vite development server, the queue listener, and the Pail log viewer all at once.

## Available Commands

* `npm run dev` - Starts the complete development environment.
* `npm run build` - Builds frontend assets for production.
* `npm run format` - Formats frontend code using Prettier.
* `npm run lint` - Lints frontend code using ESLint.
* `composer lint` - Formats backend PHP code using Laravel Pint.
* `php artisan test` or `./vendor/bin/pest` - Runs the Pest test suite.

## Collaboration Guidelines

1. **Strict Types & Static Analysis**: Maintain strict typing wherever possible. Run `npm run types:check` for frontend TypeScript validation.
2. **Code Formatting**: Ensure all code passes `composer lint` and `npm run format:check` before pushing. This is enforced via GitHub Actions.
3. **Database Performance**: Avoid N+1 queries. Eager load relationships using `with()`. The app has `Model::preventLazyLoading()` enabled in development.
4. **UI Components**: Check `resources/js/components/ui` for existing Radix-based components before introducing new ones.
5. **Wayfinder**: Always use Wayfinder generated route functions (e.g., `store.post()`, `store.form()`) on the frontend instead of hardcoding API paths.