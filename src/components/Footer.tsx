export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-obsidian-dark/70 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-400">
            A fan-made wiki for Pierce Brown&apos;s{" "}
            <span className="text-gold">Red Rising</span> saga.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Covering <em>Red Rising</em>, <em>Golden Son</em>,{" "}
            <em>Morning Star</em>, <em>Iron Gold</em>, <em>Dark Age</em>,
            and <em>Light Bringer</em>.
          </p>
          <p className="mt-4 text-xs text-gray-600">
            This is an unofficial fan project. All rights to the Red Rising
            series belong to Pierce Brown.
          </p>
        </div>
      </div>
    </footer>
  );
}
