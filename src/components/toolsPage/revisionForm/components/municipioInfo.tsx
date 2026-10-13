import type { MunicipioInfo as MunicipioInfoType } from "../types/municipioInfo";

type MunicipioInfoProps = {
  value: MunicipioInfoType;
  onChangeField: (field: keyof MunicipioInfoType, value: string) => void;
};

export const MunicipioInfo = ({ value, onChangeField }: MunicipioInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <label htmlFor="departamento" className="label">
            <span className="label-text">Departamento</span>
          </label>
          <input
            id="departamento"
            type="text"
            className="input input-bordered control-organic w-full"
            placeholder="Ej: Cundinamarca"
            value={value.departamento}
            onChange={(event) => onChangeField("departamento", event.target.value)}
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="municipio" className="label">
            <span className="label-text">Municipio</span>
          </label>
          <input
            id="municipio"
            type="text"
            className="input input-bordered control-organic w-full"
            placeholder="Ej: Mosquera"
            value={value.municipio}
            onChange={(event) => onChangeField("municipio", event.target.value)}
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="gestorCatastral" className="label">
            <span className="label-text">Gestor Catastral</span>
          </label>
          <input
            id="gestorCatastral"
            type="text"
            className="input input-bordered control-organic w-full"
            placeholder="Ej: Instituto Geografico Agustin Codazzi"
            value={value.gestorCatastral}
            onChange={(event) => onChangeField("gestorCatastral", event.target.value)}
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="correoGestorCatastral" className="label">
            <span className="label-text">Correo del gestor catastral</span>
          </label>
          <input
            id="correoGestorCatastral"
            type="email"
            className="input input-bordered control-organic w-full"
            placeholder="Ej: correo@entidad.gov.co"
            value={value.correoGestorCatastral}
            onChange={(event) => onChangeField("correoGestorCatastral", event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
