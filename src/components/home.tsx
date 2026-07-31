export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="flex items-center justify-center">
        <img
          src={`${import.meta.env.BASE_URL}logo_vector.svg`}
          alt="Logo"
          className="w-full max-w-[320px] h-auto"
        />
      </h1>
      <p className="mt-6 text-sm md:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
        Bienvenido a la plataforma de oficial de esta veeduria.
      </p>
    </div>
  );
};
