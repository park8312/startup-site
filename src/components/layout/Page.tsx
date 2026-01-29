// components/layout/Page.tsx
export default function Page({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={`w-full px-5 md:px-9 ${className}`}>
      {children}
    </main>
  );
}
