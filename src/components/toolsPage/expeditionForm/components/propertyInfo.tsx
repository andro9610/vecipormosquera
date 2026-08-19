type Predio = {
  identificador: string;
  numeroIdentificacion: string;
  direccion: string;
};

type PropertyInfoProps = {
  value: Predio;
  onChangeField: (field: keyof Predio, value: string) => void;
};

export const PropertyInfo = ({ value, onChangeField }: PropertyInfoProps) => {
  const identificadorSeleccionado =
    value.identificador === "Matricula" || value.identificador === "CedulaCatastral" ? value.identificador : "";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="identificador" className="label">
            <span className="label-text">Tipo de identificacion del predio</span>
          </label>
          <div className="flex w-full items-start gap-3 flex-wrap sm:flex-nowrap">
            <label className="custom-option flex sm:w-1/2 flex-row items-start gap-3">
              <input
                type="radio"
                name="identificador"
                className="radio radio-primary"
                checked={identificadorSeleccionado === "Matricula"}
                onChange={() => onChangeField("identificador", "Matricula")}
              />
              <span className="text-base font-medium">Matricula Inmobiliaria</span>
            </label>
            <label className="custom-option flex sm:w-1/2 flex-row items-start gap-3">
              <input
                type="radio"
                name="identificador"
                className="radio radio-primary"
                checked={identificadorSeleccionado === "CedulaCatastral"}
                onChange={() => onChangeField("identificador", "CedulaCatastral")}
              />
              <span className="text-base font-medium">Cedula catastral</span>
            </label>
          </div>
        </div>
        <div className="md:col-span-1">
          <label htmlFor="numeroIdentificacion" className="label">
            <span className="label-text">Numero de identificacion</span>
          </label>
          <input
            id="numeroIdentificacion"
            type="text"
            className="input input-bordered control-organic w-full"
            placeholder="Ej: XXXXXXXXXXXXXXX"
            value={value.numeroIdentificacion}
            onChange={(event) => onChangeField("numeroIdentificacion", event.target.value)}
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="direccion" className="label">
            <span className="label-text">
              Direccion del predio <span className="text-error">*</span>
            </span>
          </label>
          <input
            id="direccion"
            type="text"
            className="input input-bordered control-organic w-full"
            placeholder="Ej: Calle X con Carrera Y (obligatoria)"
            value={value.direccion}
            onChange={(event) => onChangeField("direccion", event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
