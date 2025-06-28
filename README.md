## Context  
Simple Store implements a basic online shop using **Next.js** and the **Fake Store API** for product data.

### Store Catalog Page

![Store catalog page](/project_image/image.png)

### Store Product Page

![Product page](/project_image/image%20copy.png)


## Features

- **Dynamic Product Catalog**  
  - Fetches product information from the [Fake Store API](https://fakestoreapi.com/)  
  - Generates a dedicated page for each product  
  - Filter system to narrow down offerings by category, price range, etc.

- **Authentication**  
  - Simple **Login** and **Register** forms (accept any input)  
  - User data stored in `localStorage` and persisted across page reloads  
  - **Logout** function to clear the session

- **UI**  
  - **Responsive design** optimized for mobile, tablet, and desktop  
  - Built with [Tailwind CSS](https://tailwindcss.com/) for utility-first styling  
  - Icons provided by [Font Awesome](https://fontawesome.com/)


```bash
# Recommended
npm install
# or
yarn install
# or
pnpm install
