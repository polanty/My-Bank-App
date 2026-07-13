import { Container } from "react-bootstrap";
import AnimatedImageScroll from "@/app/components/Animation/ImageScrollIn/ImageScrollIn";

const PhoneSection = () => {
  return (
    <section className="w-screen bg-neutral-200 p-10 ">
      <Container className="bg-neutral-200 p-10  rounded-xl">
        <div className="h-[70vh] grid grid-cols-2 grid-rows-1">
          <div className="h-full flex items-center  justify-center">
            <div>
              <h3 className="font-sans font-bold text-5xl text-black">
                Your bank in your pocket
              </h3>
              <p className="font-sans text-xl text-black">
                Join the 10 million customers who already use our highly rated
                app.
              </p>
            </div>
          </div>

          <AnimatedImageScroll src="/Images/Mobile1.png" />
        </div>
      </Container>
    </section>
  );
};

export default PhoneSection;
