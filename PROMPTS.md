# Prompts Log

This file contains a log of the architectural and development prompts sent to the AI coding assistant (Gemini/Antigravity) during the implementation of the Eulerity Take-Home Challenge.

## Prompt 1: Initial Requirements & Architectural Planning
**Developer:**
> I've been assigned the Eulerity front-end coding challenge. The core requirements include building a React/TypeScript application that fetches a list of pet images from the `/pets` API endpoint, displays them in a responsive grid, and supports advanced features like infinite scrolling, global state persistence (for selections across dynamic routes), and bulk image downloading via a zip file. 
> 
> Before we write any code, please analyze the provided requirements and draft a comprehensive architectural plan. I want to review your proposed component structure, global state management strategy (Context API vs. Redux), and how you intend to handle cross-origin image downloading and file size estimations. Let's align on the architecture first.

*(The AI read the external webpage, generated a detailed implementation plan, and requested feedback).*

## Prompt 2: Refining Edge Cases & Implementation Details
**Developer:**
> Please review the proposed architecture against the challenge specifications to ensure all edge cases are covered. Specifically, detail how we will handle the `?format=tiny` query parameters on the images to ensure we display and download high-resolution versions. Additionally, clarify the exact Intersection Observer implementation for the infinite scroll, and verify that our date parsing strategy for chronological sorting handles the API's specific string date format accurately.

*(The AI revised the plan, adding specific solutions for handling Pexels image formats, utilizing JSZip for bulk downloads, and explicitly tracking sorting and layout logic).*

## Prompt 3: Execution & Scaffolding
**Developer:**
> The implementation plan looks solid. Let's proceed with execution. Scaffold the Vite project, establish the React Context providers for global state, and build out the UI adhering strictly to the responsive breakpoints (1-column mobile, 2-column tablet, 4-column desktop) and the styled-components design system we discussed.

*(The AI scaffolded the Vite project, built the context, UI components, custom hooks, and pages, and resolved TypeScript configuration issues before delivering the final built project).*

## Prompt 4: Documentation & Submission Prep
**Developer:**
> As part of the final submission requirements, please generate a `PROMPTS.md` file in the root directory. This file should chronicle our iterative prompting process, demonstrating how we moved from architectural planning to execution, and detailing the specific instructions used to guide the development process.

*(The AI generated the initial PROMPTS.md file).*

## Prompt 5: Comprehensive README Documentation
**Developer:**
> The core implementation is complete. Next, please draft a comprehensive `README.md` file. It must document the project architecture, explicitly map out how we satisfied each of the challenge requirements (e.g., `styled-components`, `react-router-dom`, Custom Hooks for Data, Global/Local State, and Infinite Scroll), and provide clear local development instructions.

*(The AI drafted and overwrote the default Vite README with a detailed project overview).*

## Prompt 6: Mobile Viewport Optimization & QA Fixes
**Developer:**
> After conducting QA on smaller viewports (Mobile S, M, L), I've identified several UI regressions. Specifically, there's unwanted horizontal scroll causing vacant space on the right side of the screen, and the Toolbar elements (search box, sorting dropdown, and selection actions) are severely cramped. Please audit our responsive CSS, fix the padding issues causing horizontal overflow, and implement flex-wrapping to ensure a polished mobile experience.

*(The AI audited the layout components and implemented responsive flex-wrap and padding fixes for mobile viewports).*

## Prompt 7: Debugging Infinite Scroll & Sorting Lifecycle
**Developer:**
> I've discovered a bug when combining the sorting operations with our infinite scroll implementation. The initial A-Z sort works correctly, but when switching to Z-A, the Intersection Observer fails to re-trigger, capping the view at the initial 8 items. Please investigate the React lifecycle and dependencies managing the `visibleCount` and observer ref. Refactor the observer to use a `useCallback` ref to ensure it reliably reconnects to the DOM node when the underlying `pets` array is re-ordered. (Note: Date sorting behaves correctly given the identical timestamps in the API response).

*(The AI refactored the IntersectionObserver to use a callback ref, successfully fixing the infinite scroll bug during array re-ordering).*