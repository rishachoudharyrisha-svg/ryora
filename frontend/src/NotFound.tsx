import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center bg-aether-container-lowest p-5 text-center text-white">
      <div className="aether-glow pointer-events-none absolute inset-0" />
      <div className="relative">
        <h1 className="text-6xl font-bold text-aether-primary drop-shadow-[0_0_25px_rgba(0,242,255,.35)]">
          404
        </h1>
        <p className="mt-3 text-aether-on-surface-variant">
          This scene doesn’t exist.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Go home</Link>
        </Button>
      </div>
    </main>
  );
}
