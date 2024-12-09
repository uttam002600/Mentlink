import React from "react";
import {
  FaUsers,
  FaLightbulb,
  FaPeopleArrows,
  FaHandshake,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Heading and Introduction */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[var(--text-black-900)]">
          About MentLink
        </h1>
        <h2 className="text-3xl text-[var(--text-black-700)] mt-2 italic">
          Empowering Connections, Transforming Lives.
        </h2>
        <p className="text-lg text-[var(--text-black-700)] mt-4 max-w-2xl mx-auto">
          MentLink is dedicated to fostering meaningful connections between
          mentors and mentees. Our mission is to empower individuals through
          guidance and support, creating a transformative impact in their
          personal and professional lives.
        </p>
      </section>

      {/* Core Values */}
      <section className="mb-12">
        <h2 className="text-4xl font-semibold text-[var(--text-black-900)] text-center mb-6">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[var(--bg-black-100)] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 text-center">
            <FaUsers className="text-5xl text-[var(--skin-color)] mb-4" />
            <h3 className="text-xl font-semibold text-[var(--text-black-900)]">
              Empowerment
            </h3>
            <p className="text-[var(--text-black-700)]">
              Connecting mentors and mentees.
            </p>
          </div>
          <div className="bg-[var(--bg-black-100)] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 text-center">
            <FaLightbulb className="text-5xl text-[var(--skin-color)] mb-4" />
            <h3 className="text-xl font-semibold text-[var(--text-black-900)]">
              Innovation
            </h3>
            <p className="text-[var(--text-black-700)]">
              Leveraging technology for impactful mentoring.
            </p>
          </div>
          <div className="bg-[var(--bg-black-100)] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 text-center">
            <FaPeopleArrows className="text-5xl text-[var(--skin-color)] mb-4" />
            <h3 className="text-xl font-semibold text-[var(--text-black-900)]">
              Diversity
            </h3>
            <p className="text-[var(--text-black-700)]">
              Inclusive platform for all domains and backgrounds.
            </p>
          </div>
          <div className="bg-[var(--bg-black-100)] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 text-center">
            <FaHandshake className="text-5xl text-[var(--skin-color)] mb-4" />
            <h3 className="text-xl font-semibold text-[var(--text-black-900)]">
              Commitment
            </h3>
            <p className="text-[var(--text-black-700)]">
              Dedicated to personal and professional growth.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline/Story */}
      <section className="mb-12">
        <h2 className="text-4xl font-semibold text-[var(--text-black-900)] text-center mb-6">
          Our Journey
        </h2>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="text-4xl">🚀</div>
            <div className="ml-4">
              <h3 className="font-semibold text-[var(--text-black-900)]">
                Inception
              </h3>
              <p className="text-[var(--text-black-700)]">
                MentLink was founded in 2020 with a vision to connect mentors
                and mentees.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-4xl">📈</div>
            <div className="ml-4">
              <h3 className="font-semibold text-[var(--text-black-900)]">
                Milestone 1
              </h3>
              <p className="text-[var(--text-black-700)]">
                Reached 1,000 active users in 2021.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-4xl">🏆</div>
            <div className="ml-4">
              <h3 className="font-semibold text-[var(--text-black-900)]">
                Milestone 2
              </h3>
              <p className="text-[var(--text-black-700)]">
                Awarded Best Mentoring Platform in 2022.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="mb-12">
        <h2 className="text-4xl font-semibold text-[var(--text-black-900)] text-center mb-6">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[var(--bg-black-50)] p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 duration-300">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-[var(--text-black-900)]">
              John Doe
            </h3>
            <p className="text-[var(--text-black-700)]">Founder & CEO</p>
            <p className="text-[var(--text-black-700)]">
              Passionate about mentoring and personal development.
            </p>
          </div>
          <div className="bg-[var(--bg-black-50)] p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 duration-300">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-[var(--text-black-900)]">
              Jane Smith
            </h3>
            <p className="text-[var(--text-black-700)]">Co-Founder & CTO</p>
            <p className="text-[var(--text-black-700)]">
              Innovating technology for better mentoring experiences.
            </p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
