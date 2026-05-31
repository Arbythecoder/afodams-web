import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  prefilledMessage?: string;
  className?: string;
}

export function WhatsAppButton({
  phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '2348000000000',
  prefilledMessage = 'Hello, I am interested in a property consultation with Afodams Property Management.',
  className = '',
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(prefilledMessage)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-2xl cursor-pointer select-none ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
      <span className="relative flex items-center gap-2 px-4 py-3 sm:py-3.5">
        <MessageCircle className="w-5 h-5 fill-white stroke-none flex-shrink-0" />
        <span className="text-sm font-semibold tracking-wide hidden sm:inline whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </span>
    </motion.a>
  );
}
