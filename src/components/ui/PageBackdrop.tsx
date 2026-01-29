export default function PageBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-[hsl(var(--background))]" />

      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/4 blur-3xl" />
      <div className="absolute -right-24 top-32 h-96 w-96 rounded-full bg-white/4 blur-3xl" />
      <div className="absolute left-1/3 top-[28rem] h-[28rem] w-[28rem] rounded-full bg-white/3 blur-3xl" />

      <div className="absolute inset-0 bg-black/5" />
    </div>
  );
}
