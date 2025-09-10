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
            <div className="landing__wrapper">
              <div className="landing__content">
                <div className="landing__content__title">
                  Gain more knowledge <br className="remove--tablet" />
                  in less time
                </div>
                <div className="landing__content__subtitle">
                  Great summaries for busy people,
                  <br className="remove--tablet" />
                  individuals who barely have time to read,
                  <br className="remove--tablet" />
                  and even people who don’t like to read.
                </div>

                {/* CLIENT LOGIN BUTTON */}
                <LandingModalBtn />
              </div>

              <figure className="landing__image--mask">
                <img src={landing.src} alt="landing" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="container">
          <div className="row">
            <div className="section__title">Understand books in few minutes</div>
            <div className="features__wrapper">
              <div className="features">
                <div className="features__icon"><AiFillFileText /></div>
                <div className="features__title">Read or listen</div>
                <div className="features__sub--title">Save time by getting the core ideas from the best books.</div>
              </div>
              <div className="features">
                <div className="features__icon"><AiFillBulb /></div>
                <div className="features__title">Find your next read</div>
                <div className="features__sub--title">Explore book lists and personalized recommendations.</div>
              </div>
              <div className="features">
                <div className="features__icon"><AiFillAudio /></div>
                <div className="features__title">Briefcasts</div>
                <div className="features__sub--title">Gain valuable insights from briefcasts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews">
        <div className="row">
          <div className="container">
            <div className="section__title">What our members say</div>
            <div className="reviews__wrapper">
              <div className="review">
                <div className="review__header">
                  <div className="review__name">Hanna M.</div>
                  <div className="review__stars">{stars}</div>
                </div>
                <div className="review__body">
                  This app has been a <b>game-changer</b> for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.
                </div>
              </div>
              <div className="review">
                <div className="review__header">
                  <div className="review__name">David B.</div>
                  <div className="review__stars">{stars}</div>
                </div>
                <div className="review__body">
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
            <div className="section__title">Start growing with Summarist now</div>
            <div className="numbers__wrapper">
              <div className="numbers">
                <div className="numbers__icon"><BiCrown /></div>
                <div className="numbers__title">3 Million</div>
                <div className="numbers__sub--title">Downloads on all platforms</div>
              </div>
              <div className="numbers">
                <div className="numbers__icon numbers__star--icon">
                  {new Array(4).fill(0).map((_,i) => <BsStarFill key={i} />)}
                  <BsStarHalf />
                </div>
                <div className="numbers__title">4.5 Stars</div>
                <div className="numbers__sub--title">Average ratings on iOS and Google Play</div>
              </div>
              <div className="numbers">
                <div className="numbers__icon"><RiLeafLine /></div>
                <div className="numbers__title">97%</div>
                <div className="numbers__sub--title">Of Summarist members create a better reading habit</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
