'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar, Globe, Building2, Search, Download, Upload, RefreshCw, Eye, Camera, ImageIcon } from 'lucide-react';
import { formatJalaliDate, getRelativeJalaliDate, getCurrentJalaliDate, isValidJalaliDate } from '@/lib/jalali-utils';
import Image from 'next/image';

interface Partner {
  id: number;
  name: string;
  url: string;
  logo: string;
  addedDate: string;
}

interface EditingPartner extends Partial<Partner> {
  id?: number;
}

const AdminPage = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPartner, setEditingPartner] = useState<EditingPartner | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'url'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedPartners, setSelectedPartners] = useState<Set<number>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState<Partner | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/partners');
      if (response.ok) {
        const data = await response.json();
        setPartners(data.partners || []);
      }
    } catch (error) {
      console.error('Failed to load partners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePartners = async (updatedPartners: Partner[]) => {
    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partners: updatedPartners })
      });
      if (response.ok) {
        setPartners(updatedPartners);
        return true;
      }
    } catch (error) {
      console.error('Failed to save partners:', error);
    }
    return false;
  };

  const getTodayJalaliDate = (): string => {
    return getCurrentJalaliDate();
  };

  const handleAddPartner = () => {
    setEditingPartner({
      name: '',
      url: '',
      logo: '',
      addedDate: getTodayJalaliDate()
    });
    setIsEditing(true);
  };

  const handleEditPartner = (partner: Partner) => {
    setEditingPartner({ ...partner });
    setIsEditing(true);
  };

  // Add the missing handleImageUpload function
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('فرمت فایل پشتیبانی نمی‌شود. لطفاً از فرمت‌های JPG، PNG، GIF، SVG یا WebP استفاده کنید.');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('حجم فایل نباید بیشتر از 5 مگابایت باشد.');
      return;
    }

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('partnerId', editingPartner?.id?.toString() || 'new');
      formData.append('partnerName', editingPartner?.name || 'unnamed');

      const response = await fetch('/api/upload-logo', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedImage(data.logoPath);
        setEditingPartner(prev => prev ? { ...prev, logo: data.logoPath } : null);
      } else {
        const errorData = await response.json();
        alert(`خطا در آپلود تصویر: ${errorData.error || 'خطای نامشخصص'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('خطا در آپلود تصویر. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  // Add the missing removeUploadedImage function
  const removeUploadedImage = () => {
    setUploadedImage(null);
    setEditingPartner(prev => prev ? { ...prev, logo: '' } : null);
  };

  const handleSavePartner = async () => {
    if (!editingPartner?.name || !editingPartner?.url) {
      alert('نام و آدرس پلتفرم الزامی است');
      return;
    }

    if (editingPartner.addedDate && !isValidJalaliDate(editingPartner.addedDate)) {
      alert('تاریخ عضویت نامعتبر است. لطفاً از فرمت YYYY/MM/DD استفاده کنید');
      return;
    }

    const updatedPartners = [...partners];
    
    if (editingPartner.id) {
      // Edit existing
      const index = updatedPartners.findIndex(p => p.id === editingPartner.id);
      if (index !== -1) {
        updatedPartners[index] = editingPartner as Partner;
      }
    } else {
      // Add new
      const newId = Math.max(...partners.map(p => p.id), 0) + 1;
      let logoPath = editingPartner.logo;
      
      // Auto-generate logo if not provided
      if (!logoPath) {
        try {
          const logoResponse = await fetch('/api/generate-logo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: editingPartner.name, id: newId })
          });
          
          if (logoResponse.ok) {
            const logoData = await logoResponse.json();
            logoPath = logoData.logoPath;
          } else {
            logoPath = `/logos/${editingPartner.name.replace(/\s+/g, '-').toLowerCase()}.svg`;
          }
        } catch (error) {
          console.error('Failed to generate logo:', error);
          logoPath = `/logos/${editingPartner.name.replace(/\s+/g, '-').toLowerCase()}.svg`;
        }
      }
      
      const newPartner: Partner = {
        id: newId,
        name: editingPartner.name,
        url: editingPartner.url,
        logo: logoPath || `/logos/${editingPartner.name.replace(/\s+/g, '-').toLowerCase()}.svg`,
        addedDate: editingPartner.addedDate || getTodayJalaliDate()
      };
      updatedPartners.push(newPartner);
    }

    const success = await savePartners(updatedPartners);
    if (success) {
      setIsEditing(false);
      setEditingPartner(null);
    }
  };

  const handleDeletePartner = async (partnerId: number) => {
    const updatedPartners = partners.filter(p => p.id !== partnerId);
    const success = await savePartners(updatedPartners);
    if (success) {
      setShowDeleteConfirm(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedPartners.size === 0) return;
    
    const confirmed = confirm(`آیا از حذف ${selectedPartners.size} پلتفرم انتخاب شده اطمینان دارید؟`);
    if (!confirmed) return;

    const updatedPartners = partners.filter(p => !selectedPartners.has(p.id));
    const success = await savePartners(updatedPartners);
    if (success) {
      setSelectedPartners(new Set());
    }
  };

  const handleSelectAll = () => {
    if (selectedPartners.size === filteredPartners.length) {
      setSelectedPartners(new Set());
    } else {
      setSelectedPartners(new Set(filteredPartners.map(p => p.id)));
    }
  };

  const filteredPartners = partners
    .filter(partner =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.url.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let result = 0;
      switch (sortBy) {
        case 'name':
          result = a.name.localeCompare(b.name, 'fa');
          break;
        case 'url':
          result = a.url.localeCompare(b.url);
          break;
        case 'date':
          const [yearA, monthA, dayA] = a.addedDate.split('/').map(Number);
          const [yearB, monthB, dayB] = b.addedDate.split('/').map(Number);
          const dateA = yearA * 10000 + monthA * 100 + dayA;
          const dateB = yearB * 10000 + monthB * 100 + dayB;
          result = dateA - dateB;
          break;
      }
      return sortOrder === 'asc' ? result : -result;
    });

  const exportData = () => {
    const dataStr = JSON.stringify({ partners }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `partners-backup-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.partners && Array.isArray(data.partners)) {
          const success = await savePartners(data.partners);
          if (success) {
            alert('داده‌ها با موفقیت وارد شد');
          }
        } else {
          alert('فرمت فایل نامعتبر است');
        }
      } catch {
        alert('خطا در خواندن فایل');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">پنل مدیریت پلتفرم‌ها</h1>
              <p className="text-gray-600">مدیریت و ویرایش اطلاعات پلتفرم‌های عضو</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                وارد کردن
                <input type="file" accept=".json" onChange={importData} className="hidden" />
              </label>
              
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                خروجی JSON
              </button>
              
              <button
                onClick={loadPartners}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                بروزرسانی
              </button>
              
              <button
                onClick={handleAddPartner}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                افزودن پلتفرم
              </button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="جستجو در پلتفرم‌ها..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'url')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="date">تاریخ</option>
                  <option value="name">نام</option>
                  <option value="url">آدرس</option>
                </select>
                
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="desc">نزولی</option>
                  <option value="asc">صعودی</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {filteredPartners.length} از {partners.length} پلتفرم
              </span>
              
              {selectedPartners.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف انتخاب شده ({selectedPartners.size})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Partners Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-right">
                    <input
                      type="checkbox"
                      checked={selectedPartners.size === filteredPartners.length && filteredPartners.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                  </th>
                  <th className="p-4 text-right text-sm font-medium text-gray-900">نام پلتفرم</th>
                  <th className="p-4 text-right text-sm font-medium text-gray-900">آدرس وب‌سایت</th>
                  <th className="p-4 text-right text-sm font-medium text-gray-900">تاریخ عضویت</th>
                  <th className="p-4 text-right text-sm font-medium text-gray-900">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedPartners.has(partner.id)}
                        onChange={(e) => {
                          const newSelected = new Set(selectedPartners);
                          if (e.target.checked) {
                            newSelected.add(partner.id);
                          } else {
                            newSelected.delete(partner.id);
                          }
                          setSelectedPartners(newSelected);
                        }}
                        className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg flex items-center justify-center">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-lg object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          <Building2 className="w-4 h-4 text-yellow-600 hidden" />
                        </div>
                        <span className="font-medium text-gray-900">{partner.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <a 
                        href={partner.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Globe className="w-4 h-4" />
                        {partner.url.replace(/^https?:\/\//, '')}
                      </a>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">{formatJalaliDate(partner.addedDate)}</span>
                        <span className="text-xs text-gray-500">{getRelativeJalaliDate(partner.addedDate)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowPreview(partner)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="پیش‌نمایش"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditPartner(partner)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="ویرایش"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(partner.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingPartner?.id ? 'ویرایش پلتفرم' : 'افزودن پلتفرم جدید'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingPartner(null);
                      setUploadedImage(null);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      نام پلتفرم *
                    </label>
                    <input
                      type="text"
                      value={editingPartner?.name || ''}
                      onChange={(e) => setEditingPartner(prev => prev ? { ...prev, name: e.target.value } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="نام پلتفرم را وارد کنید"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      آدرس وب‌سایت *
                    </label>
                    <input
                      type="url"
                      value={editingPartner?.url || ''}
                      onChange={(e) => setEditingPartner(prev => prev ? { ...prev, url: e.target.value } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>

                  {/* Photo Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      لوگو پلتفرم
                    </label>
                    
                    {/* Current/Uploaded Image Preview */}
                    {(uploadedImage || editingPartner?.logo) && (
                      <div className="mb-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                              <Image
                                src={uploadedImage || editingPartner?.logo || ''}
                                alt="Logo preview"
                                width={48}
                                height={48}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const fallback = target.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                              <ImageIcon className="w-6 h-6 text-gray-400 hidden" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">تصویر انتخاب شده</p>
                              <p className="text-xs text-gray-500">
                                {uploadedImage ? 'آپلود شده' : 'تصویر فعلی'}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={removeUploadedImage}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                            title="حذف تصویر"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Upload Button */}
                    <div className="space-y-2">
                      <label className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 cursor-pointer transition-colors group">
                        {isUploading ? (
                          <>
                            <RefreshCw className="w-5 h-5 text-gray-400 animate-spin" />
                            <span className="text-sm text-gray-600">در حال آپلود...</span>
                          </>
                        ) : (
                          <>
                            <Camera className="w-5 h-5 text-gray-400 group-hover:text-yellow-600" />
                            <span className="text-sm text-gray-600 group-hover:text-yellow-700">
                              {uploadedImage || editingPartner?.logo ? 'تغییر تصویر' : 'انتخاب تصویر'}
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 text-center">
                        فرمت‌های مجاز: JPG، PNG، GIF، SVG، WebP (حداکثر 5MB)
                      </p>
                    </div>

                    {/* Manual Logo Path Input */}
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        یا مسیر لوگو را وارد کنید
                      </label>
                      <input
                        type="text"
                        value={editingPartner?.logo || ''}
                        onChange={(e) => {
                          setEditingPartner(prev => prev ? { ...prev, logo: e.target.value } : null);
                          setUploadedImage(null);
                        }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="/logos/platform-name.svg"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        اگر خالی بگذارید، لوگو به صورت خودکار تولید می‌شود
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      تاریخ عضویت (شمسی)
                    </label>
                    <input
                      type="text"
                      value={editingPartner?.addedDate || ''}
                      onChange={(e) => setEditingPartner(prev => prev ? { ...prev, addedDate: e.target.value } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="1404/01/15"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      فرمت: YYYY/MM/DD (مثال: 1404/01/15)
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSavePartner}
                    disabled={isUploading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    ذخیره
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingPartner(null);
                      setUploadedImage(null);
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">پیش‌نمایش پلتفرم</h2>
                  <button
                    onClick={() => setShowPreview(null)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      <Image
                        src={showPreview.logo}
                        alt={showPreview.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-xl object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl items-center justify-center hidden">
                        <Building2 className="w-8 h-8 text-yellow-600" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{showPreview.name}</h3>
                    <p className="text-gray-600 mb-4">{showPreview.url.replace(/^https?:\/\//, '')}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>عضویت از {getRelativeJalaliDate(showPreview.addedDate)}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatJalaliDate(showPreview.addedDate)}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={showPreview.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    مشاهده وب‌سایت
                  </a>
                  <button
                    onClick={() => setShowPreview(null)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    بستن
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">تأیید حذف</h3>
                <p className="text-gray-600 mb-6">
                  آیا از حذف این پلتفرم اطمینان دارید؟ این عمل غیرقابل بازگشت است.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDeletePartner(showDeleteConfirm)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;