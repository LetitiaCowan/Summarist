"use client";
import React, { useState } from 'react';
import { BiCrown, BiCheck, BiX, BiStar, BiShield, BiHeadphone, BiBookOpen, BiDownload, BiSupport } from 'react-icons/bi';
import { AiFillAudio, AiFillFileText, AiFillBulb } from 'react-icons/ai';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const ChosenPlanClientWrapper = () => {
    const router = useRouter()
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [selectedPlan, setSelectedPlan] = useState('premium');
    const [openAccordion, setOpenAccordion] = useState(null);
    
    const plans = {
      monthly: {
        basic: {
          name: 'Basic',
          price: 4.99,
          period: 'month',
          description: 'Perfect for casual readers',
          features: [
            'Up to 5 book summaries per month',
            'Text summaries only',
            'Basic recommendations',
            'Email support'
          ],
          limitations: [
            'No audio summaries',
            'No offline access',
            'Limited recommendations'
          ]
        },
        premium: {
          name: 'Premium',
          price: 9.99,
          period: 'month',
          description: 'Unlimited access to all features',
          features: [
            'Unlimited book summaries',
            'Audio summaries',
            'Personalized recommendations',
            'Offline access',
            'Priority support',
            'Advanced search filters',
            'Reading progress tracking',
            'Custom playlists'
          ],
          limitations: []
        }
      },
      yearly: {
        basic: {
          name: 'Basic',
          price: 49.99,
          period: 'year',
          description: 'Perfect for casual readers',
          savings: 'Save 17%',
          features: [
            'Up to 5 book summaries per month',
            'Text summaries only',
            'Basic recommendations',
            'Email support'
          ],
          limitations: [
            'No audio summaries',
            'No offline access',
            'Limited recommendations'
          ]
        },
        premium: {
          name: 'Premium',
          price: 99.99,
          period: 'year',
          description: 'Unlimited access to all features',
          savings: 'Save 17%',
          freeTrial: '7-day free trial',
          features: [
            'Unlimited book summaries',
            'Audio summaries',
            'Personalized recommendations',
            'Offline access',
            'Priority support',
            'Advanced search filters',
            'Reading progress tracking',
            'Custom playlists',
            'Early access to new features',
            'Exclusive content'
          ],
          limitations: []
        }
      }
    };

    const currentPlan = plans[billingCycle][selectedPlan];

    const toggleAccordion = (item) => {
      setOpenAccordion(openAccordion === item ? null : item);
    };

    const handleManageSubscription = () => {
      // TODO: Implement subscription management
      // Placeholder for future implementation
    };

    const handleCancelSubscription = () => {
      // TODO: Implement subscription cancellation
      // Placeholder for future implementation
    };

    const handleBackToLibrary = () => {
      router.push('/logged-in/library');
    };

    const handleSubscribe = () => {
      // UI only - no actual billing functionality
      // Placeholder for future implementation
      alert(`You would be subscribed to ${currentPlan.name} plan for $${currentPlan.price}/${currentPlan.period}`);
    };

    const faqItems = [
      {
        question: "What's included in the free trial?",
        answer: "The 7-day free trial gives you full access to all Premium features, including unlimited summaries, audio content, and offline access. You can cancel anytime during the trial period without being charged."
      },
      {
        question: "Can I switch between plans?",
        answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
      },
      {
        question: "What happens if I cancel?",
        answer: "You'll continue to have access to Premium features until the end of your current billing period. After that, you'll be moved to the free tier with limited access."
      },
      {
        question: "Do you offer refunds?",
        answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
      },
      {
        question: "Is my data secure?",
        answer: "Absolutely. We use industry-standard encryption to protect your data and never share your personal information with third parties."
      }
    ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#032b41] to-[#1a4b5c] text-white">
        <div className="row py-8 sm:py-12 md:py-16">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Unlock Unlimited Knowledge
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
              Get instant access to loads of book summaries, audio content, and personalized recommendations. 
              Start your learning journey today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-2">
                <BiStar className="text-yellow-400 text-lg sm:text-xl" />
                <span className="font-semibold text-sm sm:text-base">4.9/5 rating</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-400"></div>
              <div className="flex items-center gap-2">
                <BiShield className="text-green-400 text-lg sm:text-xl" />
                <span className="font-semibold text-sm sm:text-base">30-day guarantee</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-400"></div>
              <div className="flex items-center gap-2">
                <BiHeadphone className="text-blue-400 text-lg sm:text-xl" />
                <span className="font-semibold text-sm sm:text-base">24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="row py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#032b41] mb-3 sm:mb-4">
            Choose Your Plan
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#394547] mb-6 sm:mb-8">
            Start with a free trial, cancel anytime
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 flex-wrap">
            <span className={`text-base sm:text-lg font-medium ${billingCycle === 'monthly' ? 'text-[#032b41]' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-14 sm:w-16 h-7 sm:h-8 rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-[#2bd97c]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 sm:top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-8 sm:translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-base sm:text-lg font-medium ${billingCycle === 'yearly' ? 'text-[#032b41]' : 'text-gray-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-[#2bd97c] text-[#032b41] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                Save 17%
              </span>
            )}
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-0">
          {/* Basic Plan */}
          <div 
            className={`bg-white rounded-2xl shadow-lg border-2 p-4 sm:p-6 md:p-8 cursor-pointer transition-all ${
              selectedPlan === 'basic' ? 'border-[#2bd97c] ring-4 ring-[#2bd97c]/20' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedPlan('basic')}
          >
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-[#032b41] mb-2">Basic</h3>
              <p className="text-sm sm:text-base text-[#394547] mb-4">{plans[billingCycle].basic.description}</p>
              <div className="mb-4">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#032b41]">
                  ${plans[billingCycle].basic.price}
                </span>
                <span className="text-[#394547] text-base sm:text-lg">/{plans[billingCycle].basic.period}</span>
              </div>
              {plans[billingCycle].basic.savings && (
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                  {plans[billingCycle].basic.savings}
                </div>
              )}
            </div>

            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {plans[billingCycle].basic.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <BiCheck className="text-[#2bd97c] text-lg sm:text-xl flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-[#394547]">{feature}</span>
                </li>
              ))}
              {plans[billingCycle].basic.limitations.map((limitation, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <BiX className="text-gray-400 text-lg sm:text-xl flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-400">{limitation}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPlan('basic');
                handleSubscribe();
              }}
              className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-colors ${
                selectedPlan === 'basic'
                  ? 'bg-[#2bd97c] text-[#032b41] hover:bg-[#20ba68]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {selectedPlan === 'basic' ? 'Selected' : 'Choose Basic'}
            </button>
          </div>

          {/* Premium Plan */}
          <div 
            className={`bg-white rounded-2xl shadow-lg border-2 p-4 sm:p-6 md:p-8 cursor-pointer transition-all relative ${
              selectedPlan === 'premium' ? 'border-[#2bd97c] ring-4 ring-[#2bd97c]/20' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedPlan('premium')}
          >
            {/* Popular Badge */}
            <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-[#2bd97c] text-[#032b41] px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <BiCrown className="text-base sm:text-lg" />
                Most Popular
              </div>
            </div>

            <div className="text-center mb-6 sm:mb-8 pt-2 sm:pt-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#032b41] mb-2">Premium</h3>
              <p className="text-sm sm:text-base text-[#394547] mb-4">{plans[billingCycle].premium.description}</p>
              <div className="mb-4">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#032b41]">
                  ${plans[billingCycle].premium.price}
                </span>
                <span className="text-[#394547] text-base sm:text-lg">/{plans[billingCycle].premium.period}</span>
              </div>
              <div className="flex flex-col gap-2">
                {plans[billingCycle].premium.savings && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                    {plans[billingCycle].premium.savings}
                  </div>
                )}
                {plans[billingCycle].premium.freeTrial && (
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                    {plans[billingCycle].premium.freeTrial}
                  </div>
                )}
              </div>
            </div>

            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {plans[billingCycle].premium.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 sm:gap-3">
                  <BiCheck className="text-[#2bd97c] text-lg sm:text-xl flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-[#394547]">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPlan('premium');
                handleSubscribe();
              }}
              className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-colors ${
                selectedPlan === 'premium'
                  ? 'bg-[#2bd97c] text-[#032b41] hover:bg-[#20ba68]'
                  : 'bg-[#032b41] text-white hover:bg-[#1a4b5c]'
              }`}
            >
              {selectedPlan === 'premium' ? 'Selected' : 'Start Free Trial'}
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="row">
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#032b41] mb-3 sm:mb-4">
              Everything You Need to Learn Faster
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#394547] max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to absorb knowledge efficiently and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#f1f6f4] rounded-full flex items-center justify-center mx-auto mb-4">
                <BiBookOpen className="text-3xl text-[#032b41]" />
              </div>
              <h3 className="text-xl font-semibold text-[#032b41] mb-3">Unlimited Summaries</h3>
              <p className="text-[#394547]">Access loads of book summaries across all genres and topics</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#f1f6f4] rounded-full flex items-center justify-center mx-auto mb-4">
                <AiFillAudio className="text-3xl text-[#032b41]" />
              </div>
              <h3 className="text-xl font-semibold text-[#032b41] mb-3">Audio Summaries</h3>
              <p className="text-[#394547]">Listen to summaries on the go with high-quality audio narration</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#f1f6f4] rounded-full flex items-center justify-center mx-auto mb-4">
                <AiFillBulb className="text-3xl text-[#032b41]" />
              </div>
              <h3 className="text-xl font-semibold text-[#032b41] mb-3">Smart Recommendations</h3>
              <p className="text-[#394547]">Get personalized book recommendations based on your interests</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#f1f6f4] rounded-full flex items-center justify-center mx-auto mb-4">
                <BiDownload className="text-3xl text-[#032b41]" />
              </div>
              <h3 className="text-xl font-semibold text-[#032b41] mb-3">Sync Across Devices</h3>
              <p className="text-[#394547]">Your saved progress and favourites automatically stay updated everywhere</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#f1f6f4] rounded-full flex items-center justify-center mx-auto mb-4">
                <BiSupport className="text-3xl text-[#032b41]" />
              </div>
              <h3 className="text-xl font-semibold text-[#032b41] mb-3">Priority Support</h3>
              <p className="text-[#394547]">Get help when you need it with our dedicated support team</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#f1f6f4] rounded-full flex items-center justify-center mx-auto mb-4">
                <AiFillFileText className="text-3xl text-[#032b41]" />
              </div>
              <h3 className="text-xl font-semibold text-[#032b41] mb-3">Progress Tracking</h3>
              <p className="text-[#394547]">Track your learning progress and set reading goals</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-8 sm:py-12 md:py-16">
        <div className="row">
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#032b41] mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#394547]">
              Everything you need to know about our subscription plans
            </p>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3 sm:mb-4">
                <button
                  onClick={() => toggleAccordion(`faq-${index}`)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base sm:text-lg font-semibold text-[#032b41] pr-2">{item.question}</span>
                  {openAccordion === `faq-${index}` ? (
                    <FaChevronUp className="text-[#394547] flex-shrink-0" />
                  ) : (
                    <FaChevronDown className="text-[#394547] flex-shrink-0" />
                  )}
                </button>
                {openAccordion === `faq-${index}` && (
                  <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                    <p className="text-sm sm:text-base text-[#394547] leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#032b41] py-8 sm:py-12 md:py-16">
        <div className="row">
          <div className="text-center text-white px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already using Summarist to expand their knowledge and achieve their goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={handleSubscribe}
                className="bg-[#2bd97c] text-[#032b41] font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg hover:bg-[#20ba68] transition-colors"
              >
                Start Your Free Trial
              </button>
              <button 
                onClick={handleBackToLibrary}
                className="bg-transparent border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg hover:bg-white hover:text-[#032b41] transition-colors"
              >
                Back to Library
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 mt-4">
              No credit card required • Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChosenPlanClientWrapper