"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface ContactPerson {
  id: string;
  name: string;
  function: string;
  email: string;
  phone_number: string;
  picture_url: string;
}

interface VolunteerForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const defaultContacts: ContactPerson[] = [
  {
    id: "1",
    name: "Radj Ramcharan",
    function: "Secretaris",
    email: "radj@example.com",
    phone_number: "0612345678",
    picture_url: "https://www.stichtingasha.nl/img/radjround2-modified.png",
  },
  {
    id: "2",
    name: "Ronald Kalka",
    function: "Voorzitter",
    email: "ronald@example.com",
    phone_number: "0623456789",
    picture_url: "https://www.stichtingasha.nl/img/ronaldkalkaround1-modified.png",
  },
];

export default function Contact() {
  const [contacts] = useState<ContactPerson[]>(defaultContacts);
  const [form, setForm] = useState<VolunteerForm>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Check if Supabase is connected
  useState(() => {
    const checkSupabaseConnection = async () => {
      try {
        const { data, error } = await supabase.from("volunteers").select("count");
        if (!error) {
          setIsSupabaseConnected(true);
        }
      } catch (error) {
        console.error("Supabase connection error:", error);
      }
    };
    checkSupabaseConnection();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");

    if (!isSupabaseConnected) {
      setSubmitStatus("error");
      return;
    }

    try {
      const { error } = await supabase.from("volunteers").insert([
        {
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone_number: form.phoneNumber,
          message: form.message,
        },
      ]);

      if (error) throw error;

      setSubmitStatus("success");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Contactpersonen</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-gray-50 p-4 rounded-lg flex items-center">
              <img
                src={contact.picture_url}
                alt={contact.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-black">{contact.name}</h3>
                <p className="text-gray-600">Functie: {contact.function}</p>
                <p className="text-gray-600">Telefoonnummer: {contact.phone_number}</p>
                <p className="text-gray-600">
                  E-mail:{" "}
                  <a href={`mailto:${contact.email}`} className="text-blue-500">
                    {contact.email}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-secondary mb-4">
          Meld je aan als Vrijwilliger
        </h2>

        {!isSupabaseConnected && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-4">
            <p className="text-yellow-800">
              Het vrijwilligersformulier is tijdelijk niet beschikbaar. Probeer het later opnieuw.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-secondary">
              Voornaam:
            </label>
            <input
              type="text"
              id="firstName"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-secondary">
              Achternaam:
            </label>
            <input
              type="text"
              id="lastName"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-secondary">
              E-mailadres:
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-secondary">
              Telefoonnummer:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-secondary">
              Bericht:
            </label>
            <textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark-text transition-colors"
            disabled={!isSupabaseConnected}
          >
            Verstuur
          </button>

          {submitStatus === "success" && (
            <p className="text-green-500 mt-4">Formulier succesvol verstuurd!</p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-500 mt-4">
              Er is iets misgegaan. Probeer het later opnieuw.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}