"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const serviceCategories = [
  "بنا و استادکار",
  "نصاب درب و پنجره",
  "نصاب کاشی و سرامیک",
  "برق‌کار",
  "لوله‌کش",
  "جوشکار",
  "نقاش ساختمان",
  "گچ‌کار",
  "نصاب و تعمیر آسانسور",
  "نماکار",
  "کناف‌کار",
  "مهندس و پیمانکار",
];

const provinces = [
  "آذربایجان شرقی",
  "آذربایجان غربی",
  "اردبیل",
  "زنجان",
  "تهران",
  "البرز",
  "اصفهان",
  "فارس",
  "خراسان رضوی",
  "گیلان",
  "مازندران",
  "کردستان",
  "کرمانشاه",
  "قم",
  "مرکزی",
  "یزد",
  "کرمان",
  "همدان",
  "قزوین",
  "گلستان",
  "سمنان",
  "لرستان",
  "خوزستان",
  "بوشهر",
  "هرمزگان",
  "سیستان و بلوچستان",
  "چهارمحال و بختیاری",
  "کهگیلویه و بویراحمد",
  "ایلام",
  "خراسان شمالی",
  "خراسان جنوبی",
];

const experienceOptions = [
  "کمتر از ۱ سال",
  "۱ تا ۳ سال",
  "۳ تا ۵ سال",
  "۵ تا ۱۰ سال",
  "بیشتر از ۱۰ سال",
];

const cooperationOptions = [
  "پروژه‌ای",
  "روزانه",
  "ساعتی",
  "قراردادی",
  "تمام‌وقت",
  "پاره‌وقت",
];

const availabilityOptions = [
  "همه روزه",
  "شنبه تا پنجشنبه",
  "فقط روزهای کاری",
  "با هماهنگی قبلی",
];

