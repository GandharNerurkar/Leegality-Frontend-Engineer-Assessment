# Leegality Frontend Engineer Assessment

Amazon-style product listing and product detail frontend built with React, Vite, Redux Toolkit, React Router, Axios, and CSS Modules using the DummyJSON products API.

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown by Vite in your browser.

4. To create a production build:

```bash
npm run build
```

## Assumptions Made

- The app uses the public DummyJSON products endpoints directly and does not require backend proxying or authentication.
- Category data returned by DummyJSON may be either strings or objects, so the app normalizes categories before rendering.
- Product reviews are shown only when present in the product detail response.
- Filter state, current page, and scroll position should persist across navigation using localStorage.
- Pagination behavior was adjusted to show when filtered results exceed 8 items, based on the latest UI requirement.

## Architectural Decisions

- Redux Toolkit is used for centralized product, filter, pagination, loading, and error state management.
- Async API fetching is handled with `createAsyncThunk` to keep side effects out of components.
- Reusable UI elements such as header, filters, rating, pagination, cards, loading, error, and empty states are split into isolated components.
- Custom hooks (`useProducts`, `useFilters`) keep container logic out of presentational components.
- CSS Modules are used to scope styles per component and make UI refactors safer.
- Route-level code splitting is implemented with `React.lazy` and `Suspense`.
- URL query params are synced with filter state so filtered views can be revisited and shared.
- localStorage persistence is used for restoring filters, page selection, and scroll position when navigating back from the detail page.

## Improvements If Given More Time

- Add automated tests for reducers, hooks, filter behavior, and page-level UI flows.
- Add better skeleton states for the filter sidebar and detail page.
- Improve accessibility further with focus trapping for the mobile filter drawer and richer keyboard interactions.
- Add sorting controls and stronger product discovery features.
- Add a small service layer cache strategy to reduce repeated product detail requests.
- Refine responsive behavior further to match a production ecommerce experience even more closely across edge-case screen sizes.
