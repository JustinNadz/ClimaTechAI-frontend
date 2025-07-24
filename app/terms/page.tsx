"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <Header />
      
      <div className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Welcome to ClimaTech AI. By using our service, you agree to the following terms and conditions. Please read them carefully.</p>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600">By accessing or using our platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. User Responsibilities</h2>
              <p className="text-gray-600">You agree to use the platform only for lawful purposes and in accordance with these terms. You are responsible for maintaining the confidentiality of your account information.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Intellectual Property</h2>
              <p className="text-gray-600">All content, trademarks, and data on this site are the property of ClimaTech AI or its licensors and are protected by copyright and other intellectual property laws.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Limitation of Liability</h2>
              <p className="text-gray-600">ClimaTech AI is not liable for any damages arising from the use or inability to use the platform.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Changes to Terms</h2>
              <p className="text-gray-600">We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of the new terms.</p>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">Last updated: June 2024</p>
            <p className="text-sm text-blue-600 mt-2">If you have any questions about these Terms of Service, please <Link href="/contact" className="text-blue-700 hover:underline font-medium">contact us</Link>.</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 