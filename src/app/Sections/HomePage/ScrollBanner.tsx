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
      () => setActiveNav((tl.scrollTrigger?.direction ?? 1) > 0 ? 1 : 0),
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
      () => setActiveNav((tl.scrollTrigger?.direction ?? 1) > 0 ? 2 : 1),
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

    gsap.utils.toArray<HTMLAnchorElement>(".nav a").forEach((a, i) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const pad =
          i === 0 ? 0 : (tl.scrollTrigger?.direction ?? 1) > 0 ? 2 : -2;
        gsap.to(window, {
          scrollTo: labelToScroll(tl, "card" + (i + 1)) + pad,
        });
      });
    });
    function labelToScroll(timeline: gsap.core.Timeline, label: string) {
      const st = timeline.scrollTrigger;
      if (!st) return 0;

      const progress = timeline.labels[label] / timeline.duration();
      return st.start + (st.end - st.start) * progress;
    }

    const circles = gsap.utils.toArray<HTMLElement>(".nav .circle");
    function setActiveNav(index: number) {
      circles.forEach((circle, i) =>
        circle.classList[i === index ? "add" : "remove"]("active")
      );
    }
  }, []);

  const bankingProducts = [
    {
      id: "1",
      className: "card1 z-20",
      eyebrow: "Everyday banking",
      title: "EGO Flex Current",
      description:
        "A fictional current account built for quick balance checks, instant internal transfers and clear spending history.",
      details: [
        ["Monthly fee", "GBP 0"],
        ["Internal transfers", "Instant"],
        ["Card controls", "Included"],
      ],
      action: "Open current account",
    },
    {
      id: "2",
      className: "card2 z-30",
      eyebrow: "Business banking",
      title: "EGO Business Flow",
      description:
        "Separate operating cash, scheduled supplier payments and month-end statement downloads for a small team.",
      details: [
        ["Account number", "1004502198"],
        ["Payment limit", "GBP 25,000"],
        ["Statement export", "PDF"],
      ],
      action: "Explore business tools",
    },
    {
      id: "3",
      className: "card3 z-40",
      eyebrow: "Planning ahead",
      title: "EGO Saver Reserve",
      description:
        "A simple savings space for emergency funds, fixed goals and fictional interest projections inside online banking.",
      details: [
        ["Projected AER", "4.10%"],
        ["Goal pockets", "5 included"],
        ["Access", "Same day"],
      ],
      action: "Start saving",
    },
  ];

  return (
    <section className="relative w-screen overflow-hidden px-4 py-16 md:px-10">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="block_top">
              <p className="scroll-banner-eyebrow">Featured banking journeys</p>
              <h1>Products that move with the way you bank</h1>
              <p>
                Choose from fictional EGO Bank accounts designed for personal
                spending, business cash flow and longer-term financial goals.
              </p>
              <div
                className="scroll-banner-summary"
                aria-label="Product highlights"
              >
                <span>Secure app access</span>
                <span>PDF statements</span>
                <span>Fast internal payments</span>
              </div>
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

              {bankingProducts.map((product) => (
                <div
                  className={`custom-card ${product.className}`}
                  id={product.id}
                  key={product.id}
                >
                  <div className="scroll-card-content">
                    <div>
                      <p className="scroll-banner-eyebrow">{product.eyebrow}</p>
                      <h2>{product.title}</h2>
                      <p className="scroll-card-description">
                        {product.description}
                      </p>
                    </div>

                    <div className="scroll-card-details">
                      {product.details.map(([label, value]) => (
                        <div className="scroll-card-row" key={label}>
                          <span>{label}</span>
                          <strong>{value}</strong>
                        </div>
                      ))}
                    </div>

                    <button type="button" className="scroll-card-action">
                      {product.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="next_block">
              <div>
                <p className="scroll-banner-eyebrow">Ready when you are</p>
                <h2>Log on to continue your EGO Bank journey</h2>
                <p>
                  Existing fictional customers can review balances, download
                  statements and send payments from the secure account area.
                </p>
              </div>
              <a href="/signInpage" className="scroll-card-action">
                Log on
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollBanner;
