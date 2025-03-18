import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ContactPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Contactpersonen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ContactCard
              image="https://www.stichtingasha.nl/img/radjround2-modified.png"
              name="Radj Ramcharan"
              role="Secretaris"
              phone="0612345678"
              email="radj@example.com"
            />
            <Separator />
            <ContactCard
              image="https://www.stichtingasha.nl/img/ronaldkalkaround1-modified.png"
              name="Ronald Kalka"
              role="Voorzitter"
              phone="0623456789"
              email="ronald@example.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Locatie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Buurthuis Asha<br />
              Voorbeeldstraat 123<br />
              3511 AB Utrecht
            </p>
            <p className="text-muted-foreground">
              Voor algemene vragen kunt u contact opnemen via:<br />
              Email: info@stichtingasha.nl<br />
              Tel: 030-1234567
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

function ContactCard({ image, name, role, phone, email }: {
  image: string;
  name: string;
  role: string;
  phone: string;
  email: string;
}) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-16 h-16">
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-muted-foreground">Functie: {role}</p>
        <p className="text-muted-foreground">Telefoonnummer: {phone}</p>
        <p className="text-muted-foreground">
          E-mail: <Link href={`mailto:${email}`} className="text-primary hover:underline">{email}</Link>
        </p>
      </div>
    </div>
  );
}