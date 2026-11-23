import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="section-title">Page not found</h1>
        <p className="muted mb-8">The requested page does not exist.</p>
        <Link href="/#projects" className="lets-talk rounded-full px-6 py-3 text-sm font-semibold">
          Back to projects
        </Link>
      </div>
    </main>
  );
}
