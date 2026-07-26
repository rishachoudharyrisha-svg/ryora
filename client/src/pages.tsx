import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  Check,
  Download,
  Film,
  Heart,
  Play,
  ShieldCheck,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  api,
  session,
  type Generation,
  type User,
  type Video,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
const styles = [
  "Pixar",
  "Disney",
  "Anime",
  "Cartoon",
  "Studio Ghibli",
  "Clay Animation",
  "Minecraft",
  "Lego",
  "Comic",
  "Cyberpunk",
  "Realistic 3D",
];
function VideoPlayer({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    addEventListener("keydown", close);
    return () => removeEventListener("keydown", close);
  }, [onClose]);
  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-5"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4">
          <p className="truncate font-medium">{video.title}</p>
          <button className="text-zinc-400 hover:text-white" onClick={onClose}>
            Close
          </button>
        </div>
        <video
          autoPlay
          controls
          playsInline
          poster={video.thumbnailUrl}
          className="aspect-video w-full bg-black"
        >
          <source src={video.url} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </div>
    </div>
  );
}
const Card = ({
  video,
  onToggle,
  onDelete,
}: {
  video: Video;
  onToggle?: () => void;
  onDelete?: () => void;
}) => {
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <article className="overflow-hidden rounded-xl border border-white/10 bg-white/[.03]">
        <button
          aria-label={`Play ${video.title}`}
          onClick={() => setPlaying(true)}
          className="relative block aspect-video w-full overflow-hidden bg-zinc-900"
        >
          {video.thumbnailUrl && (
            <img
              src={video.thumbnailUrl}
              alt=""
              className="size-full object-cover"
            />
          )}
          <span className="absolute inset-0 grid place-items-center bg-black/20">
            <Play className="size-10 fill-white text-white" />
          </span>
        </button>
        <div className="flex items-center justify-between gap-3 p-3">
          <div className="min-w-0">
            <p className="truncate text-sm">{video.title}</p>
            <p className="mt-1 text-xs text-zinc-500">{video.provider}</p>
          </div>
          <div className="flex gap-1">
            <a
              aria-label="Download video"
              className="p-1.5 text-zinc-400 hover:text-white"
              href={video.url}
              download="kyora-demo.mp4"
            >
              <Download size={16} />
            </a>
            {onToggle && (
              <button
                aria-label="Toggle favorite"
                onClick={onToggle}
                className="p-1.5 text-zinc-400 hover:text-pink-300"
              >
                <Heart
                  size={16}
                  fill={video.isFavorite ? "currentColor" : "none"}
                />
              </button>
            )}
            {onDelete && (
              <button
                aria-label="Delete video"
                onClick={onDelete}
                className="p-1.5 text-zinc-400 hover:text-red-300"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      </article>
      {playing && (
        <VideoPlayer video={video} onClose={() => setPlaying(false)} />
      )}
    </>
  );
};
export function Landing() {
  const features = [
    {
      icon: Wand2,
      title: "Create from a prompt",
      description:
        "Turn a simple idea into an animated scene with an art direction that feels intentional.",
    },
    {
      icon: Film,
      title: "Made for every story",
      description:
        "Choose a visual style and framing that fits a cinematic moment, a short, or a social post.",
    },
    {
      icon: ShieldCheck,
      title: "Your creative library",
      description:
        "Keep creations, favorites, and downloads organized in one focused workspace.",
    },
  ];
  const faqs = [
    [
      "What can I make with Kyora?",
      "Use a short description, style, duration, and format to create animated concepts for storytelling, social, and creative exploration.",
    ],
    [
      "Do I need editing experience?",
      "No. Kyora is designed to help you start from an idea and shape it with clear creative controls.",
    ],
    [
      "Can I download my creations?",
      "Yes. Your completed creations stay in your library, ready for playback, favorites, and download.",
    ],
    [
      "Is there a free plan?",
      "Yes. Every new creator starts with one free video generation. More plans are coming soon.",
    ],
  ];
  return (
    <main className="min-h-screen overflow-hidden bg-[#09090f] text-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(circle_at_50%_0%,#6d28d955,transparent_55%)]" />
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid size-9 place-items-center rounded-xl bg-violet-500">
            <Film size={18} />
          </span>
          Kyora
        </Link>
        <nav
          className="hidden items-center gap-6 text-sm text-zinc-400 md:flex"
          aria-label="Main navigation"
        >
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#pricing" className="hover:text-white">
            Pricing
          </a>
          <a href="#faq" className="hover:text-white">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Create free</Link>
          </Button>
        </div>
      </header>
      <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-16 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:pt-24">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-medium tracking-[.24em] text-violet-300 uppercase">
            AI animation studio
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">
            From a sentence to a world in motion.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            Create cinematic animated videos with a prompt, your favorite visual
            style, and Kyora’s AI direction.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/register">
                Start creating free <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Sign in to your studio</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-zinc-500">
            One free video generation. No card required.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-xl rounded-3xl border border-violet-300/20 bg-gradient-to-br from-violet-500/20 via-zinc-900 to-fuchsia-500/10 p-3 shadow-2xl shadow-violet-950/40">
          <div className="aspect-[4/3] rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_70%_20%,#c084fc55,transparent_24%),radial-gradient(circle_at_25%_80%,#38bdf844,transparent_28%),#11111a] p-5">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <span className="size-2 rounded-full bg-violet-300" /> Creating a
              new world
            </div>
            <div className="mt-12 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur">
              <p className="text-sm text-zinc-400">Prompt</p>
              <p className="mt-2 font-medium">
                A fox astronaut drifting through a luminous nebula
              </p>
              <div className="mt-5 flex items-center justify-between text-xs text-zinc-400">
                <span>Anime · 5 seconds</span>
                <span className="rounded-full bg-violet-400/15 px-3 py-1 text-violet-200">
                  Ready to create
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="border-y border-white/10 bg-white/[.02] py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-[.24em] text-violet-300 uppercase">
              Creative momentum
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              A calmer way to make something memorable.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-zinc-950/40 p-6"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-violet-500/15 text-violet-200">
                  <Icon size={21} />
                </span>
                <h3 className="mt-6 text-lg font-medium">{title}</h3>
                <p className="mt-3 leading-7 text-zinc-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="text-center">
          <p className="text-sm font-medium tracking-[.24em] text-violet-300 uppercase">
            Simple to start
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            A plan for your next idea.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Start with one free creation. Upgrade options are on their way as
            Kyora grows.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-violet-300/30 bg-violet-500/10 p-6">
            <p className="font-medium text-violet-200">Free</p>
            <p className="mt-4 text-4xl font-semibold">$0</p>
            <p className="mt-2 text-sm text-zinc-400">
              A thoughtful first step.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
              <li className="flex gap-2">
                <Check size={16} className="text-violet-300" />1 free video
              </li>
              <li className="flex gap-2">
                <Check size={16} className="text-violet-300" />
                720p export
              </li>
              <li className="flex gap-2">
                <Check size={16} className="text-violet-300" />
                Watermarked
              </li>
            </ul>
            <Button asChild className="mt-7 w-full">
              <Link to="/register">Get started</Link>
            </Button>
          </article>
          {[
            ["Pro", "For creators who need more room to explore."],
            ["Enterprise", "For teams bringing larger stories to life."],
          ].map(([name, description]) => (
            <article
              key={name}
              className="rounded-2xl border border-white/10 bg-white/[.03] p-6"
            >
              <p className="font-medium">{name}</p>
              <p className="mt-4 text-4xl font-semibold">Soon</p>
              <p className="mt-2 text-sm text-zinc-400">{description}</p>
              <ul className="mt-6 space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <Check size={16} className="text-zinc-500" />
                  More creative capacity
                </li>
                <li className="flex gap-2">
                  <Check size={16} className="text-zinc-500" />
                  Priority rendering
                </li>
                <li className="flex gap-2">
                  <Check size={16} className="text-zinc-500" />
                  Advanced controls
                </li>
              </ul>
              <Button disabled variant="outline" className="mt-7 w-full">
                Coming soon
              </Button>
            </article>
          ))}
        </div>
      </section>
      <section
        id="faq"
        className="border-t border-white/10 bg-white/[.02] py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-sm font-medium tracking-[.24em] text-violet-300 uppercase">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              A few useful answers.
            </h2>
          </div>
          <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-950/30">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group p-5">
                <summary className="cursor-pointer list-none font-medium">
                  {question}
                  <span className="float-right text-violet-300 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-7 text-zinc-400">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-medium text-zinc-200"
        >
          <Film size={16} className="text-violet-300" /> Kyora
        </Link>
        <p>© {new Date().getFullYear()} Kyora. Create what moves you.</p>
        <div className="flex gap-4">
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#pricing" className="hover:text-white">
            Pricing
          </a>
          <a href="#faq" className="hover:text-white">
            FAQ
          </a>
        </div>
      </footer>
    </main>
  );
}
export function Auth({ register = false }: { register?: boolean }) {
  const nav = useNavigate();
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const result = await api<{ token: string }>(
        `/auth/${register ? "register" : "login"}`,
        { method: "POST", body: JSON.stringify(Object.fromEntries(form)) },
      );
      session.set(result.token);
      nav("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to continue");
    }
  }
  return (
    <main className="grid min-h-screen place-items-center bg-[#09090f] p-6 text-white">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[.03] p-7 shadow-2xl"
      >
        <Link to="/" className="text-violet-300">
          ← Kyora
        </Link>
        <h1 className="mt-5 text-2xl font-semibold">
          {register ? "Start creating" : "Welcome back"}
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          {register
            ? "Your first animation is a prompt away."
            : "Sign in to your studio."}
        </p>
        {register && (
          <label className="mt-5 block text-sm">
            Name
            <input
              required
              name="name"
              minLength={2}
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 p-3"
            />
          </label>
        )}
        <label className="mt-4 block text-sm">
          Email
          <input
            required
            type="email"
            name="email"
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 p-3"
          />
        </label>
        <label className="mt-4 block text-sm">
          Password
          <input
            required
            minLength={8}
            type="password"
            name="password"
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 p-3"
          />
        </label>
        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
        <Button className="mt-6 w-full">
          {register ? "Create account" : "Sign in"}
        </Button>
        <p className="mt-4 text-center text-sm text-zinc-400">
          {register ? "Already have an account?" : "New to Kyora?"}{" "}
          <Link
            className="text-violet-300"
            to={register ? "/login" : "/register"}
          >
            {register ? "Sign in" : "Create one"}
          </Link>
        </p>
      </form>
    </main>
  );
}
export function Dashboard() {
  const qc = useQueryClient();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState(styles[0]);
  const [duration, setDuration] = useState(5);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [message, setMessage] = useState("");
  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: () => api<{ user: User }>("/profile"),
  });
  const credits = profile.data?.user.credits;
  const videos = useQuery({
    queryKey: ["videos"],
    queryFn: () => api<{ videos: Video[] }>("/videos"),
  });
  const create = useMutation({
    mutationFn: () =>
      api("/generate", {
        method: "POST",
        body: JSON.stringify({ prompt, style, duration, aspectRatio }),
      }),
    onSuccess: () => {
      setPrompt("");
      setMessage("Your animation is ready.");
      qc.invalidateQueries({ queryKey: ["videos"] });
      qc.invalidateQueries({ queryKey: ["history"] });
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (e) =>
      setMessage(e instanceof Error ? e.message : "Generation failed"),
  });
  return (
    <div>
      <p className="text-sm text-violet-300">Creative workspace</p>
      <h1 className="mt-1 text-3xl font-semibold">Make something magical</h1>
      <section className="mt-7 rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/5 p-5">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A cute baby dragon flying through a magical glowing forest…"
          className="min-h-32 w-full resize-none bg-transparent text-lg outline-none placeholder:text-zinc-500"
        />
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="rounded-lg border border-white/10 bg-black/30 p-3"
          >
            {styles.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="rounded-lg border border-white/10 bg-black/30 p-3"
          >
            {[5, 10, 15].map((x) => (
              <option key={x} value={x}>
                {x} seconds
              </option>
            ))}
          </select>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            className="rounded-lg border border-white/10 bg-black/30 p-3"
          >
            {["16:9", "9:16", "1:1"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-400">
            {message ||
              (credits === 0
                ? "Your free generation has been used. Upgrade your plan to continue."
                : credits === undefined
                  ? "Checking your available credit…"
                  : `${credits} free generation credit remaining.`)}
          </p>
          <div className="flex items-center gap-2">
            <Button
              disabled={
                prompt.trim().length < 10 ||
                create.isPending ||
                credits === 0 ||
                credits === undefined
              }
              onClick={() => create.mutate()}
            >
              {create.isPending ? (
                "Creating…"
              ) : (
                <>
                  <Sparkles className="mr-2 size-4" />
                  Generate
                </>
              )}
            </Button>
            {credits === 0 && (
              <Button variant="outline" disabled>
                Upgrade Plan
              </Button>
            )}
          </div>
        </div>
      </section>
      <h2 className="mt-10 text-lg font-medium">Recent creations</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {videos.data?.videos.slice(0, 6).map((video) => (
          <Card
            key={video.id}
            video={video}
            onToggle={() =>
              api(`/video/${video.id}`, {
                method: "PATCH",
                body: JSON.stringify({ isFavorite: !video.isFavorite }),
              }).then(() => qc.invalidateQueries({ queryKey: ["videos"] }))
            }
          />
        )) ?? (
          <p className="text-sm text-zinc-500">
            Your new creations will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
export function VideosPage({ favorites = false }: { favorites?: boolean }) {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["videos", favorites],
    queryFn: () =>
      api<{ videos: Video[] }>(`/videos${favorites ? "?favorite=true" : ""}`),
  });
  const toggle = (video: Video) =>
    api(`/video/${video.id}`, {
      method: "PATCH",
      body: JSON.stringify({ isFavorite: !video.isFavorite }),
    }).then(() => qc.invalidateQueries({ queryKey: ["videos"] }));
  const del = (id: string) =>
    api(`/video/${id}`, { method: "DELETE" }).then(() =>
      qc.invalidateQueries({ queryKey: ["videos"] }),
    );
  return (
    <div>
      <h1 className="text-3xl font-semibold">
        {favorites ? "Favorites" : "Your videos"}
      </h1>
      <p className="mt-2 text-zinc-400">
        {favorites
          ? "The ideas worth returning to."
          : "Download, organize, and revisit every creation."}
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {query.data?.videos.map((video) => (
          <Card
            key={video.id}
            video={video}
            onToggle={() => toggle(video)}
            onDelete={() => del(video.id)}
          />
        )) ?? <p className="text-zinc-500">Nothing here yet.</p>}
      </div>
    </div>
  );
}
export function HistoryPage() {
  const query = useQuery({
    queryKey: ["history"],
    queryFn: () => api<{ items: Generation[]; total: number }>("/history"),
  });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Generation history</h1>
      <div className="mt-7 overflow-hidden rounded-xl border border-white/10">
        {query.data?.items.map((x) => (
          <article
            key={x.id}
            className="border-b border-white/10 p-4 last:border-0"
          >
            <div className="flex justify-between gap-5">
              <p className="font-medium">{x.originalPrompt}</p>
              <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">
                {x.status}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
              {x.enhancedPrompt}
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              {x.style} · {x.duration}s · {x.aspectRatio}
            </p>
          </article>
        )) ?? <p className="p-5 text-zinc-500">No generation history yet.</p>}
      </div>
    </div>
  );
}
export function ProfilePage() {
  const query = useQuery({
    queryKey: ["profile"],
    queryFn: () => api<{ user: User }>("/profile"),
  });
  const [name, setName] = useState("");
  const mutation = useMutation({
    mutationFn: () =>
      api("/profile", { method: "PATCH", body: JSON.stringify({ name }) }),
    onSuccess: () => query.refetch(),
  });
  const user = query.data?.user;
  return (
    <div>
      <h1 className="text-3xl font-semibold">Profile</h1>
      <div className="mt-7 max-w-lg rounded-xl border border-white/10 p-5">
        <label className="block text-sm">
          Display name
          <input
            value={name || user?.name || ""}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 p-3"
          />
        </label>
        <p className="mt-4 text-sm text-zinc-400">{user?.email}</p>
        <Button className="mt-5" onClick={() => mutation.mutate()}>
          Save profile
        </Button>
      </div>
    </div>
  );
}
export function SettingsPage() {
  const [dark, setDark] = useState(true);
  return (
    <div>
      <h1 className="text-3xl font-semibold">Settings</h1>
      <div className="mt-7 max-w-lg rounded-xl border border-white/10 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p>Dark mode</p>
            <p className="text-sm text-zinc-400">
              Use Kyora’s midnight studio theme.
            </p>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className="rounded-full bg-violet-500 px-4 py-2 text-sm"
          >
            {dark ? "On" : "Off"}
          </button>
        </div>
      </div>
    </div>
  );
}
export function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#09090f] text-center text-white">
      <div>
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-3 text-zinc-400">This scene doesn’t exist.</p>
        <Button asChild className="mt-6">
          <Link to="/">Go home</Link>
        </Button>
      </div>
    </main>
  );
}
