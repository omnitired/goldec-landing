'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import { useTheme } from '@/contexts/ThemeContext';
import { Partner } from '@/types/content';
import { getPartnersData } from '@/lib/api-service';
import { ExternalLink, ChevronDown, ChevronUp, Search, ArrowUpDown, Calendar, Loader2 } from 'lucide-react';
import { getRelativeJalaliDate, formatJalaliDate, sortByJalaliDate } from '@/lib/jalali-utils';

interface PartnersSectionProps {
  className?: string;
}

interface PartnerCardProps {
  partner: Partner;
}

type SortOption = 'name-asc' | 'name-desc' | 'date-newest' | 'date-oldest' | 'url-asc' | 'url-desc';

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="group relative bg-card dark:bg-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-border dark:border-border hover:border-blue-300 dark:hover:border-blue-400 hover:-translate-y-1">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center mb-4 h-16">
          {!imageError ? (
            <img
              src={partner.logo}
              alt={partner.name}
              width={48}
              height={48}
              className="w-12 h-12 object-contain rounded-lg"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl flex items-center justify-center">
              <div className="text-blue-600 dark:text-blue-400 font-bold text-xs text-center leading-tight">
                {partner.name.split(' ').map(word => word[0]).join('').substring(0, 3)}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center">
          <h3 className="font-bold text-card-foreground dark:text-card-foreground mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {partner.name}
          </h3>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-2 break-all">
            {partner.url.replace(/^https?:\/\//, '')}
          </p>
          <div className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground dark:text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                عضویت از {partner.addedDate && partner.addedDate !== 'تاریخ نامعتبر' 
                  ? getRelativeJalaliDate(partner.addedDate) 
                  : 'نامشخص'}
              </span>
            </div>
            <div className="text-xs text-muted-foreground/70 dark:text-muted-foreground/70" title={formatJalaliDate(partner.addedDate)}>
              {partner.addedDate && partner.addedDate !== 'تاریخ نامعتبر' 
                ? formatJalaliDate(partner.addedDate) 
                : 'تاریخ عضویت نامشخص'}
            </div>
          </div>
        </div>
        
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          مشاهده سایت
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

const PartnersSection: React.FC<PartnersSectionProps> = ({ className }) => {
  const content = useContent();
  const { theme } = useTheme();
  const [partnersData, setPartnersData] = useState<{ partners: Partner[]; settings: { initialDisplayCount: number; expandStep: number } }>({ partners: [], settings: { initialDisplayCount: 12, expandStep: 12 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('date-newest');

  // Load partners data from API
  useEffect(() => {
    const loadPartnersData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPartnersData();
        setPartnersData(data);
        setDisplayCount(data.settings.initialDisplayCount);
      } catch (err) {
        console.error('Failed to load partners data:', err);
        setError('خطا در بارگذاری اطلاعات سکو‌ها. لطفاً صفحه را مجدداً بارگذاری کنید.');
        // Fallback to empty data to prevent infinite loading
        setPartnersData({ 
          partners: [], 
          settings: { initialDisplayCount: 12, expandStep: 12 } 
        });
      } finally {
        setLoading(false);
      }
    };

    loadPartnersData();
  }, []);

  // Add retry function
  const retryLoading = async () => {
    const loadPartnersData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPartnersData();
        setPartnersData(data);
        setDisplayCount(data.settings.initialDisplayCount);
      } catch (err) {
        console.error('Failed to load partners data:', err);
        setError('خطا در بارگذاری اطلاعات سکو‌ها. لطفاً صفحه را مجدداً بارگذاری کنید.');
        setPartnersData({ 
          partners: [], 
          settings: { initialDisplayCount: 12, expandStep: 12 } 
        });
      } finally {
        setLoading(false);
      }
    };

    await loadPartnersData();
  };

  const filteredAndSortedPartners = useMemo(() => {
    const filtered = partnersData.partners.filter((partner: Partner) =>
      partner.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.url?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the filtered results
    const sorted = [...filtered].sort((a: Partner, b: Partner) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name, 'fa');
        case 'name-desc':
          return b.name.localeCompare(a.name, 'fa');
        case 'date-newest':
          return sortByJalaliDate(a.addedDate, b.addedDate, false);
        case 'date-oldest':
          return sortByJalaliDate(a.addedDate, b.addedDate, true);
        case 'url-asc':
          return a.url.localeCompare(b.url);
        case 'url-desc':
          return b.url.localeCompare(a.url);
        default:
          return 0;
      }
    });

    return sorted;
  }, [partnersData.partners, searchTerm, sortBy]);

  const displayedPartners = useMemo((): Partner[] => {
    return isExpanded ? filteredAndSortedPartners : filteredAndSortedPartners.slice(0, displayCount);
  }, [filteredAndSortedPartners, displayCount, isExpanded]);

  const handleLoadMore = () => {
    const newCount = displayCount + partnersData.settings.expandStep;
    if (newCount >= filteredAndSortedPartners.length) {
      setIsExpanded(true);
    } else {
      setDisplayCount(newCount);
    }
  };

  const handleShowLess = () => {
    setDisplayCount(partnersData.settings.initialDisplayCount);
    setIsExpanded(false);
  };

  const totalPartners = filteredAndSortedPartners.length;
  const hasMore = displayCount < totalPartners && !isExpanded;

  const getSortLabel = (sort: SortOption): string => {
    switch (sort) {
      case 'name-asc': return 'نام (الف تا ی)';
      case 'name-desc': return 'نام (ی تا الف)';
      case 'date-newest': return 'جدیدترین';
      case 'date-oldest': return 'قدیمی‌ترین';
      case 'url-asc': return 'آدرس (A تا Z)';
      case 'url-desc': return 'آدرس (Z تا A)';
      default: return 'مرتب‌سازی';
    }
  };

  // Loading state
  if (loading) {
    return (
      <section id="partners" data-theme={theme} className={cn(
        "py-24 px-6 bg-background",
        className
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground dark:text-foreground mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {content.partners.title1}
              </span>{' '}
              {content.partners.title2}
            </h2>
            <p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto mb-8">
              {content.partners.subtitle}
            </p>
          </div>
          
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <p className="text-muted-foreground dark:text-muted-foreground">در حال بارگذاری سکو‌ها...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="partners" data-theme={theme} className={cn(
        "py-24 px-6 bg-background",
        className
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground dark:text-foreground mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {content.partners.title1}
              </span>{' '}
              {content.partners.title2}
            </h2>
            <p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto mb-8">
              {content.partners.subtitle}
            </p>
          </div>
          
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">خطا در بارگذاری</h3>
              <p className="text-muted-foreground dark:text-muted-foreground mb-4">{error}</p>
              <button
                onClick={retryLoading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                تلاش مجدد
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state - when no partners data is available
  if (!loading && !error && partnersData.partners.length === 0) {
    return (
      <section id="partners" data-theme={theme} className={cn(
        "py-24 px-6 bg-background",
        className
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground dark:text-foreground mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {content.partners.title1}
              </span>{' '}
              {content.partners.title2}
            </h2>
            <p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto mb-8">
              {content.partners.subtitle}
            </p>
          </div>
          
          <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ExternalLink className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-4">هنوز سکویی به سامانه متصل نشده است.</h3>
              <p className="text-muted-foreground dark:text-muted-foreground leading-relaxed">
                مشخصات سکو پس از اتصال در این بخش نمایش داده خواهد شد.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
      <section id="partners" data-theme={theme} className={cn(
        "py-24 px-6 bg-background",
        className
      )}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground dark:text-foreground mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              {content.partners.title1}
            </span>{' '}
            {content.partners.title2}
          </h2>
          <p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto mb-8">
            {content.partners.subtitle}
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalPartners}</div>
              <div className="text-sm text-muted-foreground dark:text-muted-foreground">سکو فعال</div>
            </div>
            <div className="w-px h-12 bg-border dark:bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{displayedPartners.length}</div>
              <div className="text-sm text-muted-foreground dark:text-muted-foreground">در حال نمایش</div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="جستجو در سکو‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3 bg-input dark:bg-input border border-border dark:border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right transition-all duration-200 text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground"
              />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-input dark:bg-input border border-border dark:border-border rounded-2xl px-4 py-3 pr-10 pl-4 text-foreground dark:text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
              >
                <option value="date-newest">جدیدترین</option>
                <option value="date-oldest">قدیمی‌ترین</option>
                <option value="name-asc">نام (الف تا ی)</option>
                <option value="name-desc">نام (ی تا الف)</option>
                <option value="url-asc">آدرس (A تا Z)</option>
                <option value="url-desc">آدرس (Z تا A)</option>
              </select>
              <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-muted-foreground w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {(searchTerm || sortBy !== 'date-newest') && (
            <div className="text-center mt-4 flex flex-wrap items-center justify-center gap-4">
              <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                {totalPartners} نتیجه
                {searchTerm && (
                  <span> برای &ldquo;{searchTerm}&rdquo;</span>
                )}
                {sortBy !== 'date-newest' && (
                  <span> - مرتب‌شده بر اساس {getSortLabel(sortBy)}</span>
                )}
              </span>
              
              <div className="flex gap-2">
                {(searchTerm || sortBy !== 'date-newest') && (
                  <button
                    className="text-sm text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground bg-muted dark:bg-muted hover:bg-muted/80 dark:hover:bg-muted/80 px-3 py-1 rounded-lg transition-colors"
                    onClick={() => {
                      setSearchTerm('');
                      setSortBy('date-newest');
                    }}
                  >
                    پاک کردن فیلترها
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
          {displayedPartners.map((partner, index) => (
            <PartnerCard key={partner.id || `partner-${index}`} partner={partner} />
          ))}
        </div>

        {/* Load More / Show Less Controls */}
        {totalPartners > partnersData.settings.initialDisplayCount && (
          <div className="text-center">
            {hasMore ? (
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                نمایش بیشتر
                <span className="bg-white/20 dark:bg-white/10 px-2 py-1 rounded-lg text-sm">
                  +{Math.min(partnersData.settings.expandStep, totalPartners - displayCount)}
                </span>
                <ChevronDown className="w-5 h-5" />
              </button>
            ) : isExpanded ? (
              <button
                onClick={handleShowLess}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                نمایش کمتر
                <ChevronUp className="w-5 h-5" />
              </button>
            ) : null}
          </div>
        )}

        {/* Bottom Text */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground dark:text-muted-foreground text-lg max-w-3xl mx-auto">
            {content.partners.bottomText}
          </p>
          
          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground dark:text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              تایید شده توسط اتحادیه
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              امکان استعلام لحظه‌ای
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              پایش مستمر
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;