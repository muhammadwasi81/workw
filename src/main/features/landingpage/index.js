import { useEffect } from "react";
import BackToTopButton from "./BackToTopButton";
import CorporateSolution from "./coprorate-solution";
import SolutionTools from "./solution-tools";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingMainPage = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <CorporateSolution />
      <SolutionTools />
      <BackToTopButton />
    </>
  );
};

export default LandingMainPage;
