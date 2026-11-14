# Context & Role
You are an expert full-stack developer specializing in **Next.js (App Router)**, **TypeScript**, and **Modern Full-Stack Architecture**. 

I am building a web application and need to implement a complete client-portal system with role-based access control (Admin vs. User), dynamic dashboards, and a robust backend/database integration.

---

## 1. Project Overview & Requirements

I want to introduce a new route `/client` accessible via the Navbar, serving as an authentication gateway and portal for two user roles:
1. **Regular Client (User)**
2. **Administrator (Admin)**

### A. Authentication & Routing Flow
- Navigation item in Navbar: `Client` pointing to `/client`.
- If not authenticated, visiting `/client` presents an authentication screen (Sign In / Sign Up tabs or toggle).
- Support a predefined, seeded **Admin Account** (credentials hardcoded via environment variables or seeded directly into the database) for instant admin access.
- Role-based redirect upon login:
  - **Client (`USER`)** -> Redirected to `/client/portal` (Client Dashboard).
  - **Admin (`ADMIN`)** -> Redirected to `/client/admin` (Admin Management Dashboard).
- Secure middleware and server-side session checks protecting both routes from unauthorized access.

### B. Client Portal (`/client/portal`)
When a client logs in, they should see their personal project dashboard containing:
1. **Financial Summary:**
   - Total Amount Due / Project Cost.
   - Total Amount Paid.
   - Remaining Balance (auto-calculated: `Total - Paid`).
2. **Deliverables & Assets:**
   - Dedicated, clickable card/button with the **Google Drive link** containing their project deliverables/raw footage.
3. **Project Brief & Scope:**
   - Summary of their project brief, goals, deliverables list, and status (e.g., *In Progress*, *Review*, *Completed*).
4. **Shooting / Production Suggestions:**
   - Section displaying tailored suggestions, shot lists, styling tips, or creative moodboard ideas provided by the admin.

### C. Admin Dashboard (`/client/admin`)
When the admin logs in, they should see:
1. **Client Management Table/Grid:**
   - Overview of all registered clients (Name, Email, Project Status, Total, Paid, Remaining).
   - Search & filter functionality (by name, status, or payment status).
2. **Client Detail & Edit Drawer/Page:**
   - Capability to view and update any specific client's data:
     - Update Financials (`totalAmount`, `paidAmount`).
     - Update Google Drive link.
     - Edit project brief, status, and production/shooting suggestions.
3. Real-time or optimistic UI feedback upon updating client data so changes reflect immediately for the client.

---

## 2. Technical Stack Recommendations Needed

Please provide concrete architectural recommendations and implementation choices for:
1. **Database & ORM:** Recommend the best pairing for Next.js (e.g., PostgreSQL with Prisma/Drizzle or Supabase).
2. **Authentication:** Recommend the cleanest integration (e.g., NextAuth.js / Auth.js v5 or Supabase Auth) handling role-based sessions (`role: 'ADMIN' | 'USER'`).
3. **State & Styling:** Suggest standard patterns using Tailwind CSS and shadcn/ui components.

---

## 3. Required Deliverables & Implementation Steps

Please structure your response with complete, production-ready code examples:

### Step 1: Database Schema
- Provide the complete schema file (Prisma or Drizzle) defining:
  - `User` model (including roles: `ADMIN`, `USER`).
  - `ClientProfile` / `Project` model with fields:
    - `userId` (relation)
    - `totalAmount` (Float / Decimal)
    - `paidAmount` (Float / Decimal)
    - `driveUrl` (String, nullable)
    - `projectBrief` (Text)
    - `shootingSuggestions` (Text / JSON array)
    - `status` (Enum: `PENDING`, `IN_PROGRESS`, `COMPLETED`)
    - Timestamps.
- Include database seed script to auto-generate the default Admin account.

### Step 2: Authentication & Route Protection
- Configuration for Auth handler with JWT callbacks passing the `role` and `id` to the session.
- Next.js `middleware.ts` protecting `/client/portal` and `/client/admin` based on user roles.

### Step 3: Server Actions / API Handlers
- Server Action for client login/signup.
- Server Action for admin to update a client's project details (financials, drive URL, brief, suggestions).
- Data fetching server functions with revalidation (`revalidatePath`).

### Step 4: UI Components & Pages (Next.js App Router)
1. `/app/client/page.tsx` — Clean Auth screen (Sign In & Sign Up forms with client/server validation).
2. `/app/client/portal/page.tsx` — Responsive, clean client dashboard UI with statistics cards, progress bars, and resource links.
3. `/app/client/admin/page.tsx` — Admin dashboard with client data table and an edit modal/form to update values.

Provide clean, modular TypeScript code with robust error handling and loading states.