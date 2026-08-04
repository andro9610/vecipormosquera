import type { ClaimantInfo } from "../types/claimantInfo";

type PropertyInfoProps = {
  value: ClaimantInfo;
  onChangeField: (field: keyof ClaimantInfo, value: string | boolean) => void;
};

export const PropertyInfo = ({ value, onChangeField }: PropertyInfoProps) => {
  const identificadorSeleccionado =
    value.identificador === "Matricula" || value.identificador === "CedulaCatastral" ? value.identificador : "";

  return (
    <>
      <div className="md:col-span-2">
        <label htmlFor="identificador" className="label">
          <span className="label-text">Identificador del predio</span>
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
      <div className="md:col-span-2">
        <label htmlFor="numeroIdentificacion" className="label">
          <span className="label-text">Numero Identificador</span>
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
    </>
  );
};
