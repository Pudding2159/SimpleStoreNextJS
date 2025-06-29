"use client";
import ProtectedRoute from './auth/ProtectedRoute';
import { Header } from "./components/Header";
import Catalogue from './components/Сatalogue';
import Footer from "./components/Footer";

export default function Home() {
  return (
    <ProtectedRoute>
      <Header />
      <Catalogue />
      <Footer />
    </ProtectedRoute>
  );
}