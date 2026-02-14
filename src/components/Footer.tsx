export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-obsidian-dark">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-400">
            A fan-made wiki for Pierce Brown&apos;s{" "}
            <span className="text-gold">Red Rising</span> saga.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Covering <em>Red Rising</em>, <em>Golden Son</em>,{" "}
            <em>Morning Star</em>, <em>Iron Gold</em>, <em>Dark Age</em>,
            and <em>Light Bringer</em>.
          </p>
          <p className="mt-3 text-xs text-gray-600">
            This is an unofficial fan project. All rights to the Red Rising
            series belong to Pierce Brown.
          </p>
        </div>
      </div>
    </footer>
  );
}
