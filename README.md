# Pets United - Eulerity Take-Home Challenge

## Overview
Pets United is a responsive, modern web application built for the Eulerity Front-End Take-Home Challenge. It consumes the `/pets` API to display a curated gallery of pets, complete with advanced filtering, sorting, selection management, and bulk image downloading.

## How It Works & Challenge Rules Followed

### 1. Technology Stack & UI/UX
- **React & TypeScript:** Bootstrapped via Vite for rapid, strongly-typed development.
- **`styled-components`:** Used exclusively for all UI styling. We implemented a modern "glassmorphism" aesthetic with strict adherence to the responsive grid constraints:
  - 1 column on Mobile (< 768px)
  - 2 columns on Tablet (768px - 1024px)
  - 4 columns on Desktop (> 1024px)

### 2. Routing (`react-router-dom`)
Client-side routing is handled via `react-router-dom`, featuring:
- `/` - Main Gallery view containing the image grid, search, and sorting toolbar.
- `/pets/:slug` - A dynamic detail view for each pet. 
- `/about` - A dedicated About page.

### 3. Custom Hook Data Management (`usePetsData`)
Data fetching logic is decoupled into a dedicated custom hook (`src/hooks/usePetsData.ts`). 
- **States Explicitly Handled:** The hook actively manages and returns `data`, `loading`, `error`, and `empty` states. 
- To prevent redundant network requests when navigating between routes, this hook feeds into a global `PetsContext` so the API payload is only requested once on initial load.

### 4. Global & Local State Management
- **Local State:** Used for highly localized UI interactions such as the search bar input string and the currently selected sorting option inside the `Toolbar` component.
- **Global State (`SelectionContext`):** Selection state *must* persist across the application. When a user selects pets on the gallery page, navigates to a detail page, and returns, their selections are securely persisted in a global Context. This Context also tracks and calculates the estimated total file size of all selected images on the fly.

### 5. Infinite Scroll
To manage performance and provide a smooth user experience, an **Intersection Observer** was implemented for the gallery. The application initially renders a small batch of images (8 items) and lazily loads more as the user scrolls towards the bottom of the page, satisfying the pagination/infinite scroll requirement while keeping DOM nodes minimal.

### 6. Interactive Features
- **Select All & Clear Selection:** Users can bulk toggle the currently filtered dataset.
- **Sorting:** Users can sort the dataset dynamically:
  - Name (A-Z) and (Z-A)
  - Date (Newest First) and Date (Oldest First) - Chronological sorting is achieved by safely parsing the UTC string provided by the API into timestamp integers.
- **Searching:** A real-time case-insensitive search bar filters the displayed pets by evaluating both their `title` and `description` fields.

### 7. Downloading Images
To satisfy the bulk download requirement elegantly without triggering aggressive browser pop-up blockers, the application utilizes `jszip` and `file-saver`. Selected images are fetched programmatically (stripping the `?format=tiny` parameter to capture the high-resolution version), bundled into an archive directly in the client's browser, and presented as a single `eulerity-pets.zip` download.

## Running the Project Locally

```bash
# Install the required dependencies
npm install

# Start the Vite development server
npm run dev
```
