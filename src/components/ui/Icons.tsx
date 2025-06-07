import React from 'react';
// Import Heroicons - beautiful, solid icon pack
import {
  ShieldCheckIcon,
  StarIcon as HeroStarIcon,
  DocumentIcon as HeroDocumentIcon,
  CheckIcon as HeroCheckIcon,
  ShieldCheckIcon as HeroVerifiedIcon,
  DocumentTextIcon as HeroFileIcon,
  ClockIcon as HeroClockIcon,
  ChartBarIcon,
  HomeIcon as HeroHomeIcon,
  EnvelopeIcon,
  PhoneIcon as HeroPhoneIcon,
  Bars3Icon,
  ArrowRightIcon as HeroArrowRightIcon,
  DocumentTextIcon as HeroDocumentTextIcon,
  MagnifyingGlassIcon as HeroMagnifyingGlassIcon,
} from '@heroicons/react/24/solid';

interface IconProps {
  className?: string;
  size?: number;
}

// Wrapper components to maintain the same API while using Heroicons
export const ShieldIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <ShieldCheckIcon className={className} width={size} height={size} />
);

export const StarIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <HeroStarIcon className={className} width={size} height={size} />
);

export const DocumentIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <HeroDocumentIcon className={className} width={size} height={size} />
);

export const CheckIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <HeroCheckIcon className={className} width={size} height={size} />
);

export const VerifiedIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <HeroVerifiedIcon className={className} width={size} height={size} />
);

export const FileIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <HeroFileIcon className={className} width={size} height={size} />
);

export const ClockIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <HeroClockIcon className={className} width={size} height={size} />
);

export const ReportIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <ChartBarIcon className={className} width={size} height={size} />
);

export const HomeIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <HeroHomeIcon className={className} width={size} height={size} />
);

export const EmailIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <EnvelopeIcon className={className} width={size} height={size} />
);

export const PhoneIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <HeroPhoneIcon className={className} width={size} height={size} />
);

export const MenuIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <Bars3Icon className={className} width={size} height={size} />
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <HeroArrowRightIcon className={className} width={size} height={size} />
);

export const DocumentTextIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <HeroDocumentTextIcon className={className} width={size} height={size} />
);

export const MagnifyingGlassIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <HeroMagnifyingGlassIcon className={className} width={size} height={size} />
);

// Social media icons - keeping custom SVGs as Heroicons doesn't include these
export const TwitterIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 2.567-.285.119.112.223.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
  </svg>
);

export const PinterestIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg width={size} height={size} className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 2.567-.285.119.112.223.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
  </svg>
);