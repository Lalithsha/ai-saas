
import { LandingContent } from "@/components/landing-conten";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";

const LandingPage = () => {
    return (

        <div className="h-full" >
            <LandingNavbar />
            <LandingHero/>
            <LandingContent/>
        </div>

    )
}

export default LandingPage;




