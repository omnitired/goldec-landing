export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans">
      {/* Modern Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 text-gray-900 py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 via-yellow-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
              </svg>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">گلدک</div>
          </div>
          <div className="hidden md:flex space-x-8 space-x-reverse">
            <a href="#features" className="hover:text-yellow-600 transition-all duration-300 font-medium text-gray-700 hover:scale-105">ویژگی‌ها</a>
            <a href="#how-it-works" className="hover:text-yellow-600 transition-all duration-300 font-medium text-gray-700 hover:scale-105">نحوه کار</a>
            <a href="#stats" className="hover:text-yellow-600 transition-all duration-300 font-medium text-gray-700 hover:scale-105">آمار</a>
            <a href="#contact" className="hover:text-yellow-600 transition-all duration-300 font-medium text-gray-700 hover:scale-105">تماس</a>
          </div>
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Modern Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white py-32 px-6 overflow-hidden">
        {/* Advanced background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-amber-600/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(234,179,8,0.1)_0%,transparent_50%)] opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.1)_0%,transparent_50%)] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl inline-flex items-center px-6 py-3 mb-10 border border-white/20 shadow-xl">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-3"></div>
            <span className="text-sm font-semibold text-white/90">طلا</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            سامانه نظارت بر معاملات<br />
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">طلای آب‌شده</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 text-gray-300 font-medium max-w-3xl mx-auto">
            شفافیت، امنیت و اعتماد در معاملات طلا
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
            قدرت گرفته از اتحادیه کسب و کارهای مجازی
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black px-8 py-4 rounded-2xl font-bold transition-all duration-300 text-base min-w-[240px] shadow-2xl hover:shadow-yellow-500/25 hover:scale-105 flex items-center justify-center">
              <svg className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              استعلام قیمت‌های لحظه
            </button>
            <button className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/50 px-8 py-4 rounded-2xl font-bold transition-all duration-300 text-base min-w-[220px] hover:scale-105 flex items-center justify-center shadow-xl">
              <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
              </svg>
              ورود به پنل ادمین
            </button>
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section id="features" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              ویژگی‌های <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">سامانه</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              تکنولوژی پیشرفته برای نظارت و کنترل معاملات طلا
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-blue-500/25 group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">گزارش تحلیلی و افزایش مسئولیت‌پذیری</h3>
              <p className="text-gray-600 leading-relaxed">امکان ارائه آمارهای دقیق کل تحلیل توسط کاربران با دقت بالا</p>
            </div>
            
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-emerald-500/25 group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">گزارش‌گیری خودکار و ردیابی</h3>
              <p className="text-gray-600 leading-relaxed">داده‌های لحظه‌ای برای تصمیمات مناسب و هوشمند در بازار</p>
            </div>
            
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-purple-500/25 group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V5l-9-4zm-2 14l-4-4 1.41-1.41L10 12.17l6.59-6.59L18 7l-8 8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">ثبت و تأیید اجتماعی برائت‌ها</h3>
              <p className="text-gray-600 leading-relaxed">کد استعلام فوری و قابل اعتماد برای هر خرید طلا</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern How it Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              نحوه <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">کارکرد</span> سامانه
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              فرآیند ساده و موثر در سه مرحله
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-orange-500/25 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl">1</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">استعلام ساده و گزارش تحلیف</h3>
              <p className="text-gray-600 leading-relaxed text-lg">ارسال اطلاعات مالیه و بلافاصله تحلیف</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-blue-500/25 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl">2</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">تولید و ارسال کد استعلام</h3>
              <p className="text-gray-600 leading-relaxed text-lg">دریافت کد استعلام توسط خریدار</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-emerald-500/25 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M19,19H5V5H19V19M17,12H15V17H13V12H11V10H13V8H15V10H17V12Z"/>
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl">3</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">گزارش تراکنش از پلتفرم</h3>
              <p className="text-gray-600 leading-relaxed text-lg">ارسال اطلاعات مالیه و ریاضیهه مقاله</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Statistics Section */}
      <section id="stats" className="py-24 px-6 bg-gradient-to-br from-slate-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              آمار و <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">ارقام</span> سامانه
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              عملکرد قابل اعتماد و شفاف سامانه
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 hover:scale-105 shadow-2xl">
              <div className="text-6xl md:text-7xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text mb-6">3</div>
              <div className="text-2xl font-bold mb-3 text-white">گزارش</div>
              <div className="text-gray-300">تعداد گزارش‌های تحلیلی ثبت‌شده امروز</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 hover:scale-105 shadow-2xl">
              <div className="text-6xl md:text-7xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text mb-6">8</div>
              <div className="text-2xl font-bold mb-3 text-white">پلتفرم فعال</div>
              <div className="text-gray-300">تعداد پلتفرم‌های متصل</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 hover:scale-105 shadow-2xl">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text mb-6">2,50,000 mg</div>
              <div className="text-2xl font-bold mb-3 text-white">حجم معاملات روزانه</div>
              <div className="text-gray-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Partners Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">همکاران</span> ما
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              شراکت با معتبرترین پلتفرم‌های معاملاتی
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center aspect-square flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-yellow-300 group hover:scale-105">
              <div className="text-lg font-bold text-gray-600 group-hover:text-gray-800 transition-colors">لوگو 1</div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center aspect-square flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-yellow-300 group hover:scale-105">
              <div className="text-lg font-bold text-gray-600 group-hover:text-gray-800 transition-colors">لوگو 2</div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center aspect-square flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-yellow-300 group hover:scale-105">
              <div className="text-lg font-bold text-gray-600 group-hover:text-gray-800 transition-colors">لوگو 3</div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center aspect-square flex items-center justify-center hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-yellow-300 group hover:scale-105">
              <div className="text-lg font-bold text-gray-600 group-hover:text-gray-800 transition-colors">لوگو 4</div>
            </div>
          </div>
          <p className="text-center text-gray-600 text-lg">
            همراهی سامانه، مهمترین پلتفرم‌های معاملات طلای آب‌شده
          </p>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-10">
            همین امروز سامانه را برای<br />
            پلتفرم خود فعال کنید
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-white text-gray-900 hover:bg-gray-50 px-8 py-4 rounded-2xl font-bold transition-all duration-300 text-lg min-w-[240px] shadow-2xl hover:shadow-white/25 hover:scale-105 flex items-center justify-center">
              <svg className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              API دریافت دسترسی
            </button>
            <button className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:border-white/50 px-8 py-4 rounded-2xl font-bold transition-all duration-300 text-lg min-w-[200px] hover:scale-105 flex items-center justify-center shadow-xl">
              <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              مستندات
            </button>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer id="contact" className="bg-gradient-to-br from-gray-900 to-black text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-8 text-yellow-400">لینک‌ها</h3>
            <ul className="space-y-4">
              <li><a href="#features" className="hover:text-yellow-400 transition-colors text-gray-300 flex items-center group">
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                صفحه اصلی
              </a></li>
              <li><a href="#how-it-works" className="hover:text-yellow-400 transition-colors text-gray-300 flex items-center group">
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                خدمات
              </a></li>
              <li><a href="#stats" className="hover:text-yellow-400 transition-colors text-gray-300 flex items-center group">
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                سوابق مدیران
              </a></li>
              <li><a href="#contact" className="hover:text-yellow-400 transition-colors text-gray-300 flex items-center group">
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                تماس با ما
              </a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-8 text-yellow-400">درباره ما</h3>
            <p className="text-gray-300 leading-relaxed">
              سامانه طلای ایستگاه و اعتماد در بازار طلای آب‌شده.
              ایجاد شفافیت و فراخوانی در اساسنامه و قیمت‌های
              چشم است. با ایستگاه، مطالعات را آگهیده.
              مهم ایستان نظارت دقیق و معاملات را امکان‌پذیر
              امیدیم.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-8 text-yellow-400">اطلاعات تماس</h3>
            <div className="space-y-4">
              <p className="text-gray-300 flex items-center group">
                <svg className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                support@goldec.trade
              </p>
              <p className="text-gray-300 flex items-center group">
                <svg className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                ۰۲۱-۸۸۹۹۵۰۰۰
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-8 text-yellow-400">شبکه‌های اجتماعی</h3>
            <div className="flex gap-4">
              <a href="#" className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-xl p-3 transition-all duration-300 hover:scale-110 shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-xl p-3 transition-all duration-300 hover:scale-110 shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="bg-gradient-to-br from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 rounded-xl p-3 transition-all duration-300 hover:scale-110 shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 2.567-.285.119.112.223.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p className="text-sm">© 2024 اتحادیه کسب و کارهای مجازی. تمامی حقوق محفوظ است.</p>
          <p className="mt-2 text-xs">
          </p>
        </div>
      </footer>
    </div>
  );
}
