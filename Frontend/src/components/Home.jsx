import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-teal-400/10 to-transparent dark:from-blue-500/20 dark:via-teal-400/10"></div>

        <div className="relative max-w-screen-xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
              Smart Hospital <br />
              <span className="text-blue-600 dark:text-blue-400">
                Management System
              </span>
            </h1>

            <p className="text-gray-600 dark:text-gray-400 max-w-xl mb-8 text-lg">
              Manage patients, doctors, appointments, and medical records —
              all in one secure, lightning-fast platform.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/book"
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
              >
                Book Appointment
              </a>

              <a
                href="/login"
                className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Doctor Login
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5 hidden lg:flex justify-center">
            <img
              src="https://img.freepik.com/free-photo/stomatolog-nurse-tooth-clinic-checking-patient-appointment-looking-computer-monitor-stomatology-assistant-teeth-doctor-discussing-reception-dental-office_482257-11962.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Hospital App UI"
              className="w-full max-w-md drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-screen-xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Hospitals Choose Us
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {[
            {
              title: "Appointment Scheduling",
              desc: "Real-time booking, rescheduling, and doctor availability management.",
            },
            {
              title: "Patient Records",
              desc: "Secure digital records with instant access for doctors and staff.",
            },
            {
              title: "Doctor Management",
              desc: "Assign departments, manage timings, and monitor workload.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-800 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-blue-600 dark:bg-blue-700 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Modernize Your Hospital?
        </h2>
        <p className="mb-8 text-blue-100">
          Simple. Secure. Scalable healthcare management.
        </p>
        <a
          href="/signup"
          className="inline-block px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </section>

    </div>
  );
};

export default Home;
