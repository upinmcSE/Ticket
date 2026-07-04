# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server at localhost:5173
npm run build    # Production build → dist/
npm run preview  # Preview production build
npm run lint     # ESLint check (no autofix script; use eslint . --fix manually)
```

No test runner is configured.

## Architecture

**Stack:** React 19, React Router v7, Vite 8, Axios, lucide-react icons. Plain CSS (no CSS-in-JS). JavaScript only (no TypeScript).

**Routes** (`src/App.jsx`):
- `/` → `Home` (aggregates Hero, SearchBox, Features, TicketListing sections)
- `/tickets` → `TicketsPage` (full listing with filters/sorting)
- `/ticket/:id` → `TicketDetailPage`

**API layer** (`src/services/api.js`): Axios instance with base URL `http://localhost:1122/ticket`. Backend wraps all responses in `{ result: ... }`. Two methods: `ticketService.getActiveTickets()` and `ticketService.getTicketById(id)`. The backend URL is hardcoded — change it there when deploying.

**State:** Local `useState`/`useEffect` per component. No global store.

**Styling:** Design tokens are defined as CSS custom properties in `src/index.css` — colors (primary `#1a365d`, accent `#f6ad2b`), spacing (8px scale), shadows, transitions. Components use inline `style` props for component-specific rules and global CSS classes for shared patterns. Responsive breakpoints: 768px (mobile), 1024px (tablet), 1200px (desktop).

**Locale:** Vietnamese (`lang="vi"`, prices formatted with `vi-VN` locale).

## Cart & Booking Flow

**Routing bổ sung (`src/App.jsx`):**
- `/cart` → `CartPage` (tóm tắt vé, xác nhận thanh toán)
- `/booking-success` → `BookingSuccessPage` (xác nhận đặt vé thành công)

**State flow:**
- User chọn số lượng vé ở `TicketDetailPage` → click "Đặt vé" → navigate `/cart` kèm state `{ ticket, quantity }`
- Sau xác nhận → navigate `/booking-success` kèm state `{ bookingCode, ticket }`
- Không dùng global state — truyền qua `useLocation().state` của React Router v7

**API layer (`src/services/api.js`):**
- `ticketService.createBooking({ ticketId, quantity })` — POST `/api/bookings`, trả về `{ bookingCode }`