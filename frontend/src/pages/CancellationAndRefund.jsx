import React from 'react';

const CancellationAndRefund = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Refund & Cancellation Policy</h1>

      <p className="mb-4">
        At <strong>DSA2Z</strong>, we strive to offer a high-quality platform that helps users improve their coding skills through practice problems and AI-driven analysis. We also understand that sometimes users may need to request a refund or cancel a purchase. Please read our policy below.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Free Usage</h2>
      <p className="mb-4">
        All users receive <strong>3 free AI analyses</strong> without requiring payment. This allows users to try the core features of DSA2Z before making a purchase.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Token Purchases</h2>
      <p className="mb-4">
        Our platform operates on a token-based model. Users can purchase token bundles for AI analysis:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>10 Tokens – ₹99</li>
        <li>50 Tokens – ₹200</li>
        <li>100 Tokens – ₹350</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Refund Eligibility</h2>
      <p className="mb-4">
        Refunds may be issued under the following circumstances:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Accidental duplicate payment for the same token bundle.</li>
        <li>Technical issues where purchased tokens are not delivered within 1 hour and support is unresponsive within 24 hours.</li>
        <li>Unauthorized transactions (must be reported within 48 hours).</li>
      </ul>

      <p className="mb-4">
        Refunds will <strong>not</strong> be provided for:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Used tokens.</li>
        <li>Change of mind after a successful purchase and delivery.</li>
        <li>Issues unrelated to platform functionality or service delivery.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Cancellation</h2>
      <p className="mb-4">
        Since token delivery and AI access are granted immediately after payment, cancellations are not possible once the purchase is complete.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Refund Request Process</h2>
      <p className="mb-4">
        To request a refund, please email us at <a href="mailto:yashovardhans321@gmail.com" className="text-blue-400 underline">support@dsa2z.com</a> with:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Your registered email address</li>
        <li>Payment transaction ID</li>
        <li>Reason for refund request</li>
      </ul>
      <p className="mb-4">
        Our team will review your request and respond within 3–5 business days.
      </p>

      <p className="text-sm text-gray-400 mt-8">
        Last updated: June 3, 2025
      </p>
    </div>
  );
};

export default CancellationAndRefund ;
