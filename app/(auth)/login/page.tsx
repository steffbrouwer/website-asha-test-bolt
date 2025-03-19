"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/");
    } catch (error) {
      setError("Inloggen mislukt. Controleer je gegevens en probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-secondary mb-4 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-secondary">
              E-mailadres:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-secondary">
              Wachtwoord:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md w-full hover:bg-primary-dark-text transition-colors"
            disabled={loading}
          >
            {loading ? "Bezig met inloggen..." : "Inloggen"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Geen account?{" "}
            <Link href="/register" className="text-primary hover:text-secondary">
              Registreer hier
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}