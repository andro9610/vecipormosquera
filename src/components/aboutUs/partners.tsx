export const Partners: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto mt-8 px-4 flex justify-center">
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 text-slate-500 text-sm font-semibold tracking-wider">
        <a href="https://veeduriamanuelabeltran.org/">
          <div className="flex items-center justify-center space-x-2 hover:opacity-100 transition-opacity">
            <img
              src={`${import.meta.env.BASE_URL}images/veeduria_manuela_beltran.webp`}
              alt="Veeduría Manuela Beltrán"
              className="w-10 h-10 object-contain grayscale"
            />
            <span className="text-base font-bold tracking-tight text-slate-700">Veeduria Manuela Beltran</span>
          </div>
        </a>
      </div>
    </section>
  );
};
