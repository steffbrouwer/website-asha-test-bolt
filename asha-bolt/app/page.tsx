import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-64 mb-10">
        <div className="absolute inset-0">
          <Image
            src="https://lh3.googleusercontent.com/p/AF1QipMlGdHeAQdXojmP1eccxTqXot7s8GbXpMFYugMM=s680-w680-h510"
            alt="Stichting Asha"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white px-6 py-2 rounded">
            Stichting Asha
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="container mx-auto px-4 mb-10">
        <p className="text-muted-foreground">
          Stichting Asha (Asha = Hoop in het Hindi) is een vrijwilligersorganisatie van Surinaamse Hindostanen in de gemeente Utrecht. De organisatie is in 1976 opgericht en wil met haar activiteiten een positieve bijdrage leveren aan het gemeentelijke integratie- en participatiebeleid.
        </p>
      </section>

      {/* Information Cards */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Visie</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Stichting Asha vindt het belangrijk dat de Hindostaanse gemeenschap in Utrecht de eigen cultuur en identiteit beleeft. Zo kunnen de leden van de gemeenschap de kracht opdoen om zich verder te ontwikkelen.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Missie</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Door het organiseren van projecten en activiteiten voor de Hindostaanse gemeenschap en andere groepen in de Utrechtse samenleving, wil Stichting Asha een bijdrage leveren aan de multiculturele samenleving.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Stichting Asha wordt voortdurend door de Media benaderd. Met name de projecten sollicitatie Helpdesk, ouderen en huiswerkbegeleiding haalt veelvuldig de media.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}