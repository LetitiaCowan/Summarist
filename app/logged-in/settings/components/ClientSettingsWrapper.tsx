"use client";
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAuthActions } from '@/hooks/useAuthActions';
import AuthModalWrapper from '@/app/components/AuthModalWrapper';
import loginImage from '../../../assets/login.png';
import Link from 'next/link';

const SettingsClientWrapper = () => {
  const { user, isLoggedIn } = useAuth();
  const { openLogin } = useAuthActions();

  // Check if user is anonymous (anonymous users have no email)
  const isGuest = user && !user.email;

  // Check if user has a subscription (premium or basic)
  const isSubscribed = user?.plan === 'premium' || user?.plan === 'basic';
  const currentPlan = user?.plan || 'basic';

  const email = user?.email ?? "";
  const capitalisedEmail = email.charAt(0).toUpperCase() + email.slice(1);


  // If not logged in OR logged in as guest, show login image with button
  if (!isLoggedIn || isGuest) {
    return (
      <AuthModalWrapper>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
          <img 
            src={loginImage.src} 
            alt="Login" 
            className="w-full max-w-xs sm:max-w-md mb-4 sm:mb-6"
          />
          <button 
            onClick={openLogin}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Login
          </button>
        </div>
      </AuthModalWrapper>
    );
  }

  // If logged in as actual profile (not guest), show subscription status
  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-4 sm:p-8 max-w-2xl w-full">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Subscription Status</h2>
        
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 mb-2 text-sm sm:text-base">Email:</p>
            <p className="text-base sm:text-lg font-medium break-all">{capitalisedEmail}</p>
          </div>
          
          <div>
            <p className="text-gray-600 mb-2 text-sm sm:text-base">Current Plan:</p>
            <p className="text-xl sm:text-2xl font-bold capitalize">{currentPlan}</p>
          </div>

          {!isSubscribed && (
            <div className="mt-6">
              <Link 
                href="/logged-in/chosen-plan"
                className="inline-block w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Upgrade Plan
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsClientWrapper;