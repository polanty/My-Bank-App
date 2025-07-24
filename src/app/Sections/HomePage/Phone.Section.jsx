import { Container } from "react-bootstrap";
import { CustomImage } from "@/app/components/Images/CustomImage";
import AnimatedImageScroll from "@/app/components/Animation/ImageScrollIn/ImageScrollIn";

const PhoneSection = () => {
  return (
    <section className="w-screen bg-neutral-200 p-10 ">
      <Container className="bg-neutral-200 p-10  rounded-xl">
        <div className="h-[70vh] grid grid-cols-2 grid-rows-1">
          <div className="h-full flex items-center  justify-center">
            <div>
              <h3>Your bank in your pocket</h3>
              <p>
                Join the 10 million customers who already use our highly rated
                app.
              </p>
            </div>
          </div>

          {/* <CustomImage text="" src="/images/Mobile1.png" /> */}
          <AnimatedImageScroll src="/images/Mobile1.png" />
        </div>
      </Container>
    </section>
  );
};

export default PhoneSection;
