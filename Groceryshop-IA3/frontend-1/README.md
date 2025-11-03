# Frontend of Online Grocery Store

This directory contains the frontend code for the Online Grocery Store application, built using React and TypeScript. The application is structured to provide a seamless user experience for browsing and purchasing groceries online.

## Project Structure

- **public/index.html**: The main HTML file that serves as the entry point for the React application.
- **src/main.tsx**: The entry point for the React application, rendering the App component.
- **src/App.tsx**: The main App component that sets up the application structure, including routing and layout.
- **src/index.css**: Global CSS styles for the application.
- **src/api/api.ts**: Functions for making API calls to the backend, such as fetching products and handling authentication.
- **src/components/ui/**: Contains reusable UI components:
  - **Button.tsx**: A reusable button component.
  - **Card.tsx**: A card component for displaying content.
  - **Modal.tsx**: A modal component for displaying dialogs.
- **src/components/**: Contains specific components for the application:
  - **ProductCard.tsx**: Displays individual product information.
  - **ProductList.tsx**: Renders a list of ProductCard components.
  - **Header.tsx**: Displays navigation and branding.
- **src/pages/**: Contains page components:
  - **Home.tsx**: The landing page of the application.
  - **ProductDetails.tsx**: Displays detailed information about a selected product.
  - **Cart.tsx**: Displays the user's shopping cart.
  - **Auth.tsx**: Handles user authentication (login/signup).
- **src/hooks/useCart.ts**: A custom hook for managing the shopping cart state.
- **src/context/ThemeContext.tsx**: Context provider for managing theme-related state.
- **src/styles/**: Contains SCSS files for styling:
  - **variables.scss**: SCSS variables for consistent styling.
  - **globals.scss**: Global SCSS styles.
- **src/routes/index.tsx**: Sets up routing for the application using React Router.
- **src/types/index.d.ts**: TypeScript type definitions used throughout the application.

## Getting Started

To get started with the frontend development:

1. Navigate to the `frontend` directory.
2. Install the dependencies using `npm install`.
3. Start the development server with `npm start`.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.