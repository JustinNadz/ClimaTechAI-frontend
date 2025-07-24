"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <Header />
      
      <div className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Your privacy is important to us. This policy explains how ClimaTech AI collects, uses, and protects your information.</p>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h2>
              <p className="text-gray-600">We may collect personal information such as your name, email address, and usage data when you use our platform.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. How We Use Information</h2>
              <p className="text-gray-600">We use your information to provide and improve our services, communicate with you, and ensure the security of our platform.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Data Security</h2>
              <p className="text-gray-600">We implement reasonable security measures to protect your data from unauthorized access.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Sharing of Information</h2>
              <p className="text-gray-600">We do not sell or rent your personal information to third parties. We may share information as required by law or to protect our rights.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Changes to This Policy</h2>
              <p className="text-gray-600">We may update this Privacy Policy from time to time. Continued use of the platform constitutes acceptance of the new policy.</p>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">Last updated: June 2024</p>
            <p className="text-sm text-blue-600 mt-2">If you have any questions about this Privacy Policy, please <Link href="/contact" className="text-blue-700 hover:underline font-medium">contact us</Link>.</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 