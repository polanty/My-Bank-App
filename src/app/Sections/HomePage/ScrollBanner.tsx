import { CustomImage } from "@/app/components/Images/CustomImage";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const ScrollBanner = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    //let links = gsap.utils.toArray("nav a");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cards",
        pin: true,
        pinSpacing: true,
        markers: false,
        start: "top-=120px top", // when the top of the trigger hits the top of the viewport
        end: "+=2000", // end after scrolling 1000px beyond the start
        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      },
    });
    tl.addLabel("card1");
    tl.to(".card1", {
      yPercent: 0,
      opacity: 1,
    });

    tl.from(".card2", {
      yPercent: 75,
      opacity: 0,
    });
    tl.addLabel("card2");
    // set the active section based on the direction, and position it part-way through the transition because that's more intuitive
    tl.add(
      () => setActiveNav(tl.scrollTrigger.direction > 0 ? 1 : 0),
      "-=0.15"
    );
    tl.to(
      ".card1",
      {
        scale: 0.95,
        yPercent: -0.5,
        opacity: 0.7,
      },
      "-=0.3"
    );

    tl.to(".card2", {
      yPercent: 0,
      opacity: 1,
    });

    tl.from(".card3", {
      yPercent: 75,
      opacity: 0,
    });
    tl.addLabel("card3");
    tl.add(
      () => setActiveNav(tl.scrollTrigger.direction > 0 ? 2 : 1),
      "-=0.15"
    );

    tl.to(
      ".card2",
      {
        scale: 0.98,
        yPercent: -0.4,
        opacity: 0.7,
      },
      "-=0.3"
    );

    tl.to(".card3", {
      yPercent: 0,
      opacity: 1,
    });

    tl.to(".card3", {});

    gsap.utils.toArray(".nav a").forEach((a, i) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const pad = i === 0 ? 0 : tl.scrollTrigger.direction > 0 ? 2 : -2;
        gsap.to(window, {
          scrollTo: labelToScroll(tl, "card" + (i + 1)) + pad,
        });
      });
    });
    function labelToScroll(timeline, label) {
      const st = timeline.scrollTrigger,
        progress = timeline.labels[label] / timeline.duration();
      return st.start + (st.end - st.start) * progress;
    }

    const circles = gsap.utils.toArray(".nav .circle");
    function setActiveNav(index) {
      circles.forEach((circle, i) =>
        circle.classList[i === index ? "add" : "remove"]("active")
      );
    }
  }, []);

  return (
    <section className="relative w-screen  p-30">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="block_top">
              <h1>Find the right products for your business</h1>
              <p>
                Discover what we could do for your business. Explore our
                products today.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="cards">
              <ul className="nav">
                <li>
                  <a href="#card1">
                    <div className="circle active 1">1</div>
                  </a>
                </li>
                <li>
                  <a href="#card2">
                    <div className="circle 2">2</div>
                  </a>
                </li>
                <li>
                  <a href="#card3">
                    <div className="circle 3">3</div>
                  </a>
                </li>
              </ul>

              <div className="custom-card card1 z-20" id="1">
                <h1>Slide 1</h1>
              </div>
              <div className="custom-card card2 z-30" id="2">
                <h1>Slide 2</h1>
              </div>
              <div className="custom-card card3 z-40" id="3">
                <h1>Slide 3</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="next_block">
              <h1>End content</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollBanner;

// {/* <section className="relative w-screen h-screen  p-30">
//       {/* bg-blue-500 */}
//       <div id="smooth-wrapper">
//         <div id="smooth-content">
//           <div className="spacer"></div>

//           <div className="card-containers">
//             <div className="stacked-cards">
//               {/* Card content goes in here  */}
//               <div className="container-sm bg-red-700 rounded-4xl p-4 mb-20">
//                 <div className="h-[70vh] grid grid-cols-2 grid-rows-1">
//                   <div className="h-full flex items-center  justify-center">
//                     <div>
//                       <h3 className="font-sans font-bold text-5xl text-black">
//                         Your bank in your pocket
//                       </h3>
//                       <p className="font-sans text-xl text-black">
//                         Join the 10 million customers who already use our highly
//                         rated app.
//                       </p>
//                     </div>
//                   </div>

//                   <CustomImage text="" src="/images/Mobile1.png" />
//                 </div>
//               </div>
//               {/* Content 2 */}
//               <div className="container-sm bg-blue-700 rounded-4xl p-4 mb-20">
//                 <div className="h-[70vh] grid grid-cols-2 grid-rows-1">
//                   <div className="h-full flex items-center  justify-center">
//                     <div>
//                       <h3 className="font-sans font-bold text-5xl text-black">
//                         Your bank in your pocket
//                       </h3>
//                       <p className="font-sans text-xl text-black">
//                         Join the 10 million customers who already use our highly
//                         rated app.
//                       </p>
//                     </div>
//                   </div>

//                   <CustomImage text="" src="/images/Mobile1.png" />
//                 </div>
//               </div>
//               {/* Content 3 */}
//               <div className="container-sm bg-green-700 rounded-4xl p-4 mb-20">
//                 <div className="h-[70vh] grid grid-cols-2 grid-rows-1">
//                   <div className="h-full flex items-center  justify-center">
//                     <div className="card-content">
//                       <h3 className="font-sans font-bold text-5xl text-black">
//                         Your bank in your pocket
//                       </h3>
//                       <p className="font-sans text-xl text-black">
//                         Join the 10 million customers who already use our highly
//                         rated app.
//                       </p>
//                     </div>
//                   </div>

//                   <CustomImage text="" src="/images/Mobile1.png" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="spacer"></div>
//         </div>
//       </div>
// </section> */}
