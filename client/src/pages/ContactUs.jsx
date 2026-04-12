import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen pt-12 md:pt-24 px-6 md:px-16 lg:px-24 w-full text-gray-300 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 border-b border-gray-700 pb-4">Contact Us</h1>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6 text-lg">
            <p>
              Have a question, feedback, or need assistance? We're here to help! Reach out to us through any of the following channels:
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-white">Phone:</span>
                <span>+91 7379185718</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-white">Email:</span>
                <span>jack912062sharma@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-white">Address:</span>
                <span>123 Movie Lane, Cinema City, CP 40001</span>
              </div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 rounded-xl mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Send us a message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input type="text" placeholder="Your Name" className="w-full bg-gray-900/80 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700" />
                </div>
                <div>
                  <input type="email" placeholder="Your Email" className="w-full bg-gray-900/80 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700" />
                </div>
                <div>
                  <textarea placeholder="Your Message" rows="4" className="w-full bg-gray-900/80 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
