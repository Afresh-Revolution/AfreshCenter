import { useState } from "react";
import { Outlet, NavLink, useNavigate, Navigate } from "react-router-dom";
import primaryLogo from "../assets/primary-logo.png";
import { getStoredToken, getStoredUser, clearAuth } from "../api/auth";

function getInitials(email: string): string {
  const local = email.split("@")[0] || "";
  const firstTwo = local.slice(0, 2);
  return firstTwo ? firstTwo.toUpperCase() : "?";
}

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = getStoredUser();
  const initials = user ? getInitials(user.email) : "?";
  const displayEmail = user?.email ?? "—";
  const displayName = user?.email ? user.email.split("@")[0] : "—";

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  if (!getStoredToken()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-layout">
      <button
        type="button"
        className="admin-mobile-menu-btn"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
        aria-expanded={sidebarOpen}
      >
        <span className="admin-mobile-menu-btn__icon" aria-hidden />
      </button>
      <div
        className="admin-sidebar-overlay"
        aria-hidden={!sidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />
      <aside className={`admin-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="sidebar-brand">
          <img src={primaryLogo} alt="AfrESH" className="brand-logo" />
          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <span className="admin-sidebar-close__icon" aria-hidden />
          </button>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon nav-icon-grid" aria-hidden />
            Overview
          </NavLink>
          <NavLink
            to="/admin/services"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon nav-icon-briefcase" aria-hidden />
            Services
          </NavLink>
          <NavLink
            to="/admin/bookings"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon nav-icon-calendar" aria-hidden />
            Bookings
          </NavLink>
          <NavLink
            to="/admin/contacts"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon nav-icon-chat" aria-hidden />
            Contacts
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon nav-icon-gear" aria-hidden />
            Settings
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar" aria-hidden>
              {initials}
            </div>
            <div className="user-details">
              <span className="user-name">{displayName}</span>
              <span className="user-email">{displayEmail}</span>
            </div>
          </div>
          <button
            type="button"
            className="logout-link"
            onClick={handleLogout}
            aria-label="Log out"
          >
            <span className="logout-icon" aria-hidden />
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
