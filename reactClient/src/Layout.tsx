import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import UserProfile from "./components/UserProfile";

const ClientLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/", icon: "🏠" },
    { label: "My Groups", path: "/Mygroups", icon: "👥" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1100,
          height: "60px",
          background: "linear-gradient(-45deg, #d1c4e9, #b39ddb, #9575cd, #7e57c2)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 10s ease infinite",
          borderBottom: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          boxShadow: isScrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <nav style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <ul
            style={{
              display: "flex",
              gap: "20px",
              listStyle: "none",
              margin: 0,
              padding: 0,
              alignItems: "center",
            }}
          >
            {navItems.map((item) => {
              const isActive = window.location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    style={{
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#fff",
                      background: isActive
                        ? "linear-gradient(135deg, #e91e63, #ff5722, #ff9800)"
                        : "linear-gradient(135deg, #f48fb1, #ba68c8, #9575cd)",
                      padding: "14px 24px",
                      borderRadius: "30px",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      border: isActive
                        ? "3px solid rgba(255, 255, 255, 0.6)"
                        : "3px solid rgba(255, 255, 255, 0.4)",
                      boxShadow: isActive
                        ? "0 0 30px rgba(233, 30, 99, 0.6), 0 0 60px rgba(255, 87, 34, 0.4), 0 10px 40px rgba(255, 152, 0, 0.3), inset 0 0 25px rgba(255, 255, 255, 0.3)"
                        : "0 0 20px rgba(244, 143, 177, 0.4), 0 0 40px rgba(186, 104, 200, 0.3), 0 8px 30px rgba(149, 117, 205, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.2)",
                      transform: isActive ? "translateY(-2px) scale(1.05)" : "translateY(0)",
                      animation: isActive ? "activeGlow 4s ease-in-out infinite" : "subtleGlow 5s ease-in-out infinite",
                      textShadow: "0 0 8px rgba(255, 255, 255, 0.7), 0 2px 4px rgba(0,0,0,0.3)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <span
                      style={{
                        marginRight: 6,
                        fontSize: "18px",
                        filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))",
                      }}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div>
          <UserProfile />
        </div>
      </header>

      <main style={{ marginTop: "60px", flex: 1 }}>
        <Outlet />
      </main>

      {/* אנימציות CSS – בתוך תגית style רגילה (מחוץ ל-JSX) */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes subtleGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 107, 157, 0.4),
                        0 0 40px rgba(196, 69, 105, 0.3),
                        inset 0 0 15px rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 25px rgba(255, 107, 157, 0.5),
                        0 0 50px rgba(196, 69, 105, 0.4),
                        inset 0 0 20px rgba(255, 255, 255, 0.3);
          }
        }

        @keyframes activeGlow {
          0%, 100% {
            box-shadow: 0 0 30px rgba(255, 0, 110, 0.6),
                        0 0 60px rgba(251, 86, 7, 0.4),
                        0 10px 40px rgba(131, 56, 236, 0.3),
                        inset 0 0 25px rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 35px rgba(255, 0, 110, 0.7),
                        0 0 70px rgba(251, 86, 7, 0.5),
                        0 12px 45px rgba(131, 56, 236, 0.4),
                        inset 0 0 30px rgba(255, 255, 255, 0.4);
          }
        }
      `}</style>
    </div>
  );
};

export default ClientLayout;
