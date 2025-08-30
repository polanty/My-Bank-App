import { CustomImage } from "@/app/components/Images/CustomImage";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// document.addEventListener("DOMContentLoaded", () => {
//   gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

//   ScrollSmoother.create({
//     wrapper: "#smooth-wrapper",
//     content: "#smooth-content",
//     smooth: 1.2,
//     effects: true,
//     smoothTouch: 0.1,
//   });

//   const cards = gsap.utils.toArray(".container-sm");

//   cards.forEach((card, i) => {
//     gsap.to(card, {
//       scale: 0.8 + 0.2 * (i / (cards.length - 1)),
//       ease: "none",
//       scrollTrigger: {
//         trigger: card,
//         start: "top " + (15 + 35 + i),
//         end: "bottom bottom",
//         endTrigger: ".card-containers",
//         pin: card,
//         pinSpacing: false,
//         invalidateOnRefresh: true,
//         markers: {
//           indent: 100 * i,
//           fontSize: "20px",
//         },
//         id: i + 1,
//       },
//     });
//   });
// });

const ScrollBanner = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
        smoothTouch: 0.1,
      });

      const cards = gsap.utils.toArray(".container-sm");

      cards.forEach((card, i) => {
        gsap.to(card, {
          scale: 0.8 + 0.2 * (i / (cards.length - 1)),
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top " + (15 + 35 + i),
            end: "bottom bottom",
            endTrigger: ".card-containers",
            pin: card,
            pinSpacing: false,
            invalidateOnRefresh: true,
            markers: {
              indent: 100 * i,
              fontSize: "20px",
            },
            id: i + 1,
          },
        });
      });
    }
  }, []);

  return (
    <section className="w-screen bg-white p-10 ">
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="spacer"></div>

          <div className="card-containers">
            <div className="stacked-cards">
              {/* Card content goes in here  */}
              <div className="container-sm bg-red-700 rounded-4xl p-4  mb-[75vh]">
                <div className="h-[70vh] grid grid-cols-2 grid-rows-1">
                  <div className="h-full flex items-center  justify-center">
                    <div>
                      <h3 className="font-sans font-bold text-5xl text-black">
                        Your bank in your pocket
                      </h3>
                      <p className="font-sans text-xl text-black">
                        Join the 10 million customers who already use our highly
                        rated app.
                      </p>
                    </div>
                  </div>

                  <CustomImage text="" src="/images/Mobile1.png" />
                </div>
              </div>
              {/* Content 2 */}
              <div className="container-sm bg-blue-700 rounded-4xl p-4  mb-[75vh]">
                <div className="h-[70vh] grid grid-cols-2 grid-rows-1">
                  <div className="h-full flex items-center  justify-center">
                    <div>
                      <h3 className="font-sans font-bold text-5xl text-black">
                        Your bank in your pocket
                      </h3>
                      <p className="font-sans text-xl text-black">
                        Join the 10 million customers who already use our highly
                        rated app.
                      </p>
                    </div>
                  </div>

                  <CustomImage text="" src="/images/Mobile1.png" />
                </div>
              </div>
              {/* Content 3 */}
              <div className="container-sm bg-green-700 rounded-4xl p-4  mb-[75vh]">
                <div className="h-[70vh] grid grid-cols-2 grid-rows-1">
                  <div className="h-full flex items-center  justify-center">
                    <div className="card-content">
                      <h3 className="font-sans font-bold text-5xl text-black">
                        Your bank in your pocket
                      </h3>
                      <p className="font-sans text-xl text-black">
                        Join the 10 million customers who already use our highly
                        rated app.
                      </p>
                    </div>
                  </div>

                  <CustomImage text="" src="/images/Mobile1.png" />
                </div>
              </div>
            </div>
          </div>

          <div className="spacer"></div>
        </div>
      </div>
    </section>
  );
};

export default ScrollBanner;
