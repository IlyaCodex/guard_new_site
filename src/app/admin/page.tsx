import { redirect } from "next/navigation";
import styles from "./Admin.module.css";

export default function AdminRedirect() {
  redirect("/404");
}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import AdminPanel from "@/components/Admin/AdminPanel";
// import styles from "./Admin.module.css";

// export default function AdminPage() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = () => {
//     const token = localStorage.getItem("admin_token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   };

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Простая проверка пароля (в реальном проекте использовать JWT)
//     if (password === "admin123") {
//       localStorage.setItem("admin_token", "authenticated");
//       setIsAuthenticated(true);
//       setError("");
//     } else {
//       setError("Неверный пароль");
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className={styles.loginContainer}>
//         <form onSubmit={handleLogin} className={styles.loginForm}>
//           <h1 className={styles.title}>Вход в админ-панель</h1>
//           {error && <div className={styles.error}>{error}</div>}
//           <input
//             type="password"
//             placeholder="Введите пароль"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className={styles.input}
//             required
//           />
//           <button type="submit" className={styles.loginButton}>
//             Войти
//           </button>
//         </form>
//       </div>
//     );
//   }

//   return <AdminPanel />;
// }
