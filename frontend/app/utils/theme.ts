import { useState } from "react";

// Utilidade de tema otimizada para Tailwind v4.1
export type Theme = "light" | "dark" | "system";

const THEME_KEY = "theme";

// Função para detectar preferência do sistema
function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Função para aplicar tema no documento
function applyTheme(theme: "light" | "dark") {
  if (typeof document === "undefined") return;
  
  const root = document.documentElement;
  
  // Remove todas as classes de tema
  root.classList.remove("light", "dark");
  
  // Adiciona a classe do tema atual
  root.classList.add(theme);
  
  // Para compatibilidade com Tailwind v4, também define o atributo data-theme
  root.setAttribute("data-theme", theme);
  
  console.log(`Tema aplicado: ${theme}`);
}

// Função para obter o tema atual
export function getTheme(): Theme {
  if (typeof window === "undefined") return "system";
  
  const stored = localStorage.getItem(THEME_KEY);
  if (stored && (stored === "light" || stored === "dark" || stored === "system")) {
    return stored as Theme;
  }
  
  return "system";
}

// Função para definir o tema
export function setTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  
  localStorage.setItem(THEME_KEY, theme);
  
  const actualTheme = theme === "system" ? getSystemTheme() : theme;
  applyTheme(actualTheme);
}

// Função para alternar entre os temas
export function toggleTheme(): Theme {
  const current = getTheme();
  const actualCurrent = current === "system" ? getSystemTheme() : current;
  const newTheme = actualCurrent === "dark" ? "light" : "dark";
  setTheme(newTheme);
  console.log("toggleTheme: novo tema definido:", newTheme);
  return newTheme;
}

// Função para inicializar o tema
export function initTheme() {
  const theme = getTheme();
  const actualTheme = theme === "system" ? getSystemTheme() : theme;
  applyTheme(actualTheme);
  
  // Escuta mudanças na preferência do sistema
  if (typeof window !== "undefined") {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const currentTheme = getTheme();
      if (currentTheme === "system") {
        applyTheme(getSystemTheme());
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    
    // Cleanup function (retorna uma função para remover o listener)
    return () => mediaQuery.removeEventListener("change", handleChange);
  }
} 