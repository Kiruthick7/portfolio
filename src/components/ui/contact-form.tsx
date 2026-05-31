"use client";

import { useState } from "react";
import { Mail, Check, Loader2, Send } from "lucide-react";

// Obfuscated Access Key to block regex scraper bots from extracting it from the JS bundle
const WEB3FORMS_ACCESS_KEY: string = [
  "c54821b0",
  "1580",
  "46df",
  "91e0",
  "c71914e1834c"
].join("-");

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    inquiryType: "Recruiting",
    message: "",
    botcheck: false, // Web3Forms native spam honeypot (zero friction, blocks 99% of bots)
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Clean, robust client-side validation
  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return "Please fill in all required fields.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return "Please provide a valid email address.";
    }

    // Safety length checks
    if (formData.name.length > 100) return "Name must be less than 100 characters.";
    if (formData.email.length > 100) return "Email must be less than 100 characters.";
    if (formData.company.length > 100) return "Company must be less than 100 characters.";
    if (formData.role.length > 100) return "Target role must be less than 100 characters.";
    if (formData.message.length > 5000) return "Message must be less than 5000 characters.";

    return null;
  };

  // Prevent XSS payload submission by escaping/sanitizing inputs
  const sanitize = (text: string) => {
    if (!text) return "";
    return text
      .replace(/<[^>]*>/g, "") // Strip HTML tags entirely
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    console.log("🚀 Web3Forms: Dispatching payload securely from client browser...");

    try {
      // If the honeypot is filled, Web3Forms will reject it automatically
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio Sync: ${formData.inquiryType} from ${sanitize(formData.name)}`,
          from_name: "Portfolio Contact Gateway",
          replyto: formData.email, // Enables one-click replies in Gmail

          // Reverted back to original lowercase database keys to unify the dashboard
          name: sanitize(formData.name),
          email: sanitize(formData.email),
          company: sanitize(formData.company) || "N/A",
          target_role: sanitize(formData.role) || "N/A",
          inquiry_classification: formData.inquiryType,
          message: sanitize(formData.message),

          botcheck: formData.botcheck, // Active honeypot field
        }),
      });

      const data = await response.json();
      console.log("📥 Web3Forms Response:", data);

      if (response.ok && data.success) {
        console.log("✨ Web3Forms Ingestion Successful!");
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
          inquiryType: "Recruiting",
          message: "",
          botcheck: false,
        });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        console.warn("⚠️ Web3Forms Ingestion Rejected:", data.message);
        setIsSubmitting(false);
        setErrorMessage(data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Web3Forms Network/Runtime Error:", err);
      setIsSubmitting(false);
      setErrorMessage("Network error. Please check your connection and retry.");
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm p-6 max-w-4xl mx-auto">
      {/* Header with Direct Email */}
      <div className="mb-6 pb-4 border-b border-border/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Direct Ingestion Gateway</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Secure client-side fetch with botcheck protection.</p>
        </div>
        <a
          href="mailto:kiruthick012002@gmail.com"
          className="inline-flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-400 font-semibold hover:underline"
        >
          <Mail size={12} />
          kiruthick012002@gmail.com
        </a>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Web3Forms native anti-bot honeypot. Bots automatically check/fill this, instantly discarding spam. */}
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          style={{ display: "none" }}
          checked={formData.botcheck}
          onChange={(e) => setFormData(prev => ({ ...prev, botcheck: e.target.checked }))}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="form-name" className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Full Name *
            </label>
            <input
              id="form-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength={100}
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Full Name"
              className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-foreground/20"
            />
          </div>
          <div>
            <label htmlFor="form-email" className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Email Address *
            </label>
            <input
              id="form-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={100}
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="abc@company.com"
              className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-foreground/20"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="form-company" className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Company / Organization
            </label>
            <input
              id="form-company"
              name="organization"
              type="text"
              autoComplete="organization"
              maxLength={100}
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Enterprise Tech Inc"
              className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-foreground/20"
            />
          </div>
          <div>
            <label htmlFor="form-role" className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Target Role (If Recruiting)
            </label>
            <input
              id="form-role"
              name="role"
              type="text"
              maxLength={100}
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              placeholder="Backend / AI Engineer"
              className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-foreground/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="form-type" className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Inquiry Classification
          </label>
          <select
            id="form-type"
            name="inquiry_type"
            value={formData.inquiryType}
            onChange={(e) => setFormData(prev => ({ ...prev, inquiryType: e.target.value }))}
            className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-foreground/20 cursor-pointer"
          >
            <option value="Recruiting">Recruiting / Contract Hiring</option>
            <option value="Collaboration">Technical Collaboration</option>
            <option value="Networking">General Networking</option>
            <option value="Speaking">Speaking & Panels</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="form-message" className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Message details *
          </label>
          <textarea
            id="form-message"
            name="message"
            required
            rows={4}
            maxLength={5000}
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Hi Kiruthick, I saw your Google Hackathon Top 15 write-up and StadiumOPS. We're looking for a backend/AI systems dev..."
            className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-foreground/20 resize-none"
          />
        </div>

        {errorMessage && (
          <div className="text-xs text-red-500 font-semibold mb-2">
            ⚠️ {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background py-2 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              Sending Message...
            </>
          ) : isSuccess ? (
            <>
              <Check size={12} className="text-green-500" />
              Message Sent!
            </>
          ) : (
            <>
              <Send size={12} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
