import Link from "next/link";
import { HelpCircle, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The requested engineering path does not exist on this host.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center animate-fade-up">
      <div className="container-content text-center max-w-md">
        <div className="mb-6 inline-flex items-center justify-center p-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3 font-sans">
          Path Anomaly (404)
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          The routing endpoint you are trying to access is unregistered or has been deprecated. Let&apos;s return you to standard operations.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          <ArrowLeft size={12} />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
