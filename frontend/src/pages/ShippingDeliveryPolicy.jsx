import React from 'react';

const ShippingDeliveryPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Shipping & Delivery Policy</h1>

      <p className="mb-4">
        At <strong>DSA2Z</strong>, we offer a fully digital platform for coding practice and AI-powered problem analysis. All services are delivered electronically—no physical shipping is involved.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Digital Delivery</h2>
      <p className="mb-4">
        Upon successful purchase of a token bundle, the tokens are immediately credited to your account and made available for use in AI analysis features.
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>Token delivery is typically instant but may take up to 5 minutes in rare cases.</li>
        <li>If you do not see your tokens reflected after 10 minutes, please contact support.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. No Physical Shipping</h2>
      <p className="mb-4">
        Since DSA2Z is a software-as-a-service (SaaS) product, there is no shipment of physical goods. All features are accessed online through your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Delivery Confirmation</h2>
      <p className="mb-4">
        A confirmation email is sent to your registered email address after every successful payment. This email includes:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Transaction details</li>
        <li>Number of tokens purchased</li>
        <li>Support contact info</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Issues with Delivery</h2>
      <p className="mb-4">
        If your tokens are not delivered as expected or your AI analysis feature is not functioning, please reach out within 24 hours at: <a href="mailto:yashovardhans321@gmail.com" className="text-blue-600 underline">support@dsa2z.com</a>.
      </p>

      <p className="mb-4">
        Our support team will verify your purchase and manually credit the tokens if needed.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Service Availability</h2>
      <p className="mb-4">
        Our platform is accessible 24/7. However, token-based AI features may be temporarily unavailable during server maintenance or high-load periods. Users will be notified in such cases.
      </p>

      <p className="text-sm text-gray-600 mt-8">
        Last updated: June 3, 2025
      </p>
    </div>
  );
};

export default ShippingDeliveryPolicy;
