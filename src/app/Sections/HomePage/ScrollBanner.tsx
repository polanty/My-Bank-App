import { CustomImage } from "@/app/components/Images/CustomImage";

const ScrollBanner = () => {
  return (
    <section className="w-screen bg-white p-10 ">
      <div className="container-sm bg-red-700 rounded-4xl p-4">
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

          <CustomImage text="" src="/images/Mobile1.png" />
        </div>
      </div>
    </section>
  );
};

export default ScrollBanner;
