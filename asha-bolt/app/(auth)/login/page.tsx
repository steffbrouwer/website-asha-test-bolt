"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // Here you would typically make an API call to authenticate
      // For now, we'll just show a success message
      toast({
        title: "Succesvol ingelogd",
        description: "U wordt doorgestuurd naar het dashboard.",
      });
      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Er is iets misgegaan. Probeer het opnieuw.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Inloggen</CardTitle>
          <CardDescription>
            Log in met uw e-mailadres en wachtwoord
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="naam@voorbeeld.nl"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Wachtwoord</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Bezig met inloggen..." : "Inloggen"}
            </Button>
            <div className="text-sm text-muted-foreground text-center space-y-2">
              <Link
                href="/auth/forgot-password"
                className="hover:text-primary underline underline-offset-4"
              >
                Wachtwoord vergeten?
              </Link>
              <p>
                Nog geen account?{" "}
                <Link
                  href="/auth/register"
                  className="hover:text-primary underline underline-offset-4"
                >
                  Registreer hier
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}