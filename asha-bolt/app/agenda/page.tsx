"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Activity = {
  title: string;
  description: string;
  time: string;
  location: string;
};

type Activities = {
  [key: string]: Activity[];
};

const activities: Activities = {
  "2025-01-15": [
    {
      title: "Workshop: Website Ontwikkeling",
      description: "Leer hoe je een website maakt.",
      time: "10:00",
      location: "Kantoor 101"
    },
    {
      title: "Bijeenkomst: Vrijwilligers",
      description: "Bespreek toekomstige projecten en activiteiten.",
      time: "14:00",
      location: "Vergaderruimte A"
    }
  ],
  "2025-01-16": [
    {
      title: "Lezing: Duurzaamheid",
      description: "Ontdek de nieuwste trends in duurzaamheid.",
      time: "13:00",
      location: "Auditorium 3"
    }
  ]
};

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December"
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const renderCalendar = () => {
    const days = [];
    const dayNames = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

    // Add day names
    dayNames.forEach(day => {
      days.push(
        <div key={`header-${day}`} className="font-semibold text-center p-2">
          {day}
        </div>
      );
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = formatDate(date);
      const hasActivities = activities[dateString]?.length > 0;

      days.push(
        <div
          key={`day-${day}`}
          className={`p-2 text-center cursor-pointer relative rounded-lg hover:bg-accent ${
            selectedDate?.getDate() === day ? 'bg-accent' : ''
          }`}
          onClick={() => setSelectedDate(date)}
        >
          {day}
          {hasActivities && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <main className="container mx-auto py-10 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Agenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Vorige maand</span>
            </Button>
            <h2 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button variant="ghost" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Volgende maand</span>
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-6">
            {renderCalendar()}
          </div>

          {selectedDate && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">
                Activiteiten voor {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
              </h3>
              {activities[formatDate(selectedDate)]?.map((activity, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg">{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{activity.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Tijd: {activity.time} | Locatie: {activity.location}
                    </p>
                  </CardContent>
                </Card>
              )) || (
                <p className="text-muted-foreground">
                  Geen activiteiten gepland voor deze dag.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}