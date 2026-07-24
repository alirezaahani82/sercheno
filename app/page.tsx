export default function Home() {
  const categories = [
    { icon: "🧱", name: "آجر و بلوک" },
    { icon: "🏗", name: "سیمان و بتن" },
    { icon: ":black_large_square:", name: "کاشی و سرامیک" },
    { icon: "🪨", name: "سنگ ساختمانی" },
    { icon: "🪟", name: "درب و پنجره" },
    { icon: ":nut_and_bolt:", name: "آهن و مصالح فلزی" },
    { icon: ":art:", name: "رنگ و پوشش" },
    { icon: ":wrench:", name: "تأسیسات ساختمانی" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900" dir="rtl">
      
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <img
  src="/logo.png"
  alt="لوگوی سرچینو"
  className="w-14 h-14 object-contain"
/>

            <div>
              <h1 className="text-2xl font-bold text-blue-600">
                سرچینو
              </h1>
              <p className="text-xs text-gray-500">
                بازار هوشمند مصالح ساختمانی
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#" className="hover:text-blue-600">
              صفحه اصلی
            </a>
            <a href="#" className="hover:text-blue-600">
              فروشندگان
            </a>
            <a href="#" className="hover:text-blue-600">
              دسته‌بندی‌ها
            </a>
            <a href="#" className="hover:text-blue-600">
              درباره سرچینو
            </a>
          </nav>

          <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-xl hover:bg-blue-50">
            ورود / ثبت‌نام
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            هر چیزی برای ساختن،
            <br />
            در سرچینو پیدا کن
          </h2>

          <p className="text-blue-100 text-lg mb-10">
            جست‌وجو، مقایسه و تأمین مصالح و تجهیزات ساختمانی از فروشندگان معتبر
          </p>

          {/* Search Box */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-xl">
            
            <select className="text-gray-700 px-4 py-4 rounded-xl outline-none bg-gray-50">
              <option>تبریز</option>
              <option>تهران</option>
              <option>ارومیه</option>
              <option>زنجان</option>
            </select>

            <input
              type="text"
              placeholder="چه مصالح یا تجهیزاتی نیاز دارید؟"
              className="flex-1 text-gray-800 px-5 py-4 outline-none text-right"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold">
              جست‌وجو :mag:
            </button>
          </div>

          <p className="text-sm text-blue-100 mt-5">
            مثال: کاشی ۶۰×۱۲۰، سیمان، آجر، پنجره UPVC، سنگ نما
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">
              دسته‌بندی‌های مصالح ساختمانی
            </h2>
            <p className="text-gray-500 mt-2">
              محصولات مورد نیاز پروژه ساختمانی خود را پیدا کنید
            </p>
          </div>

          <button className="text-blue-600 font-medium">
            مشاهده همه ←
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
5:45
{categories.map((category) => (
            <div
              key={category.name}
              className="bg-white border rounded-2xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
            >
              <div className="text-4xl mb-4">
                {category.icon}
              </div>

              <h3 className="font-medium text-sm">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-6 py-14">
          
          <h2 className="text-2xl font-bold text-center mb-12">
            چرا سرچینو؟
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="text-center p-6">
              <div className="text-4xl mb-4">:mag:</div>
              <h3 className="font-bold text-lg mb-3">
                جست‌وجوی هوشمند
              </h3>
              <p className="text-gray-500">
                مصالح مورد نیاز خود را به‌سرعت در میان فروشندگان و تأمین‌کنندگان پیدا کنید.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚖</div>
              <h3 className="font-bold text-lg mb-3">
                مقایسه فروشندگان
              </h3>
              <p className="text-gray-500">
                قیمت‌ها و شرایط فروش تأمین‌کنندگان مختلف را با یکدیگر مقایسه کنید.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold text-lg mb-3">
                تأمین آسان
              </h3>
              <p className="text-gray-500">
                درخواست خود را ثبت کنید و از فروشندگان معتبر پیشنهاد دریافت کنید.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gray-900 text-white rounded-3xl p-10 md:p-16 text-center">
          
          <h2 className="text-3xl font-bold mb-5">
            فروشنده یا تأمین‌کننده مصالح هستید؟
          </h2>

          <p className="text-gray-300 mb-8">
            فروشگاه خود را در سرچینو ثبت کنید و مشتریان جدید پیدا کنید.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold">
            ثبت فروشگاه در سرچینو
          </button>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-10">
          
          <div className="flex flex-col md:flex-row justify-between gap-8">
            
            <div>
              <h2 className="text-xl font-bold text-blue-600 mb-3">
                سرچینو
              </h2>
              <p className="text-gray-500 max-w-md">
                پلتفرم جست‌وجو و تأمین مصالح و تجهیزات ساختمانی.
              </p>
            </div>

            <div className="flex gap-10 text-sm text-gray-500">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">
                  لینک‌های مفید
                </h3>
                <p>درباره ما</p>
                <p>تماس با ما</p>
                <p>قوانین و مقررات</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">
                  ارتباط با ما
                </h3>
                <p>تبریز، ایران</p>
                <p>پشتیبانی سرچینو</p>
              </div>
            </div>

          </div>

          <div className="border-t mt-8 pt-6 text-center text-sm text-gray-400">
            :copyright: ۱۴۰۵ سرچینو — تمامی حقوق محفوظ است.
          </div>

        </div>
      </footer>

    </main>
  );
}
