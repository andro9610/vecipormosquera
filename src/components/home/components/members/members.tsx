import { MaterialIcon } from "../../../../fragments/materialIcon/MaterialIcon";
import { useMembers } from "./hooks/useMembers";
import { MemberSkeleton } from "./components/memberSkeleton";
import { MemberError } from "./components/memberError";

export const Members: React.FC = () => {
  const { members, isLoading, isError } = useMembers();

  if (isLoading) return <MemberSkeleton length={5} />
  if (isError) return <MemberError />

  return (
    <section className="surface-panel p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg">
          <MaterialIcon icon="groups" className="text-primary" />
          Integrantes de la veeduría
        </h2>
        <span className="badge badge-primary badge-sm">{members.length}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {members.map((member) => (
          <article
            key={member.id}
            className="group relative h-44 overflow-hidden rounded-2xl border border-base-300/60 sm:h-56"
          >
            {member.photoSrc ? (
              <img
                src={member.photoSrc}
                alt={member.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                style={{ objectPosition: "center" }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-base-300/40 text-xs text-base-content/60">
                <span>Sin foto</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-3">
              <h4 className="text-sm font-semibold leading-tight text-white">{member.name}</h4>
              <p className="mt-0.5 text-xs font-medium text-white/85">{member.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
