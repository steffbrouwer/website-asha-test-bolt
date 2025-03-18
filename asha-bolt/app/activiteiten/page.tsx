import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ActiviteitenPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Activiteiten</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActivityCard
          title="Huiswerkbegeleiding"
          details="Datum: Maandag en woensdag\nTijd: 15:00 - 17:00\nPlaats: Buurthuis Asha."
        />
        <ActivityCard
          title="Donderdagmiddag bijeenkomst"
          details="Datum: Elke donderdag\nTijd: 12:00 - 16:00\nPlaats: Buurthuis Asha."
        />
        <ActivityCard
          title="Nederlandse taalles"
          details="Datum: Dinsdag en vrijdag\nTijd: 10:00 - 12:00\nPlaats: Buurthuis Asha."
        />
      </div>
    </main>
  );
}

function ActivityCard({ title, details }: { title: string; details: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line text-muted-foreground">{details}</p>
      </CardContent>
    </Card>
  );
}