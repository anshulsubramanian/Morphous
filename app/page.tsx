"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Image from "next/image";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    // Check if we need to scroll to a section after navigation
    const scrollTo = sessionStorage.getItem("scrollTo");
    if (scrollTo) {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => {
        const element = document.querySelector(scrollTo);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 64;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen w-full"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/banner.png"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <section id="services" className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8 flex items-center pt-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center">
            {/* Services Title */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-12">
              Services
            </h2>
            
            {/* Description Text */}
            <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-12 sm:mb-16 px-4">
              At Studio Morphous, we design with depth, shaping objects, furniture, and experiences that live with intention. Whether you're a brand, architect, or someone with an idea that needs form, we collaborate from first sketch to final build
            </p>
            
            {/* Service Pointers - 2 columns with white dots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-6 max-w-3xl mx-auto px-4">
              <div className="flex flex-col items-center">
                <div className="text-white text-base sm:text-lg md:text-xl text-center">Furniture & Décor</div>
                <div className="text-white text-base sm:text-lg md:text-xl text-center">Conceptualization</div>

                <div className="w-1.5 h-1.5 bg-white rounded-full my-2"></div>
                <div className="text-white text-base sm:text-lg md:text-xl text-center">Product Engineering</div>
                <div className="text-white text-base sm:text-lg md:text-xl text-center">& Prototyping</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-white text-base sm:text-lg md:text-xl text-center">Spatial Styling &</div>
                <div className="text-white text-base sm:text-lg md:text-xl text-center">Design Direction</div>

                <div className="w-1.5 h-1.5 bg-white rounded-full my-2"></div>
                <div className="text-white text-base sm:text-lg md:text-xl text-center">Development & Production</div>
                <div className="text-white text-base sm:text-lg md:text-xl text-center">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Let's Talk Section */}
      <section id="lets-talk" className="min-h-screen bg-white text-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left Side - Heading and Description */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-8">
                Schedule a meeting
              </h1>
              <div className="text-black text-lg md:text-xl leading-relaxed">
                <p>Curious about how we work?</p>
                <p className="mt-4">
                  Whether you're exploring a collaboration, looking for custom design support, or just curious about what we do, we'd love to meet you and share our process.
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              <form 
                className="space-y-6"
                action="https://formspree.io/f/xwvvyjpg"
                method="POST"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormStatus('submitting');
                  setFormMessage('');

                  const formData = new FormData(e.currentTarget);
                  
                  // Add hidden field for recipient email
                  formData.append('_to', 'studiomorphous@gmail.com');
                  formData.append('_subject', 'Meeting Request from Website');
                  formData.append('_replyto', formData.get('email') as string);

                  try {
                    const response = await fetch('https://formspree.io/f/xwvvyjpg', {
                      method: 'POST',
                      body: formData,
                      headers: {
                        'Accept': 'application/json'
                      }
                    });

                    if (response.ok) {
                      setFormStatus('success');
                      setFormMessage('Thank you! We\'ll get back to you soon.');
                      (e.target as HTMLFormElement).reset();
                      setTimeout(() => {
                        setFormStatus('idle');
                        setFormMessage('');
                      }, 5000);
                    } else {
                      const data = await response.json();
                      if (data.errors) {
                        throw new Error(data.errors[0].message || 'Form submission failed');
                      }
                      throw new Error('Form submission failed');
                    }
                  } catch (error) {
                    setFormStatus('error');
                    setFormMessage('Something went wrong. Please email us directly at studiomorphous@gmail.com');
                  }
                }}
              >
                <div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="w-full px-4 py-3 text-base bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                    placeholder="Enter your first and last name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="w-full px-4 py-3 text-base bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                    placeholder="Enter your company or organization name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 text-base bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                    placeholder="Enter your email address (e.g., name@company.com)"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="preferredTime"
                    name="preferredTime"
                    className="w-full px-4 py-3 text-base bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                    placeholder="Enter preferred day and time (e.g., Monday, 2:00 PM)"
                  />
                </div>
                <div>
                  <textarea
                    id="projectOverview"
                    name="projectOverview"
                    rows={5}
                    className="w-full px-4 py-3 text-base bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors resize-none"
                    placeholder="Describe your project, goals, and what you're looking for"
                  />
                </div>
                {formMessage && (
                  <div className={`p-4 rounded-lg ${
                    formStatus === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : formStatus === 'error'
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-gray-50 text-gray-800 border border-gray-200'
                  }`}>
                    <p className="text-sm">{formMessage}</p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full px-8 py-4 text-base sm:text-lg bg-black text-white font-semibold rounded-lg hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors touch-manipulation"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative min-h-[50vh] sm:h-[60vh] w-full flex items-center justify-center -mt-12 sm:-mt-20 md:-mt-24 py-12 sm:py-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/IMG_1203.JPG"
            alt="Quote Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <blockquote className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-relaxed mb-4 sm:mb-6 px-2">
            To create something exceptional, your mindset must be relentlessly focused on the smallest detail.
          </blockquote>
          <p className="text-white text-base sm:text-lg md:text-xl">
            Giorgio Armani
          </p>
        </div>
      </section>

      {/* Images Section */}
      <section className="bg-black w-full">
        <div className="flex flex-col sm:flex-row gap-0">
          <div className="relative w-full sm:w-1/3 aspect-square">
            <Image
              src="/assets/images/LetsTalkImg2.png"
              alt="Let's Talk Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full sm:w-1/3 aspect-square">
            <Image
              src="/assets/images/LetsTalkImg4.png"
              alt="Let's Talk Image 4"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full sm:w-1/3 aspect-square">
            <Image
              src="/assets/images/LetsTalkImg6.png"
              alt="Let's Talk Image 6"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Location and Contact Section */}
      <section className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Location */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Gurugram</h2>
              <p className="text-lg md:text-xl">India</p>
            </div>
            {/* Right Side - Contact */}
            <div className="md:text-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Contact</h2>
              <p className="text-lg md:text-xl">studiomorphous@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

