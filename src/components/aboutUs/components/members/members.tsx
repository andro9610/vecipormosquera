import { useMembers } from "./hooks/useMembers";
import { MemberSkeleton } from "./components/memberSkeleton";
import { MemberError } from "./components/memberError";

export const Members: React.FC = () => {
  const { members, isLoading, isError } = useMembers();

  if (isLoading) return <MemberSkeleton length={5}/>
  if (isError) return <MemberError />

  return (
    <div className="relative w-full">
      <div className="rounded-2xl bg-base-100/50 shadow-lg shadow-base-300/20 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {members.map((member) => (
            <article
              key={member.id}
              className="group relative h-100 md:h-100 overflow-hidden rounded-2xl"
            >
              {member.photoSrc ? (
                <img
                  src={member.photoSrc}
                  alt={member.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:shadow-lg group-hover:shadow-black/25"
                  style={{ objectPosition: "center" }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-base-300/40 text-base-content/60">
                  <span>Sin foto</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-3 text-center">
                <div className="rounded-xl bg-black/35 px-3 py-2 text-white backdrop-blur-sm transition duration-300 group-hover:bg-black/50 group-hover:shadow-lg group-hover:shadow-black/25">
                  <h4 className="text-sm font-semibold leading-tight">{member.name}</h4>
                  <p className="mt-1 text-xs font-medium text-white/90">{member.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
