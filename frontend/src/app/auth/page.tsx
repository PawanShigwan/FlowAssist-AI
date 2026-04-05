"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">
        
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white mb-4">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ContentFlow AI</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{isLogin ? 'Welcome back' : 'Create an account'}</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '/input'; }}>
          
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-white" placeholder="John Doe" />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-white" placeholder="you@example.com" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              {isLogin && <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</a>}
            </div>
            <input type="password" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-white" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
            <Link href="/input" className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors">
              Skip for now &rarr; test the application
            </Link>
        </div>

      </div>
    </div>
  );
}
