"use client";

export default function CraftSection() {
  return (
    <section className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Side - Bold Heading */}
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black">
              CRAFT THAT LISTENS
            </h2>
          </div>
          
          {/* Right Side - Description Text */}
          <div className="flex items-start">
            <p className="text-black text-lg md:text-xl leading-relaxed">
              Every piece we create begins with a question: How can design feel like a gesture?
              <br /><br />
              From sculptural furniture to quietly intelligent objects, our work lives at the intersection of form and feeling. We believe design isn't just what you see, it's what you sense. This is a glimpse into the world we're building, one thoughtful object at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

