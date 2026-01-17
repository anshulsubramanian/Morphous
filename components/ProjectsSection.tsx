"use client";

import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    heading: "The Garden Room",
    text: "The Garden Room is a celebration of natural elegance a collection where modern form meets the sculptural poetry of the desert. Blurring the line between indoors and out, it evokes the curves of wind-shaped dunes and the softness of time-worn stone. Crafted in seasoned teak, aluminum, PPE rope, and wicker, each piece balances durability with quiet luxury and tactile beauty.",
    image: "/assets/images/Work1.png",
    imageFirst: false,
    link: "/tgr-project",
  },
  {
    heading: "White Studios",
    text: "Light & Life is a collaborative exploration by Studio Morphous and White Studios — a collection rooted in the question: what if light could grow, and life could glow?\n\nTogether, we're crafting two sculptural floor lamps that embody a quiet harmony between nature and object, stillness and energy. Designed as living gestures rather than static forms, they respond to space with warmth, softness, and intention.\n\nThis project isn't just about illumination — it's about sensing growth, balance, and the quiet poetry of coexistence.",
    image: "/assets/images/Work2.png",
    imageFirst: true,
    link: "/white-studios-project",
  },
  {
    heading: "Kanha Decor",
    text: "This collection explores the silent choreography of the human condition. Stripped of identity and reduced to a single, continuous line, these figures embody the universal struggle between gravity and will.\n\nThey capture the essence of what it means to occupy space—the tension of bracing against a burden, the vulnerability of a recline, and the quiet resolve found in a forward stride. These are not mere objects, but frozen echoes of our own daily movements, reminding us that there is a profound grace in the simple act of holding on and letting go.",
    image: "/assets/images/Work5.png",
    imageFirst: false,
  },
  {
    heading: "Contours of Being",
    text: "Contours of Being captures the quiet complexity of the human experience. Its layered forms flow like an emotional landscape, shaped by time, change, and the invisible forces that move us. The interplay of textures, depths, and tones mirrors the way our inner worlds evolve: fluid yet grounded, imperfect yet intentional.",
    image: "/assets/images/Work4.png",
    imageFirst: true,
  },
];

export default function ProjectsSection() {
  return (
    <section className="bg-white text-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {projects.map((project, index) => (
          <div key={index}>
            <div
              className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                project.imageFirst ? "" : "md:grid-flow-dense"
              }`}
            >
            {/* Image */}
            <div
              className={`relative w-full aspect-square rounded-lg overflow-hidden ${
                project.imageFirst ? "md:order-1" : "md:order-2"
              }`}
            >
              <Image
                src={project.image}
                alt={project.heading}
                fill
                className="object-cover"
              />
            </div>

            {/* Text Content */}
            <div
              className={`flex flex-col ${
                project.imageFirst
                  ? "md:text-left md:items-start"
                  : "md:text-right md:items-end"
              } ${project.imageFirst ? "md:order-2" : "md:order-1"}`}
            >
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
                  project.imageFirst ? "text-left" : "text-right"
                }`}
              >
                {project.heading}
              </h2>
              <div
                className={`text-base md:text-lg leading-relaxed mb-8 ${
                  project.imageFirst ? "text-left" : "text-right"
                }`}
              >
                {project.text.split("\n\n").map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
              {project.link ? (
                <Link
                  href={project.link}
                  className={`px-8 py-3 bg-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-300 transition-colors mt-4 inline-block ${
                    project.imageFirst ? "self-start" : "self-end"
                  }`}
                >
                  View More
                </Link>
              ) : (
                <button
                  className={`px-8 py-3 bg-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-300 transition-colors mt-4 ${
                    project.imageFirst ? "self-start" : "self-end"
                  }`}
                >
                  View More
                </button>
              )}
            </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

