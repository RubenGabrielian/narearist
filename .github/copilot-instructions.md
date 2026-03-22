# AI Coding Agent Instructions for Nare Project

## Project Overview
A Laravel 12 + React 19 full-stack application for managing book chapters and gallery content. Uses Inertia.js to bridge backend and frontend, session-based admin authentication (no database users), and file uploads to storage.

## Architecture & Data Flow

**Tech Stack:**
- **Backend:** Laravel 12 with Inertia.js
- **Frontend:** React 19 + Tailwind CSS v4 + Vite
- **Database:** SQLite (testing), configurable in production
- **Auth:** Session-based (credentials in `.env`, not DB)
- **Forms:** CKEditor 5 for rich text editing

**Core Models** (`app/Models/`):
- `Chapter`: `chapter_number` (unique), `title`, `content` (longText for CKEditor), `image` (nullable path)
- `GalleryImage`: `chapter_number`, `image_path` (stored in `storage/app/public`), `alt` (optional)
- `User`: Minimal—for Laravel Auth scaffolding, not used in admin flow

**Request Flow:**
1. Routes (`routes/web.php`) serve Inertia pages or API endpoints
2. Controllers (`AdminAuthController`, `AdminChapterController`, `AdminGalleryController`) validate input and fetch data
3. Data passed as props to React components (`resources/js/Pages/`)
4. Frontend uses Axios (via `resources/js/bootstrap.js`) for dynamic requests
5. Admin checks middleware (`EnsureAdminAuthenticated`) for session flag `is_admin_authenticated`

## Key Conventions & Patterns

**Admin Authentication:**
- NO database Users table for admin login
- Credentials: `ADMIN_LOGIN` and `ADMIN_PASSWORD` env vars (default: `admin`/`admin123`)
- Session key: `is_admin_authenticated` (boolean) + `admin_login` (for display)
- All `/admin/*` routes protected by `admin.auth` middleware

**Form Validation:**
- Centralized validation in controllers (e.g., `validateChapter()` method)
- `chapter_number` must be unique; when updating, use `unique:chapters,chapter_number,{id}` syntax
- Return `redirect()->route('admin.xxx')->with('success', '...')` for flash messages

**File Storage:**
- Gallery images: stored in `storage/app/public/` via Laravel's disk
- Symlink: `php artisan storage:link` required for public access (`/storage/` URLs)
- Paths stored in DB (relative), accessed as `/storage/{image_path}`

**React/Inertia Patterns:**
- Pages loaded via `Inertia::render('PageName', [props])`
- CKEditor 5 imported as `@ckeditor/ckeditor5-react` with deduped resolution (see `vite.config.js`)
- Tailwind v4: Vite plugin auto-applies (no manual `@apply` chains needed)

**Naming Conventions:**
- Controllers: `Admin{Resource}Controller` (e.g., `AdminChapterController`)
- Routes: kebab-case URLs, snake_case route names (e.g., `admin.chapters.store`)
- Models: PascalCase, singular (e.g., `Chapter`, not `Chapters`)

## Development Workflows

**Local Setup:**
```bash
composer run setup        # Installs dependencies, runs migrations, builds frontend
composer run dev          # Concurrent server, queue, logs, Vite dev server
# OR manually:
php artisan serve & npm run dev  # In separate terminals
```

**Database:**
- Migrations: `database/migrations/` (auto-run on `setup`)
- Seeds (if needed): Place in `database/seeders/DatabaseSeeder.php`
- Testing: Uses in-memory SQLite (see `phpunit.xml`)

**Testing:**
```bash
composer run test         # Runs PHPUnit (Unit + Feature suites)
```

**Building for Production:**
```bash
npm run build            # Bundles React/CSS via Vite (outputs to `public/build/`)
```

## Critical Integration Points

**Inertia Middleware** (`HandleInertiaRequests`):
- Shares data globally (check `app/Http/Middleware/HandleInertiaRequests.php` for shared props)
- Inertia::render() auto-merges shared props with page-specific ones

**CSRF Protection:**
- Laravel automatic for POST/PUT/DELETE (token in session)
- Axios configured in `bootstrap.js` to add `X-CSRF-TOKEN` header

**File Upload Validation:**
- Use `$request->validate(['file' => 'required|image|max:2048'])` (size in KB)
- Store via `$request->file('file')->store('path', 'public')`

**CKEditor Integration:**
- Config in component: `<CKEditor editor={ClassicEditor} data={content} onChange={...} />`
- Returns HTML; store directly in longText column

## When Unsure—Reference These Files

- **Routes & middleware binding:** `routes/web.php` (line 33+ shows `/admin` group structure)
- **Session-based auth logic:** `AdminAuthController::login()` (validates against env vars)
- **Model relationships:** Models are simple; check migrations for schema if relationships needed
- **Component props:** Return statements in `AdminAuthController` methods show exact prop structure
- **Validation rules:** `AdminChapterController::validateChapter()` for chapter-specific logic

## Common Tasks

**Add a new admin page/feature:**
1. Create controller method in `AdminAuthController` → `Inertia::render()`
2. Add route under `/admin` prefix with `admin.auth` middleware
3. Create React component in `resources/js/Pages/Admin/`
4. Pass data as props from controller

**Update Chapter schema:**
1. Create migration: `php artisan make:migration add_xxx_to_chapters_table`
2. Add column to `Chapter` model `$fillable`
3. Update validation in `AdminChapterController::validateChapter()`

**Debug session/auth issues:**
- Check `$request->session()->get('is_admin_authenticated')` in controller
- Session driver: `file` (local) or `cookie` (production—see config)
