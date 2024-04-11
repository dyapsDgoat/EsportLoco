import React from "react";
import "./Home.css";
import "./Navigation.css";
import Navigation from "./Navigation";
import Footer from "./Footer";
import why_image from "./images/G2 JERSEY.webp";
import zeus from "./images/zeus-lower-1.png";
import faker from "./images/faker-banner-1.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navigation />
      <>
        <div className="section__container header__container">
          <div className="header__content">
            <h1>
              Expl<span>o</span>re New Things
            </h1>
            <p className="section__description">
              Welcome to EsportLoco, your premier destination for top-notch
              Esports team merchandise! Dive into the world of gaming excellence
              with our curated selection featuring gear from renowned teams like
              T1, FNATIC, G2, KCorp, and idols like Rekkles. Unleash your
              passion for Esports with the latest and coolest team apparel,
              ensuring you're geared up in style. EsportLoco - Where Gaming
              Meets Fashion!
            </p>
            <Link to="/products">
              <button className="btn">Explore More</button>
            </Link>
          </div>
          <div className="header__image"></div>
        </div>
        <section className="section__container why__container">
          <div className="why__image">
            <img src={why_image} alt="G2 2023 Worlds Jersey - Hans Sama" />
          </div>
          <div className="why__content">
            <h2 className="section__header">
              Why Choose
              <br />
              <span className="span-title">EsportLoco</span>
            </h2>
            <p className="section__description">
              Welcome to EsportLoco, the ultimate destination for Esports team
              merchandise! We take pride in offering a distinctive collection of
              gaming gear featuring powerhouse teams like T1, FNATIC, G2, KCorp,
              and celebrated players such as Rekkles. What sets EsportLoco apart
              is our commitment to delivering an exclusive selection that caters
              to the diverse tastes of Esports enthusiasts worldwide.
            </p>
            <p className="section__description">
              Our merchandise not only represents your favorite teams but also
              upholds the standards of quality, ensuring durability and
              longevity. Stay on the cutting edge of Esports fashion with our
              commitment to the latest trends, ensuring you're always in style
              while cheering for your gaming idols. At EsportLoco, we provide a
              seamless and enjoyable shopping experience, making it easy for you
              to navigate our user-friendly website and find the perfect Esports
              team merchandise to express your passion. Choose EsportLoco –
              where your love for gaming meets the pinnacle of fashion
              excellence!
            </p>
            <Link to="/products">
              <button className="btn">
                <span>
                  <i className="ri-add-line"></i>
                </span>{" "}
                Explore More
              </button>
            </Link>
          </div>
        </section>

        <section className="section__container testimonial__container">
          <h2 className="section__header">
            <span>EsportLoco</span>
          </h2>
          <p className="section__description">The legacy evolves</p>
          <div className="swiper testimonial__swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide testimonial__swiper-slide">
                <div className="testimonial__card">
                  <p>
                    "EsportLoco has become my ultimate haven for Esports team
                    merchandise. The selection is mind-blowing, and the detailed
                    product descriptions made it easy for me to find the perfect
                    gear to support my favorite teams. Plus, the speedy shipping
                    is a total game-changer! Thanks, EsportLoco!"
                  </p>
                  <h4>Brayan H. - Manila, PH</h4>
                </div>
              </div>
              <div className="swiper-slide testimonial__swiper-slide">
                <div className="testimonial__card">
                  <p>
                    EsportLoco is my go-to destination for all things Esports
                    fashion. The variety they offer is incredible, and the
                    detailed product descriptions guided me to the ideal
                    merchandise. I recently picked up gear from my favorite
                    team, and the fast shipping made the whole experience even
                    better. EsportLoco, you've won me over
                  </p>
                  <h4>Hunter J. - Antipolo, PH</h4>
                </div>
              </div>
              <div className="swiper-slide testimonial__swiper-slide">
                <div className="testimonial__card">
                  <p>
                    EsportLoco is a true gem for Esports enthusiasts like me.
                    The selection is top-notch, and the detailed product
                    descriptions helped me make informed choices. I recently got
                    my hands on merchandise from top teams, and the fast
                    shipping was a pleasant surprise. EsportLoco, you've earned
                    a loyal customer in me
                  </p>
                  <h4>David D. - Bulacan, PH</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section__container">
          <div className="banner__container">
            <div className="banner__image">
              <img src={faker} alt="banner" />
            </div>
            <div className="banner__content">
              <h2 className="section__header">
                Up To <span>25%</span> Discount
              </h2>
              <p className="section__description">
                Discover EsportLoco, where a diverse range of colors, sizes, and
                categories caters to every Esports fan's taste. Elevate your
                gaming style with our carefully curated selection of merchandise
                from top teams and players. EsportLoco is your ultimate
                destination for an immersive shopping experience, offering the
                perfect gear to amplify your passion. Step into the world of
                Esports fashion – choose EsportLoco for unmatched style and
                gaming excellence!
              </p>
              <Link to="/products">
                <button className="btn">
                  <span>
                    <i className="ri-add-line"></i>
                  </span>{" "}
                  Buy Now
                </button>
              </Link>
              <img src={zeus} alt="banner bg" className="banner__bg" />
            </div>
          </div>
        </section>
      </>
      <Footer />
    </div>
  );
};

export default Home;
