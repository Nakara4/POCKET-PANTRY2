import React from 'react';

function About() {
  return (
    <div className="bg-white text-gray-800 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-6 border-b pb-2">About Pocket Pantry</h1>

        {/* Intro Section */}
        <section className="mb-12">
          <p className="text-lg leading-relaxed">
            At Pocket Pantry, we believe that cooking at home should be easy, affordable, and fun. Our mission is to help you make the most out of what you already have in your kitchen by offering smart recipe suggestions tailored to your ingredients.
          </p>
        </section>

        {/* Our Vision */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Our Vision</h2>
          <p className="text-md leading-relaxed">
            We aim to reduce food waste, encourage sustainable cooking, and inspire creativity in your daily meals. Whether you're a student on a budget, a busy parent, or a curious cook, Pocket Pantry is here to help.
          </p>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">What You Can Do with Pocket Pantry</h2>
          <ul className="list-disc list-inside text-md leading-relaxed space-y-2">
            <li>Search recipes using ingredients you already have</li>
            <li>Filter by dietary preferences (e.g., vegetarian, vegan, gluten-free)</li>
            <li>Save your favorite recipes with your account</li>
            <li>Get inspiration to cook smarter and waste less</li>
          </ul>
        </section>

        {/* Contact Info */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Contact Us</h2>
          <p className="text-md leading-relaxed">
            Have feedback or suggestions? We'd love to hear from you!
          </p>
          <p className="mt-2">📧 Email: <a href="mailto:support@pocketpantry.com" className="text-green-700 underline">support@pocketpantry.com</a></p>
          <p>📱 Phone: +254 712 345 678</p>
        </section>

        {/* Final CTA */}
        <section className="text-center mt-16">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Let’s Cook Something Amazing</h2>
          <p className="text-md mb-6">Start your journey with Pocket Pantry and turn leftovers into legendary meals.</p>
          <button
            onClick={() => window.location.href = '/Home'}
            className="bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
          >
            Explore Recipes
          </button>
        </section>
      </div>
    </div>
  );
}

export default About;
