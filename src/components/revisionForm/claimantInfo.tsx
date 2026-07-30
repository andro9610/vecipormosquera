type ClaimantInfo = {
    tratamiento: string;
    nombre: string;
    cedula: string;
    direccion: string;
    celular: string;
    correo: string;
};

type ClaimantInfoProps = {
    value: ClaimantInfo;
    onChangeField: (field: keyof ClaimantInfo, value: string) => void;
};

export const ClaimantInfo = ({ value, onChangeField }: ClaimantInfoProps) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-1">
                    <label htmlFor="tratamiento" className="label">
                        <span className="label-text font-semibold">Tratamiento</span>
                    </label>
                    <select
                        id="tratamiento"
                        className="select select-bordered control-organic w-full"
                        value={value.tratamiento}
                        onChange={(event) => onChangeField('tratamiento', event.target.value)}
                    >
                        <option value="">- Seleccione una opcion -</option>
                        <option value="Sr">Señor</option>
                        <option value="Sra">Señora</option>
                    </select>
                </div>
                <div className="md:col-span-1">
                    <label htmlFor="nombre" className="label">
                        <span className="label-text font-semibold">Nombre completo</span>
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        className="input input-bordered control-organic w-full"
                        placeholder="Ej: Juan Perez"
                        value={value.nombre}
                        onChange={(event) => onChangeField('nombre', event.target.value)}
                    />
                </div>
                <div className="md:col-span-1">
                    <label htmlFor="cedula" className="label">
                        <span className="label-text font-semibold">Numero de cedula</span>
                    </label>
                    <input
                        id="cedula"
                        type="number"
                        className="input input-bordered control-organic w-full"
                        placeholder="Ej: 12345678"
                        value={value.cedula}
                        onChange={(event) => onChangeField('cedula', event.target.value)}
                    />
                </div>
                <div className="md:col-span-1">
                    <label htmlFor="celular" className="label">
                        <span className="label-text font-semibold">Celular</span>
                    </label>
                    <input
                        id="celular"
                        type="number"
                        className="input input-bordered control-organic w-full"
                        placeholder="Ej: 300 234 4955"
                        value={value.celular}
                        onChange={(event) => onChangeField('celular', event.target.value)}
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="direccion" className="label">
                        <span className="label-text font-semibold">Direccion</span>
                    </label>
                    <input
                        id="direccion"
                        type="text"
                        className="input input-bordered control-organic w-full"
                        placeholder="Ej: Calle X con Carrera Y"
                        value={value.direccion}
                        onChange={(event) => onChangeField('direccion', event.target.value)}
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="correo" className="label">
                        <span className="label-text font-semibold">Correo electronico</span>
                    </label>
                    <input
                        id="correo"
                        type="email"
                        className="input input-bordered control-organic w-full"
                        placeholder="Ej: correo@dominio.com"
                        value={value.correo}
                        onChange={(event) => onChangeField('correo', event.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
