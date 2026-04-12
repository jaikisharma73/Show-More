import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-12 md:pt-24 px-6 md:px-16 lg:px-24 w-full text-gray-300 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 border-b border-gray-700 pb-4">Privacy Policy</h1>
        <div className="space-y-6 text-lg">
          <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            At JackMov, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a booking on our platform.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>
            When you visit JackMov, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the platform, we collect information about the individual web pages or movies that you view.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the order information that we collect generally to fulfill any bookings placed through the platform (including processing your payment information, confirming your seats, and providing you with invoices and/or booking confirmations).
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Sharing Your Personal Information</h2>
          <p>
            We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Stripe to power our secure payments—you can read more about how Stripe uses your Personal Information here: https://stripe.com/privacy.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Your Rights</h2>
          <p>
            If you are a resident of certain regions, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information provided in the Contact Us section.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
