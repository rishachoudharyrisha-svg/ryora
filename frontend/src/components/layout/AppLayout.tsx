import { PageTransition } from "@/components/layout/PageTransition";
import { session } from "@/lib/api";
import {
  Film,
  Heart,
  History,
  LogOut,
  Menu,
  Settings,
  User,
  Video,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

export const Protected = ({ children }: { children: ReactNode }) => {
  if (!session.token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const links = [
  { to: "/dashboard", icon: Video, label: "Dashboard" },
  { to: "/videos", icon: Film, label: "Videos" },
  { to: "/favorites", icon: Heart, label: "Favorites" },
  { to: "/history", icon: History, label: "History" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const Wordmark = () => (
  <>
    <span className="grid size-8 shrink-0 place-items-center rounded-md border border-aether-primary/50 bg-aether-primary/20 text-aether-primary shadow-[0_0_15px_rgba(0,242,255,0.3)]">
      <Film size={16} />
    </span>
    <span className="text-xl">Ryora</span>
  </>
);

export function AppLayout() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // The drawer is only mounted-open on mobile; navigating should always dismiss it.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) =>
      event.key === "Escape" && setMenuOpen(false);
    addEventListener("keydown", close);
    return () => removeEventListener("keydown", close);
  }, [menuOpen]);

  const logOut = () => {
    session.clear();
    nav("/login");
  };

  return (
    <div className="min-h-screen bg-aether-container-lowest text-white lg:grid lg:grid-cols-[240px_1fr]">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/5 bg-aether-container-lowest/80 px-4 backdrop-blur-xl lg:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          className="grid size-10 place-items-center rounded-lg text-aether-on-surface-variant transition-colors hover:bg-white/5 hover:text-white"
        >
          <Menu size={20} />
        </button>
        <Link
          to="/dashboard"
          className="flex items-center gap-3 font-semibold tracking-wide"
        >
          <Wordmark />
        </Link>
      </header>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`glass-panel fixed inset-y-0 left-0 z-50 flex w-65 flex-col gap-8 bg-aether-surface/95 p-6 backdrop-blur-xl transition-transform duration-300 lg:static lg:z-auto lg:w-auto lg:translate-x-0 lg:bg-aether-surface/40 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 font-semibold tracking-wide"
          >
            <Wordmark />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
            className="grid size-9 place-items-center rounded-lg text-aether-on-surface-variant transition-colors hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className="sidebar-link flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-aether-on-surface-variant hover:bg-white/5 hover:text-white [&.active]:text-aether-primary"
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logOut}
          className="sidebar-link mt-auto flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-aether-on-surface-variant hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={18} /> Log out
        </button>
      </aside>

      <main className="overflow-y-auto bg-aether-surface/40 p-4 backdrop-blur-xl sm:p-6 lg:p-8">
        {/* Keying on pathname replays the transition on every navigation. */}
        <PageTransition key={pathname}>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
}