export default function ServiceRegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState("");

  const [province, setProvince] = useState("آذربایجان شرقی");
  const [city, setCity] = useState("تبریز");
  const [activityArea, setActivityArea] = useState("");

  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");

  const [cooperationType, setCooperationType] = useState("");
  const [availability, setAvailability] = useState("");

  const [certificates, setCertificates] = useState("");
  const [priceInfo, setPriceInfo] = useState("");

  const [showPhone, setShowPhone] = useState(true);
  const [acceptRules, setAcceptRules] = useState(false);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [workImages, setWorkImages] = useState<File[]>([]);

  const [profilePreview, setProfilePreview] = useState("");
  const [workPreviews, setWorkPreviews] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleProfileImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("فایل عکس پرسنلی باید تصویر باشد.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("حجم عکس پرسنلی نباید بیشتر از ۵ مگابایت باشد.");
      return;
    }

    setProfileImage(file);
    setProfilePreview(URL.createObjectURL(file));
    setErrorMessage("");
  };

  const handleWorkImages = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    if (files.length > 3) {
      setErrorMessage("حداکثر ۳ نمونه‌کار می‌توانید انتخاب کنید.");
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setErrorMessage("نمونه‌کارها باید به صورت تصویر باشند.");
        return;
      }

      if (file.size > 7 * 1024 * 1024) {
        setErrorMessage(
          "حجم هر نمونه‌کار نباید بیشتر از ۷ مگابایت باشد."
        );
        return;
      }
    }

    setWorkImages(files);
    setWorkPreviews(
      files.map((file) => URL.createObjectURL(file))
    );

    setErrorMessage("");
  };

  const validateForm = () => {
    if (!firstName.trim()) {
      return "لطفاً نام خود را وارد کنید.";
    }

    if (!lastName.trim()) {
      return "لطفاً نام خانوادگی خود را وارد کنید.";
    }

    if (!phone.trim()) {
      return "لطفاً شماره موبایل خود را وارد کنید.";
    }

    if (!/^09\d{9}$/.test(phone.replace(/\s/g, ""))) {
      return "شماره موبایل صحیح نیست.";
    }

    if (!nationalCode.trim()) {
      return "لطفاً کد ملی را وارد کنید.";
    }

    if (!/^\d{10}$/.test(nationalCode)) {
      return "کد ملی باید ۱۰ رقم باشد.";
    }

    if (!category) {
      return "لطفاً دسته‌بندی تخصص خود را انتخاب کنید.";
    }

    if (!province || !city) {
      return "لطفاً محل فعالیت خود را مشخص کنید.";
    }

    if (!experience) {
      return "لطفاً میزان سابقه خود را انتخاب کنید.";
    }

    if (!description.trim()) {
      return "لطفاً درباره تخصص و تجربه خود توضیح دهید.";
    }

    if (!profileImage) {
      return "لطفاً عکس پرسنلی ۳×۴ خود را بارگذاری کنید.";
    }

    if (!acceptRules) {
      return "برای ثبت اطلاعات باید قوانین سرچنو را بپذیرید.";
    }

    return "";
  };

  const uploadImage = async (
    file: File,
    folder: string
  ) => {
    const extension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${extension}`;

    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from("professionals")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage
      .from("professionals")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const submitForm = async () => {
    setErrorMessage("");

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    try {
      setLoading(true);

      let profileImageUrl = "";
      const workImageUrls: string[] = [];

      if (profileImage) {
        profileImageUrl = await uploadImage(
          profileImage,
          "profile"
        );
      }

      for (const image of workImages) {
        const url = await uploadImage(
          image,
          "portfolio"
        );

        workImageUrls.push(url);
      }

      const { error } = await supabase
        .from("professionals")
        .insert({
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          national_code: nationalCode,
          birth_date: birthDate,

          service: category,
          skills: skills,

          province: province,
          city: city,
          activity_area: activityArea,

          experience: experience,
          description: description,

          cooperation_type: cooperationType,
          availability: availability,

          certificates: certificates,
          price_info: priceInfo,

          show_phone: showPhone,

          profile_image: profileImageUrl,
          work_image_1: workImageUrls[0] || null,
          work_image_2: workImageUrls[1] || null,
          work_image_3: workImageUrls[2] || null,

          status: "pending",
        });

      if (error) {
        console.error("SUPABASE ERROR:", error);
        throw error;
      }

      alert(
        "اطلاعات شما با موفقیت ثبت شد و پس از بررسی مدیریت در سرچنو منتشر خواهد شد."
      );

      window.location.href = "/service";
    } catch (error: any) {
      console.error(error);

      setErrorMessage(
        error?.message ||
          "در ثبت اطلاعات مشکلی به وجود آمد. لطفاً دوباره تلاش کنید."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f5f7fb] text-slate-900"
    >
      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a
            href="/"
            className="flex items-center gap-3"
          >
            <img
              src="/logo.png"
              alt="سرچنو"
              className="h-12 w-12 rounded-2xl object-contain"
            />

            <div>
              <div className="text-xl font-black text-blue-700">
                سرچنو
              </div>

              <div className="text-xs text-slate-500">
                پلتفرم هوشمند ساخت‌وساز
              </div>
            </div>
          </a>

          <a
            href="/service"
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
          >
            مشاهده متخصصان
          </a>
        </div>
      </header>

      {/* HERO */}

      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-emerald-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-16 text-center sm:py-20">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-4xl ring-1 ring-white/10">
            👷
          </div>

          <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            پروفایل حرفه‌ای خود را در سرچنو بسازید
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
            اگر در حوزه ساخت‌وساز فعالیت می‌کنید، تخصص، سوابق و
            نمونه‌کارهای خود را ثبت کنید تا پس از تأیید مدیریت،
            مشتریان بتوانند شما را در سرچنو پیدا کنند.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white">
              ✓ ثبت رایگان
            </span>

            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white">
              ✓ بررسی توسط مدیریت
            </span>

            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white">
              ✓ معرفی تخصص و نمونه‌کار
            </span>
          </div>
        </div>
      </section>

      {/* MAIN */}

      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">

        {errorMessage && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-bold leading-7 text-red-700">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* PERSONAL */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                👤
              </div>

              <div>
                <h2 className="text-xl font-black">
                  اطلاعات شخصی
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  اطلاعات هویتی شما برای بررسی و اعتبارسنجی پروفایل استفاده می‌شود.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">

            <Input
              label="نام"
              required
              placeholder="مثلاً علیرضا"
              value={firstName}
              onChange={setFirstName}
            />

            <Input
              label="نام خانوادگی"
              required
              placeholder="مثلاً آهنی"
              value={lastName}
              onChange={setLastName}
            />

            <Input
              label="شماره موبایل"
              required
              placeholder="۰۹۱۲۱۲۳۴۵۶۷"
              value={phone}
              onChange={setPhone}
              type="tel"
            />

            <Input
              label="کد ملی"
              required
              placeholder="۱۰ رقم"
              value={nationalCode}
              onChange={setNationalCode}
              maxLength={10}
            />

            <Input
              label="تاریخ تولد"
              placeholder="مثلاً ۱۳۷۵/۰۵/۲۲"
              value={birthDate}
              onChange={setBirthDate}
            />

          </div>
        </div>

        {/* PROFILE PHOTO */}

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                📷
              </div>

              <div>
                <h2 className="text-xl font-black">
                  عکس پرسنلی
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  یک عکس واضح و رسمی از خودتان بارگذاری کنید.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">

            <label className="block cursor-pointer">

              <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition hover:border-blue-400 hover:bg-blue-50">

                {profilePreview ? (
                  <img
                    src={profilePreview}
                    alt="عکس پرسنلی"
                    className="h-52 w-40 rounded-2xl object-cover shadow-md"
                  />
                ) : (
                  <>
                    <div className="text-5xl">🪪</div>

                    <h3 className="mt-4 font-black">
                      بارگذاری عکس ۳×۴
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      فرمت JPG یا PNG — حداکثر ۵ مگابایت
                    </p>

                    <span className="mt-5 rounded-xl bg-blue-700 px-6 py-3 text-sm font-black text-white">
                      انتخاب عکس
                    </span>
                  </>
                )}

              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImage}
                className="hidden"
              />

            </label>

          </div>
        </div>

        {/* SERVICE */}

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-xl">
                🛠️
              </div>

              <div>
                <h2 className="text-xl font-black">
                  تخصص و خدمات
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  مشخص کنید در چه زمینه‌ای فعالیت می‌کنید.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">

            <label className="mb-3 block text-sm font-black">
              دسته‌بندی اصلی <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

              {serviceCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-2xl border p-4 text-sm font-bold transition ${
                    category === item
                      ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-100"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  {category === item && (
                    <span className="ml-1">✓</span>
                  )}

                  {item}
                </button>
              ))}

            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-bold">
                تخصص‌ها و مهارت‌های تکمیلی
              </label>

              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="مثلاً نصب پنجره UPVC، تعمیر یراق‌آلات، رگلاژ و..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>

          </div>
        </div>

        {/* LOCATION */}

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-xl">
                📍
              </div>

              <div>
                <h2 className="text-xl font-black">
                  محل فعالیت
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  مشتریان باید بدانند در چه منطقه‌ای خدمات ارائه می‌دهید.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">

            <Select
              label="استان"
              value={province}
              onChange={setProvince}
              options={provinces}
            />

            <Input
              label="شهر"
              required
              placeholder="مثلاً تبریز"
              value={city}
              onChange={setCity}
            />

            <div className="sm:col-span-2">
              <Input
                label="محدوده فعالیت"
                placeholder="مثلاً تبریز، باسمنج، سردرود و حومه"
                value={activityArea}
                onChange={setActivityArea}
              />
            </div>

          </div>
        </div>

        {/* EXPERIENCE */}

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-xl">
                🏆
              </div>

              <div>
                <h2 className="text-xl font-black">
                  سابقه و اعتبار حرفه‌ای
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  سابقه کاری و مدارک حرفه‌ای خود را معرفی کنید.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">

            <Select
              label="میزان سابقه"
              value={experience}
              onChange={setExperience}
              options={experienceOptions}
              placeholder="انتخاب سابقه"
            />

            <Select
              label="نوع همکاری موردنظر"
              value={cooperationType}
              onChange={setCooperationType}
              options={cooperationOptions}
              placeholder="انتخاب نوع همکاری"
            />

            <Select
              label="زمان فعالیت"
              value={availability}
              onChange={setAvailability}
              options={availabilityOptions}
              placeholder="انتخاب زمان فعالیت"
            />

            <Input
              label="مدارک و گواهینامه‌ها"
              placeholder="مثلاً فنی و حرفه‌ای، نظام مهندسی و..."
              value={certificates}
              onChange={setCertificates}
            />

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-bold">
                معرفی کامل تخصص و تجربه
                <span className="mr-1 text-red-500">*</span>
              </label>

              <textarea
                rows={7}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="تجربه کاری، نوع پروژه‌هایی که انجام داده‌اید، مهارت‌های ویژه و هر چیزی که باعث می‌شود مشتری بهتر شما را بشناسد..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 leading-8 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <Input
              label="توضیح درباره قیمت خدمات"
              placeholder="مثلاً توافقی، بر اساس متراژ یا پس از بازدید"
              value={priceInfo}
              onChange={setPriceInfo}
            />

          </div>
        </div>

        {/* PORTFOLIO */}

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-xl">
                🖼️
              </div>

              <div>
                <h2 className="text-xl font-black">
                  نمونه‌کارها
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  حداکثر ۳ تصویر از بهترین پروژه‌های خود را قرار دهید.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">

            <label className="block cursor-pointer">

              <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 transition hover:border-blue-400 hover:bg-blue-50">

                {workPreviews.length === 0 ? (
                  <div className="py-12 text-center">

                    <div className="text-5xl">
                      🏗️
                    </div>

                    <h3 className="mt-4 font-black">
                      نمونه‌کارهای خود را اضافه کنید
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      حداکثر ۳ عکس از پروژه‌های واقعی شما
                    </p>

                    <span className="mt-5 inline-block rounded-xl bg-slate-900 px-6 py-3 text-sm font-black text-white">
                      انتخاب تصاویر
                    </span>

                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {workPreviews.map((image, index) => (
                      <div
                        key={image}
                        className="relative overflow-hidden rounded-2xl bg-white shadow-sm"
                      >
                        <img
                          src={image}
                          alt={`نمونه کار ${index + 1}`}
                          className="h-52 w-full object-cover"
                        />

                        <div className="absolute bottom-2 right-2 rounded-lg bg-black/60 px-3 py-1 text-xs font-bold text-white">
                          نمونه‌کار {index + 1}
                        </div>
                      </div>
                    ))}

                  </div>
                )}

              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleWorkImages}
                className="hidden"
              />

            </label>

          </div>
        </div>

        {/* PRIVACY */}

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-xl">
                🔐
              </div>

              <div>
                <h2 className="text-xl font-black">
                  نحوه نمایش اطلاعات
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  کنترل کنید مشتری چگونه بتواند با شما ارتباط بگیرد.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-6 sm:p-8">

            <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50">

              <input
                type="checkbox"
                checked={showPhone}
                onChange={(e) =>
                  setShowPhone(e.target.checked)
                }
                className="mt-1 h-5 w-5 accent-blue-700"
              />

              <div>
                <div className="font-black">
                  نمایش شماره تماس به مشتری
                </div>

                <div className="mt-1 text-sm leading-7 text-slate-500">
                  در صورت فعال بودن، شماره موبایل شما در پروفایل عمومی
                  متخصص نمایش داده می‌شود.
                </div>
              </div>

            </label>

            <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">

              <input
                type="checkbox"
                checked={acceptRules}
                onChange={(e) =>
                  setAcceptRules(e.target.checked)
                }
                className="mt-1 h-5 w-5 accent-blue-700"
              />

              <div>
                <div className="font-black">
                  قوانین ثبت متخصص در سرچنو را می‌پذیرم
                  <span className="mr-1 text-red-500">*</span>
                </div>

                <div className="mt-1 text-sm leading-7 text-slate-600">
                  تأیید نهایی پروفایل توسط مدیریت سرچنو انجام می‌شود و
                  اطلاعات نادرست یا خلاف قوانین ممکن است رد یا حذف شود.
                </div>
              </div>

            </label>

          </div>
        </div>

        {/* SUBMIT */}

        <div className="mt-8 overflow-hidden rounded-3xl bg-slate-950 p-6 shadow-xl sm:p-10">

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

            <div className="text-center sm:text-right">
              <h2 className="text-xl font-black text-white">
                آماده ثبت پروفایل هستید؟
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-400">
                اطلاعات شما ابتدا توسط مدیریت سرچنو بررسی می‌شود.
              </p>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={submitForm}
              className="w-full rounded-2xl bg-blue-600 px-10 py-4 font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading
                ? "در حال ثبت اطلاعات..."
                : "ثبت پروفایل در سرچنو"}
            </button>

          </div>

        </div>

        {/* TRUST */}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <TrustItem
            icon="🔒"
            title="اطلاعات امن"
            text="اطلاعات شما برای بررسی و ایجاد پروفایل استفاده می‌شود."
          />

          <TrustItem
            icon="✓"
            title="تأیید مدیریت"
            text="پروفایل قبل از انتشار توسط مدیریت سرچنو بررسی می‌شود."
          />

          <TrustItem
            icon="⭐"
            title="پروفایل حرفه‌ای"
            text="تخصص و نمونه‌کارهای شما در معرض دید مشتریان قرار می‌گیرد."
          />

        </div>

      </section>

      {/* FOOTER */}

      <footer className="mt-10 bg-slate-950 px-5 py-10 text-center">

        <img
          src="/logo.png"
          alt="سرچنو"
          className="mx-auto h-14 w-14 rounded-2xl object-contain"
        />

        <div className="mt-4 font-black text-white">
          سرچنو
        </div>

        <p className="mt-2 text-sm text-slate-500">
          پلتفرم هوشمند ساخت‌وساز
        </p>

        <p className="mt-5 text-xs text-slate-600">
          © ۱۴۰۵ سرچنو — بازار هوشمند ساخت‌وساز
        </p>

      </footer>

    </main>
  );
}


/* ================= COMPONENTS ================= */

function Input({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">
        {label}

        {required && (
          <span className="mr-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
      />
    </div>
  );
}


function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
      >
        {placeholder && (
          <option value="">
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}


function TrustItem({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
      <div className="text-2xl">
        {icon}
      </div>

      <div className="mt-3 font-black">
        {title}
      </div>

      <p className="mt-2 text-xs leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
        }
