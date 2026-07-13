"use client";

import ControlledCarousel from "./components/Courasels/Courasels";
import PhoneSection from "./Sections/HomePage/Phone.Section";
import ScrollBanner from "./Sections/HomePage/ScrollBanner";
import Survey from "./Sections/HomePage/QualitySurvey.Section";
import Footer from "./Sections/Footer/Footer";

export default function Home() {
  return (
    <div>
      <main className="overflow-hidden">
        <ControlledCarousel />
        <PhoneSection />
        <ScrollBanner />
        <Survey />
        <Footer />
      </main>
    </div>
  );
}
