'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import { HomeIcon, StarIcon, DocumentIcon, EmailIcon, PhoneIcon, TwitterIcon, InstagramIcon, PinterestIcon } from '@/components/ui/Icons';

interface FooterProps {
  className?: string;
}

const FooterLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ href, icon, children, onClick }) => (
  <li>
    <a
      href={href}
      onClick={onClick}
      className="hover:text-yellow-400 transition-colors text-gray-300 flex items-center group cursor-pointer"
    >
      <span className="ml-3 group-hover:translate-x-1 transition-transform">
        {icon}
      </span>
      {children}
    </a>
  </li>
);

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  bgColor: string;
}> = ({ href, icon, bgColor }) => (
  <a
    href={href}
    className={cn(
      "rounded-xl p-3 transition-all duration-300 hover:scale-110 shadow-lg",
      bgColor
    )}
  >
    {icon}
  </a>
);

const Footer: React.FC<FooterProps> = ({ className }) => {
  const content = useContent();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={cn(
      "bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white py-20 px-6",
      className
    )}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        {/* Links Section */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-yellow-400">
            {content.footer.linksTitle}
          </h3>
          <ul className="space-y-4">
            <FooterLink
              href="#features"
              icon={<HomeIcon className="w-5 h-5" />}
              onClick={() => scrollToSection('#features')}
            >
              {content.footer.mainPage}
            </FooterLink>
            <FooterLink
              href="#how-it-works"
              icon={<StarIcon className="w-5 h-5" />}
              onClick={() => scrollToSection('#how-it-works')}
            >
              {content.footer.services}
            </FooterLink>
            <FooterLink
              href="#stats"
              icon={<DocumentIcon className="w-5 h-5" />}
              onClick={() => scrollToSection('#stats')}
            >
              {content.footer.managers}
            </FooterLink>
            <FooterLink
              href="#contact"
              icon={<EmailIcon className="w-5 h-5" />}
              onClick={() => scrollToSection('#contact')}
            >
              {content.footer.contact}
            </FooterLink>
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-yellow-400">
            {content.footer.aboutTitle}
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {content.footer.aboutText}
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-yellow-400">
            {content.footer.contactTitle}
          </h3>
          <div className="space-y-4">
            <p className="text-gray-300 flex items-center group">
              <EmailIcon className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform text-yellow-400" />
              {content.footer.email}
            </p>
            <p className="text-gray-300 flex items-center group">
              <PhoneIcon className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform text-yellow-400" />
              {content.footer.phone}
            </p>
          </div>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-yellow-400">
            {content.footer.socialTitle}
          </h3>
          <div className="flex gap-4">
            <SocialLink
              href="#"
              icon={<TwitterIcon className="w-6 h-6" />}
              bgColor="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500"
            />
            <SocialLink
              href="#"
              icon={<InstagramIcon className="w-6 h-6" />}
              bgColor="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400"
            />
            <SocialLink
              href="#"
              icon={<PinterestIcon className="w-6 h-6" />}
              bgColor="bg-gradient-to-br from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400"
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-700 text-center text-gray-400">
        <div className="flex items-center justify-center mb-2">
          <span className="text-sm">{content.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;