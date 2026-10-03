import { useState } from "react";
import { MaterialIcon } from "../../fragments/materialIcon/MaterialIcon";
import { Members } from "./components/members/members";
import { Partners } from "./components/partners/partners";
import { OrganizationTimeline } from "./components/organizationTimeline/organizationTimeLine";
import { JoinUsModal } from "./components/joinUsModal";

export const Home = () => {
    const [isJoinUsOpen, setIsJoinUsOpen] = useState(false);
    return (
        <>
        <div className="row flex justify-between items-center">
            <h4 className="text-4xl">Miembros</h4>
            <button className="px-2 me:px-6 py-2 btn btn-outline rounded-lg flex items-center" onClick={() => setIsJoinUsOpen(true)}>
                <MaterialIcon icon="group_add" className="me-0 md:me-4" />
                <span className="hidden md:inline">Únete a nosotros</span>
            </button>
        </div>
        
            <Members />
            
            <div className="py-5">
                <h4 className="text-4xl">
                    ORGANIZACIONES ALIADAS
                </h4>
                <Partners />
            </div>
            <OrganizationTimeline />
            <JoinUsModal isOpen={isJoinUsOpen} onClose={() => setIsJoinUsOpen(false)} />
        </>
    );
}
