import Link from "next/link";
export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-24">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/dashboard"
        className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
