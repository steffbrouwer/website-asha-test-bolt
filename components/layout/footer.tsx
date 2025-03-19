export function Footer() {
  return (
    <footer className="bg-surface text-text-dark py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Stichting Asha</p>
      </div>
    </footer>
  );
}