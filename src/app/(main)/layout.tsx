// Pass-through layout for the (main) route group.
// The root layout at src/app/layout.tsx already provides Navbar and Footer.
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
