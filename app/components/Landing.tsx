import React from "react";
import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai";
import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";
import logo from "../assets/logo.png";
import landing from "../assets/landing.png";
import LandingModalBtn from "./LandingModalBtn"

const Landing = () => {
  const stars = new Array(5).fill(0).map((_, index) => <BsStarFill key={index} />);

  return (
    <>
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <img className="nav__img" src={logo.src} alt="logo" />
          </figure>
          <ul className="nav__list--wrapper">
            <li className="nav__list nav__list--login">Login</li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>

      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing__wrapper flex flex-col md:flex-row items-center md:items-start">
              <div className="landing__content w-full md:w-auto flex flex-col items-center md:items-start text-center md:text-left max-w-full md:max-w-none">
                <div className="landing__content__title text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  Gain more knowledge <br className="hidden md:block" />
                  in less time
                </div>
                <div className="landing__content__subtitle text-base sm:text-lg md:text-xl">
                  Great summaries for busy people,
                  <br className="hidden md:block" />
                  individuals who barely have time to read,
                  <br className="hidden md:block" />
                  and even people who don't like to read.
                </div>

                {/* CLIENT LOGIN BUTTON */}
                <div className="w-full md:w-auto">
                  <LandingModalBtn />
                </div>
              </div>

              <figure className="landing__image--mask w-full md:w-auto flex justify-center md:justify-end mt-8 md:mt-0">
                <img src={landing.src} alt="landing" className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] h-auto" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="container">
          <div className="row">
            <div className="section__title text-xl sm:text-2xl md:text-3xl lg:text-4xl">Understand books in few minutes</div>
            <div className="features__wrapper grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              <div className="features">
                <div className="features__icon"><AiFillFileText /></div>
                <div className="features__title text-lg sm:text-xl md:text-2xl">Read or listen</div>
                <div className="features__sub--title text-sm sm:text-base md:text-lg">Save time by getting the core ideas from the best books.</div>
              </div>
              <div className="features">
                <div className="features__icon"><AiFillBulb /></div>
                <div className="features__title text-lg sm:text-xl md:text-2xl">Find your next read</div>
                <div className="features__sub--title text-sm sm:text-base md:text-lg">Explore book lists and personalized recommendations.</div>
              </div>
              <div className="features">
                <div className="features__icon"><AiFillAudio /></div>
                <div className="features__title text-lg sm:text-xl md:text-2xl">Briefcasts</div>
                <div className="features__sub--title text-sm sm:text-base md:text-lg">Gain valuable insights from briefcasts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews">
        <div className="row">
          <div className="container">
            <div className="section__title text-xl sm:text-2xl md:text-3xl lg:text-4xl">What our members say</div>
            <div className="reviews__wrapper max-w-full md:max-w-[600px] mx-auto px-4 md:px-0">
              <div className="review mb-6 md:mb-8">
                <div className="review__header flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="review__name">Hanna M.</div>
                  <div className="review__stars flex">{stars}</div>
                </div>
                <div className="review__body text-sm sm:text-base">
                  This app has been a <b>game-changer</b> for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.
                </div>
              </div>
              <div className="review">
                <div className="review__header flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="review__name">David B.</div>
                  <div className="review__stars flex">{stars}</div>
                </div>
                <div className="review__body text-sm sm:text-base">
                  I love this app! It provides <b>concise and accurate summaries</b> of books in a way that is easy to understand.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section id="numbers">
        <div className="container">
          <div className="row">
            <div className="section__title text-xl sm:text-2xl md:text-3xl lg:text-4xl">Start growing with Summarist now</div>
            <div className="numbers__wrapper grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              <div className="numbers">
                <div className="numbers__icon"><BiCrown /></div>
                <div className="numbers__title text-2xl sm:text-3xl md:text-4xl lg:text-5xl">3 Million</div>
                <div className="numbers__sub--title text-sm sm:text-base md:text-lg">Downloads on all platforms</div>
              </div>
              <div className="numbers">
                <div className="numbers__icon numbers__star--icon flex items-center justify-center gap-1">
                  {new Array(4).fill(0).map((_,i) => <BsStarFill key={i} />)}
                  <BsStarHalf />
                </div>
                <div className="numbers__title text-2xl sm:text-3xl md:text-4xl lg:text-5xl">4.5 Stars</div>
                <div className="numbers__sub--title text-sm sm:text-base md:text-lg">Average ratings on iOS and Google Play</div>
              </div>
              <div className="numbers">
                <div className="numbers__icon"><RiLeafLine /></div>
                <div className="numbers__title text-2xl sm:text-3xl md:text-4xl lg:text-5xl">97%</div>
                <div className="numbers__sub--title text-sm sm:text-base md:text-lg">Of Summarist members create a better reading habit</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
