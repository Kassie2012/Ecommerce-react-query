# 🛍️ React E-Commerce App (CI/CD + TDD)

This project is a **React E-Commerce application** that demonstrates **Test-Driven Development (TDD)** and a full **Continuous Integration / Continuous Deployment (CI/CD)** pipeline using **GitHub Actions** and **Vercel**.

---

## 🚀 Live Application
🔗 https://ecommerce-react-query.vercel.app/

---

## 🧩 Project Overview

The E-Commerce app allows users to browse, filter, and manage products with a fully functional cart system. It uses **React Query** for Firestore data fetching and caching, and **Redux Toolkit** for cart state management and persistence.  

The CI/CD pipeline automatically:
- Runs unit and integration tests on each push to the `main` branch.  
- Builds the project using Vite.  
- Deploys to Vercel only if all tests pass successfully.

---

## ⚙️ Tech Stack

- **Frontend:** React (Vite)
- **State Management:** Redux Toolkit  
- **Server State & Data Fetching:** React Query  
- **Database:** Firebase Firestore  
- **Testing:** Jest + React Testing Library  
- **Deployment:** GitHub Actions + Vercel  

---

## 🧪 Test-Driven Development (TDD)

- **Unit Tests:**  
  - Two separate React components tested for rendering, state changes, and user interaction.  
- **Integration Test:**  
  - Ensures that adding a product updates the cart correctly.  
- Tests run automatically in CI via Jest.

Run tests locally:
```bash
npm run test:jest
