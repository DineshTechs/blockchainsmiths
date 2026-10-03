import React from 'react';
import clsx from 'clsx';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  darker?: boolean; // Kept for backward compatibility but unused for bg color now
}

const Section: React.FC<SectionProps> = ({ id, className, children }) => {
  return (
    <section 
      id={id} 
      className={clsx(
        "py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative",
        // Removed bg-brand-dark/darker to allow global background to show through
        "border-t border-white/5", // Subtle separator
        className
      )}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};

export default Section;