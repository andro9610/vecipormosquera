import type { ClaimantInfo as ClaimantInfoType } from "../types/claimantInfo";

type ClaimantInfoProps = {
  value: ClaimantInfoType;
  onChangeField: (field: keyof ClaimantInfoType, value: string) => void;
};

export const ClaimantInfo = ({ value, onChangeField }: ClaimantInfoProps) => {
  const tratamientoSeleccionado = value.tratamiento === "Sr" || value.tratamiento === "Sra" ? value.tratamiento : "";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <label htmlFor="tratamiento" className="label">
            <span className="label-text">Tratamiento</span>
          </label>
          <div className="flex w-full items-start gap-3 flex-wrap sm:flex-nowrap">
            <label className="custom-option flex sm:w-1/2 flex-row items-start gap-3">
              <input
                type="radio"
                name="tratamiento"
                className="radio radio-primary"
                checked={tratamientoSeleccionado === "Sr"}
                onChange={() => onChangeField("tratamiento", "Sr")}
              />
              <span className="text-base font-medium">Señor</span>
            </label>
            <label className="custom-option flex sm:w-1/2 flex-row items-start gap-3">
              <input
                type="radio"
                name="tratamiento"
                className="radio radio-primary"
                checked={tratamientoSeleccionado === "Sra"}
                onChange={() => onChangeField("tratamiento", "Sra")}
              />
              <span className="text-base font-medium">Señora</span>
            </label>
          </div>
        </div>
        <div className="md:col-span-1">
          <label htmlFor="nombre" className="label">
            <span className="label-text">Nombre completo</span>
          </label>
          <input
            id="nombre"
            type="text"
            className="input input-bordered control-organic "
            placeholder="Ej: Juan Perez"
            value={value.nombre}
            onChange={(event) => onChangeField("nombre", event.target.value)}
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="cedula" className="label">
            <span className="label-text">Numero de cedula</span>
          </label>
          <input
            id="cedula"
            type="number"
            className="input input-bordered control-organic w-full"
            placeholder="Ej: 12345678"
            value={value.cedula}
            onChange={(event) => onChangeField("cedula", event.target.value)}
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="celular" className="label">
            <span className="label-text">Celular</span>
          </label>
          <input
            id="celular"
            type="number"
            className="input input-bordered control-organic w-full"
            placeholder="Ej: 300 234 4955"
            value={value.celular}
            onChange={(event) => onChangeField("celular", event.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="direccion" className="label">
            <span className="label-text">Direccion</span>
          </label>
          <input
            id="direccion"
            type="text"
            className="input input-bordered control-organic w-full"
            placeholder="Ej: Calle X con Carrera Y"
            value={value.direccion}
            onChange={(event) => onChangeField("direccion", event.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="correo" className="label">
            <span className="label-text">Correo electronico</span>
          </label>
          <input
            id="correo"
            type="email"
            className="input input-bordered control-organic w-full"
            placeholder="Ej: correo@dominio.com"
            value={value.correo}
            onChange={(event) => onChangeField("correo", event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
