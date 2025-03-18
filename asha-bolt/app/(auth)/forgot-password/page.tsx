"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically make an API call to send reset email
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsSubmitted(true);
      toast({
        title: "E-mail verzonden",
        description: "Controleer uw inbox voor instructies om uw wachtwoord te resetten.",
      });
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
          <CardTitle className="text-2xl font-bold">Wachtwoord vergeten</CardTitle>
          <CardDescription>
            Voer uw e-mailadres in om uw wachtwoord te resetten
          </CardDescription>
        </CardHeader>
        {!isSubmitted ? (
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
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "E-mail versturen..." : "Reset wachtwoord"}
              </Button>
              <Link
                href="/auth/login"
                className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4"
              >
                Terug naar inloggen
              </Link>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              We hebben een e-mail gestuurd met instructies om uw wachtwoord te resetten.
              Controleer uw inbox en spam folder.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Verstuur opnieuw
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}