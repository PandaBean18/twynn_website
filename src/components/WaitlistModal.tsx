import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight } from 'lucide-react';
import { type WaitlistEntry } from '../types';
// 1. Import your Firestore database instance and SDK methods
import {db} from '../firebase' 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (entry: WaitlistEntry) => void;
  prefilledEmail?: string;
}

export default function WaitlistModal({ isOpen, onClose, onSuccess, prefilledEmail }: WaitlistModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'creator' | 'brand'>('creator');
  const [socialUrl, setSocialUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEmail(prefilledEmail || '');
      setName('');
      setSocialUrl('');
      setIsSubmitted(false);
      setError('');
      setIsLoading(false);
    }
  }, [isOpen, prefilledEmail]);

  // 3. Turn this into an async function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 4. Dynamically target the correct Firestore collection ('creators' or 'brands')
      // Map singular state 'creator' to plural collection 'creators'
      const collectionName = role === 'creator' ? 'creators' : 'brands';
      const collectionRef = collection(db, collectionName);

      // 5. Send data to Firebase with server-synchronized timestamps
      await addDoc(collectionRef, {
        name: name.trim(),
        email: email.trim(),
        socialUrl: socialUrl.trim() || null,
        createdAt: serverTimestamp()
      });

      // Local callback item matching your interface requirements
      const newEntry: WaitlistEntry = {
        name: name.trim(),
        email: email.trim(),
        role,
        socialUrl: socialUrl.trim() || undefined,
        timestamp: new Date().toISOString()
      };

      setIsSubmitted(true);
      onSuccess(newEntry);

      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setEmail('');
        setSocialUrl('');
        onClose();
      }, 2800);

    } catch (err) {
      console.error("Firebase submission failed: ", err);
      setError('Something went wrong on our end. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="waitlist-modal-root" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="waitlist-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            id="waitlist-modal-box"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-900 bg-neutral-900/90 p-8 shadow-2xl backdrop-blur-xl"
          >
            {/* Close button */}
            <button
              id="waitlist-modal-close"
              onClick={onClose}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors duration-200"
              aria-label="Close waitlist modal"
            >
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <div id="waitlist-form-container">
                <div id="waitlist-modal-title" className="mb-6">
                  {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-3">
                    <Sparkles size={13} className="text-zinc-400" />
                    <span className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase">Private Access</span>
                  </div> */}
                  <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-white">
                    Join the waitlist
                  </h2>
                  <p className="mt-2 text-sm text-zinc-400">
                    Be among the first to experience the premium workflow hub for collaborations.
                  </p>
                </div>

                <form id="waitlist-modal-form" onSubmit={handleSubmit} className="space-y-5">
                  {/* Role selection tab */}
                  <div id="waitlist-role-select" className="space-y-2">
                    <label className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                      Account Type
                    </label>
                    <div className="grid grid-cols-2 gap-2 rounded-lg bg-neutral-950 p-1">
                      <button
                        type="button"
                        disabled={isLoading}
                        id="role-select-creator"
                        onClick={() => setRole('creator')}
                        className={`py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                          role === 'creator'
                            ? 'bg-zinc-800 text-white'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        I'm a Creator
                      </button>
                      <button
                        type="button"
                        disabled={isLoading}
                        id="role-select-brand"
                        onClick={() => setRole('brand')}
                        className={`py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                          role === 'brand'
                            ? 'bg-zinc-800 text-white'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        I'm a Brand
                      </button>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div id="waitlist-name-input-group" className="space-y-2">
                    <label htmlFor="waitlist-name" className="block font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                      Your Name / Company
                    </label>
                    <input
                      type="text"
                      id="waitlist-name"
                      disabled={isLoading}
                      placeholder={role === 'creator' ? 'e.g., Alex Rivers' : 'e.g., Acme Agency'}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                      }}
                      className="w-full rounded-lg border border-zinc-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-colors duration-200 disabled:opacity-50"
                    />
                  </div>

                  {/* Email Input */}
                  <div id="waitlist-email-input-group" className="space-y-2">
                    <label htmlFor="waitlist-email" className="block font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="waitlist-email"
                      disabled={isLoading}
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className="w-full rounded-lg border border-zinc-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-colors duration-200 disabled:opacity-50"
                    />
                  </div>

                  {/* Optional social / web */}
                  <div id="waitlist-social-input-group" className="space-y-2">
                    <label htmlFor="waitlist-social" className="block font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                      {role === 'creator' ? 'Social Handles / Link' : 'Website Link / Handle'} <span className="text-zinc-600 font-sans tracking-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="waitlist-social"
                      disabled={isLoading}
                      placeholder={role === 'creator' ? 'instagram.com/alex_rivers' : 'acme.co'}
                      value={socialUrl}
                      onChange={(e) => setSocialUrl(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-colors duration-200 disabled:opacity-50"
                    />
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 font-medium"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Submission Button */}
                  <button
                    type="submit"
                    id="waitlist-modal-submit-btn"
                    disabled={isLoading}
                    className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3.5 text-sm font-medium text-black hover:bg-zinc-200 transition-all duration-200 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isLoading ? 'Registering...' : 'Request Invitation'}</span>
                    {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />}
                  </button>
                </form>
              </div>
            ) : (
              /* Success screen */
              <motion.div
                id="waitlist-success-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 mb-6">
                  <Check size={28} />
                </div>
                <h3 className="font-display text-2xl font-medium text-white mb-2">You're on the list</h3>
                <p className="text-zinc-400 text-sm max-w-xs">
                  We have registered your invitation request. We will reach out to you at <span className="text-white font-medium">{email}</span> soon.
                </p>
                <div className="mt-8 text-xs font-mono text-zinc-600">
                  Welcome to Twynn.
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}