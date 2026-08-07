import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { authService } from "@/services/authService";
import { Film } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Auth({ register = false }: { register?: boolean }) {
  const nav = useNavigate();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError("");
    setPending(true);
    try {
      await (register
        ? api("/auth/register", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(form)),
          })
        : await authService.login(form));
      nav(register ? "/login" : "/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to continue");
    } finally {
      setPending(false);
    }
  }
  return (
    <main className="relative grid min-h-screen place-items-center bg-aether-container-lowest p-5 text-white">
      <div className="aether-glow pointer-events-none absolute inset-0" />
      <form
        onSubmit={submit}
        className="glass-card relative w-full max-w-md rounded-2xl p-7"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-aether-primary transition-colors hover:text-white"
        >
          <Film size={16} /> Ryora
        </Link>
        <h1 className="mt-5 text-2xl font-semibold">
          {register ? "Start creating" : "Welcome back"}
        </h1>
        <p className="mt-1 text-sm text-aether-on-surface-variant">
          {register
            ? "Your first animation is a prompt away."
            : "Sign in to your studio."}
        </p>
        {register && (
          <label className="mt-6 block text-sm text-aether-on-surface-variant">
            Name
            <input
              required
              name="name"
              minLength={2}
              autoComplete="name"
              className="form-input-dark mt-2 w-full rounded-lg p-3 text-base text-white"
            />
          </label>
        )}
        <label className="mt-4 block text-sm text-aether-on-surface-variant">
          Email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="form-input-dark mt-2 w-full rounded-lg p-3 text-base text-white"
          />
        </label>
        <label className="mt-4 block text-sm text-aether-on-surface-variant">
          Password
          <input
            required
            minLength={8}
            type="password"
            name="password"
            autoComplete={register ? "new-password" : "current-password"}
            className="form-input-dark mt-2 w-full rounded-lg p-3 text-base text-white"
          />
        </label>
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
          >
            {error}
          </p>
        )}
        <Button disabled={pending} className="mt-6 w-full" size="lg">
          {pending
            ? "Just a moment…"
            : register
              ? "Create account"
              : "Sign in"}
        </Button>
        <p className="mt-5 text-center text-sm text-aether-on-surface-variant">
          {register ? "Already have an account?" : "New to Ryora?"}{" "}
          <Link
            className="text-aether-primary transition-colors hover:text-white"
            to={register ? "/login" : "/register"}
          >
            {register ? "Sign in" : "Create one"}
          </Link>
        </p>
      </form>
    </main>
  );
}
