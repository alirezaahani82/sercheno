"use client";

import {
  ChangeEvent,
  FormEvent,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const services = [
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
  "سایر خدمات",
];

const provinces = [
  "آذربایجان شرقی",
  "آذربایجان غربی",
  "اردبیل",
  "اصفهان",
  "البرز",
  "ایلام",
  "بوشهر",
  "تهران",
  "چهارمحال و بختیاری",
  "خراسان جنوبی",
  "خراسان رضوی",
  "خراسان شمالی",
  "خوزستان",
  "زنجان",
  "سمنان",
  "سیستان و بلوچستان",
  "فارس",
  "قزوین",
  "قم",
  "کردستان",
  "کرمان",
  "کرمانشاه",
  "کهگیلویه و بویراحمد",
  "گلستان",
  "گیلان",
  "لرستان",
  "مازندران",
  "مرکزی",
  "هرمزگان",
  "همدان",
  "یزد",
];

const experiences = [
  "کمتر از ۱ سال",
  "۱ تا ۳ سال",
  "۳ تا ۵ سال",
  "۵ تا ۱۰ سال",
  "بیش از ۱۰ سال",
];

const cooperationTypes = [
  "پروژه‌ای",
  "روزمزد",
  "قراردادی",
  "تمام‌وقت",
  "پاره‌وقت",
  "قابل مذاکره",
];

const availabilities = [
  "همه‌روزه",
  "شنبه تا پنجشنبه",
  "فقط روزهای کاری",
  "با هماهنگی قبلی",
];

type PreviewFile = {
  file: File;
  preview: string;
};

const MAX_SOURCE_FILE_SIZE = 15 * 1024 * 1024;
const MAX_COMPRESSED_FILE_SIZE = 1.5 * 1024 * 1024;
const MAX_PORTFOLIO_COUNT = 3;

export default function ServiceRegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [birthDate, setBirthDate] = useState("");

  /* =========================
     Login information
  ========================= */

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState("");

  const [province, setProvince] = useState(
    "آذربایجان شرقی"
  );
  const [city, setCity] = useState("تبریز");
  const [activityArea, setActivityArea] =
    useState("");

  const [experience, setExperience] =
    useState("");
  const [description, setDescription] =
    useState("");
  const [cooperationType, setCooperationType] =
    useState("");
  const [availability, setAvailability] =
    useState("");
  const [certificates, setCertificates] =
    useState("");
  const [priceInfo, setPriceInfo] =
    useState("");

  const [showPhone, setShowPhone] =
    useState(true);
  const [acceptRules, setAcceptRules] =
    useState(false);

  const [profile, setProfile] =
    useState<PreviewFile | null>(null);

  const [portfolio, setPortfolio] =
    useState<PreviewFile[]>([]);

  const [loading, setLoading] =
    useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const remainingPortfolio = useMemo(
    () =>
      MAX_PORTFOLIO_COUNT -
      portfolio.length,
    [portfolio.length]
  );

  /* =========================
     Compress image
  ========================= */

  async function compressImage(
    file: File
  ): Promise<File> {
    if (!file.type.startsWith("image/")) {
      throw new Error(
        "فایل انتخاب‌شده تصویر نیست."
      );
    }

    const imageUrl =
      URL.createObjectURL(file);

    try {
      const image = new Image();

      await new Promise<void>(
        (resolve, reject) => {
          image.onload = () => resolve();

          image.onerror = () =>
            reject(
              new Error(
                "امکان خواندن تصویر انتخاب‌شده وجود ندارد."
              )
            );

          image.src = imageUrl;
        }
      );

      const maxDimension = 1600;

      let width = image.naturalWidth;
      let height = image.naturalHeight;

      if (
        width > maxDimension ||
        height > maxDimension
      ) {
        const ratio = Math.min(
          maxDimension / width,
          maxDimension / height
        );

        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas =
        document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const context =
        canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "امکان پردازش تصویر در مرورگر وجود ندارد."
        );
      }

      context.drawImage(
        image,
        0,
        0,
        width,
        height
      );

      let quality = 0.82;

      let blob =
        await new Promise<Blob | null>(
          (resolve) =>
            canvas.toBlob(
              resolve,
              "image/jpeg",
              quality
            )
        );

      if (!blob) {
        throw new Error(
          "امکان آماده‌سازی تصویر وجود ندارد."
        );
      }

      while (
        blob.size >
          MAX_COMPRESSED_FILE_SIZE &&
        quality > 0.45
      ) {
        quality -= 0.07;

        blob =
          await new Promise<Blob | null>(
            (resolve) =>
              canvas.toBlob(
                resolve,
                "image/jpeg",
                quality
              )
          );

        if (!blob) {
          throw new Error(
            "امکان فشرده‌سازی تصویر وجود ندارد."
          );
        }
      }

      if (
        blob.size >
        MAX_COMPRESSED_FILE_SIZE
      ) {
        const smallerCanvas =
          document.createElement(
            "canvas"
          );

        const smallerRatio = 0.75;

        smallerCanvas.width = Math.max(
          600,
          Math.round(
            width * smallerRatio
          )
        );

        smallerCanvas.height = Math.max(
          600,
          Math.round(
            height * smallerRatio
          )
        );

        const smallerContext =
          smallerCanvas.getContext("2d");

        if (!smallerContext) {
          throw new Error(
            "امکان پردازش تصویر وجود ندارد."
          );
        }

        smallerContext.drawImage(
          image,
          0,
          0,
          smallerCanvas.width,
          smallerCanvas.height
        );

        const smallerBlob =
          await new Promise<Blob | null>(
            (resolve) =>
              smallerCanvas.toBlob(
                resolve,
                "image/jpeg",
                0.68
              )
          );

        if (smallerBlob) {
          blob = smallerBlob;
        }
      }

      return new File(
        [blob],
        `image-${Date.now()}.jpg`,
        {
          type: "image/jpeg",
          lastModified: Date.now(),
        }
      );
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  }

  /* =========================
     Profile image
  ========================= */

  function handleProfile(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage(
        "فایل عکس پرسنلی باید تصویری باشد."
      );
      return;
    }

    if (
      file.size >
      MAX_SOURCE_FILE_SIZE
    ) {
      setErrorMessage(
        "حجم عکس پرسنلی نباید بیشتر از ۱۵ مگابایت باشد."
      );
      return;
    }

    setErrorMessage("");

    if (profile?.preview) {
      URL.revokeObjectURL(
        profile.preview
      );
    }

    setProfile({
      file,
      preview:
        URL.createObjectURL(file),
    });

    e.target.value = "";
  }

  /* =========================
     Portfolio images
  ========================= */

  function handlePortfolio(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(
      e.target.files || []
    );

    if (!files.length) return;

    const available =
      MAX_PORTFOLIO_COUNT -
      portfolio.length;

    if (files.length > available) {
      setErrorMessage(
        `حداکثر ${MAX_PORTFOLIO_COUNT} عکس نمونه‌کار می‌توانید انتخاب کنید.`
      );

      e.target.value = "";
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setErrorMessage(
          "تمام فایل‌های نمونه‌کار باید عکس باشند."
        );

        e.target.value = "";
        return;
      }

      if (
        file.size >
        MAX_SOURCE_FILE_SIZE
      ) {
        setErrorMessage(
          "حجم هر عکس نمونه‌کار نباید بیشتر از ۱۵ مگابایت باشد."
        );

        e.target.value = "";
        return;
      }
    }

    setErrorMessage("");

    const newFiles: PreviewFile[] =
      files.map((file) => ({
        file,
        preview:
          URL.createObjectURL(file),
      }));

    setPortfolio((prev) => [
      ...prev,
      ...newFiles,
    ]);

    e.target.value = "";
  }

  function removePortfolio(
    index: number
  ) {
    const item = portfolio[index];

    if (item?.preview) {
      URL.revokeObjectURL(
        item.preview
      );
    }

    setPortfolio((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  }

  /* =========================
     Validation
  ========================= */

  function validate() {
    if (!firstName.trim()) {
      return "نام را وارد کنید.";
    }

    if (!lastName.trim()) {
      return "نام خانوادگی را وارد کنید.";
    }

    if (
      !/^09\d{9}$/.test(
        phone.trim()
      )
    ) {
      return "شماره موبایل صحیح نیست. مثال: 09123456789";
    }

    if (
      !/^\d{10}$/.test(
        nationalCode.trim()
      )
    ) {
      return "کد ملی باید ۱۰ رقم باشد.";
    }

    /* =========================
       Username
    ========================= */

    const normalizedUsername =
      username.trim().toLowerCase();

    if (!normalizedUsername) {
      return "نام کاربری را وارد کنید.";
    }

    if (
      !/^[a-z0-9_]{4,30}$/.test(
        normalizedUsername
      )
    ) {
      return "نام کاربری باید ۴ تا ۳۰ کاراکتر و فقط شامل حروف انگلیسی، عدد و _ باشد.";
    }

    /* =========================
       Password
    ========================= */

    if (password.length < 8) {
      return "رمز عبور باید حداقل ۸ کاراکتر باشد.";
    }

    if (password !== confirmPassword) {
      return "تکرار رمز عبور با رمز عبور یکسان نیست.";
    }

    if (!category) {
      return "دسته خدمات خود را انتخاب کنید.";
    }

    if (!province) {
      return "استان را انتخاب کنید.";
    }

    if (!city.trim()) {
      return "شهر را وارد کنید.";
    }

    if (!experience) {
      return "سابقه فعالیت را انتخاب کنید.";
    }

    if (!description.trim()) {
      return "توضیحات حرفه‌ای خود را وارد کنید.";
    }

    if (!profile) {
      return "عکس پرسنلی خود را انتخاب کنید.";
    }

    if (portfolio.length === 0) {
      return "لطفاً حداقل یک عکس نمونه‌کار آپلود کنید.";
    }

    if (
      portfolio.length >
      MAX_PORTFOLIO_COUNT
    ) {
      return "حداکثر ۳ عکس نمونه‌کار مجاز است.";
    }

    if (!acceptRules) {
      return "لطفاً قوانین ثبت خدمات را تأیید کنید.";
    }

    return "";
  }

  /* =========================
     Upload image
  ========================= */

  async function uploadImage(
    file: File,
    folder: string,
    title: string
  ): Promise<string> {
    try {
      const compressedFile =
        await compressImage(file);

      const fileName =
        `${crypto.randomUUID()}.jpg`;

      const path =
        `${folder}/${fileName}`;

      const { error } =
        await supabase.storage
          .from("professionals")
          .upload(
            path,
            compressedFile,
            {
              cacheControl: "3600",
              upsert: false,
              contentType:
                "image/jpeg",
            }
          );

      if (error) {
        console.error(
          "SUPABASE IMAGE UPLOAD ERROR:",
          {
            title,
            message:
              error.message,
            folder,
          }
        );

        throw new Error(
          `آپلود ${title} انجام نشد. لطفاً دوباره عکس را انتخاب کنید.`
        );
      }

      return path;
    } catch (error) {
      console.error(
        "IMAGE UPLOAD EXCEPTION:",
        {
          title,
          folder,
          error,
        }
      );

      if (
        error instanceof Error &&
        error.message.startsWith(
          "آپلود"
        )
      ) {
        throw error;
      }

      throw new Error(
        `در آپلود ${title} مشکلی ایجاد شد. لطفاً یک عکس دیگر با حجم کمتر انتخاب کنید.`
      );
    }
  }

  /* =========================
     Submit
  ========================= */

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const validationError =
      validate();

    if (validationError) {
      setErrorMessage(
        validationError
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setLoading(true);

    try {
      /*
       * --------------------------------
       * 1. ساخت حساب ورود متخصص
       * --------------------------------
       */

      const normalizedUsername =
        username
          .trim()
          .toLowerCase();

      const authResponse =
        await fetch(
          "/api/service/register-auth",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              username:
                normalizedUsername,
              password,
            }),
          }
        );

      const authResult =
        await authResponse.json();

      if (
        !authResponse.ok ||
        !authResult.success
      ) {
        throw new Error(
          authResult.message ||
            "ساخت حساب کاربری انجام نشد."
        );
      }

      const authUserId =
        authResult.userId;

      /*
       * --------------------------------
       * 2. شناسه درخواست
       * --------------------------------
       */

      const registrationId =
        crypto.randomUUID();

      /*
       * --------------------------------
       * 3. عکس پرسنلی
       * --------------------------------
       */

      let profilePath: string;

      try {
        profilePath =
          await uploadImage(
            profile!.file,
            `applications/${registrationId}/profile`,
            "عکس پرسنلی"
          );
      } catch (error) {
        throw error;
      }

      /*
       * --------------------------------
       * 4. نمونه‌کارها
       * --------------------------------
       */

      const portfolioPaths: string[] =
        [];

      for (
        let i = 0;
        i < portfolio.length;
        i++
      ) {
        const path =
          await uploadImage(
            portfolio[i].file,
            `applications/${registrationId}/portfolio`,
            `نمونه‌کار شماره ${i + 1}`
          );

        portfolioPaths.push(path);
      }

      /*
       * --------------------------------
       * 5. ثبت اطلاعات متخصص
       * --------------------------------
       */

      const { error } =
        await supabase
          .from("professionals")
          .insert({
            first_name:
              firstName.trim(),

            last_name:
              lastName.trim(),

            phone:
              phone.trim(),

            national_code:
              nationalCode.trim(),

            birth_date:
              birthDate || null,

            username:
              normalizedUsername,

            auth_user_id:
              authUserId,

            service:
              category,

            skills:
              skills.trim() || null,

            province,

            city:
              city.trim(),

            activity_area:
              activityArea.trim() ||
              null,

            experience,

            description:
              description.trim(),

            cooperation_type:
              cooperationType ||
              null,

            availability:
              availability ||
              null,

            certificates:
              certificates.trim() ||
              null,

            price_info:
              priceInfo.trim() ||
              null,

            show_phone:
              showPhone,

            profile_image:
              profilePath,

            work_image_1:
              portfolioPaths[0] ||
              null,

            work_image_2:
              portfolioPaths[1] ||
              null,

            work_image_3:
              portfolioPaths[2] ||
              null,

            /*
             * status عمداً ارسال نمی‌شود.
             * مقدار پیش‌فرض دیتابیس = pending
             */
          });

      if (error) {
        console.error(
          "PROFESSIONAL INSERT ERROR:",
          error
        );

        throw new Error(
          "تصاویر با موفقیت آپلود شدند، اما ثبت اطلاعات در سامانه انجام نشد. لطفاً دوباره تلاش کنید."
        );
      }

      setSuccessMessage(
        "ثبت‌نام شما با موفقیت انجام شد. پس از بررسی و تأیید مدیر، حساب شما فعال خواهد شد."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        router.push(
          "/service"
        );
      }, 2500);
    } catch (error) {
      console.error(
        "SERVICE REGISTER ERROR:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "خطای نامشخص در ثبت درخواست.";

      setErrorMessage(
        `خطای ثبت: ${message}`
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900"
    >
      {/* Header */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm">
            سرچنو | پلتفرم هوشمند ساخت‌وساز
          </div>

          <h1 className="max-w-3xl text-3xl font-black leading-[1.7] md:text-5xl">
            خدمات ساختمانی خود را در سرچنو ثبت کنید
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            اطلاعات حرفه‌ای خود را ثبت کنید تا پس از
            بررسی و تأیید، در دسته تخصصی خودتان به
            کاربران سرچنو معرفی شوید.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        {errorMessage && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium leading-7 text-red-700">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium leading-7 text-emerald-700">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* 01 Personal */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
            <SectionTitle
              number="01"
              title="اطلاعات شخصی"
              subtitle="اطلاعات واقعی خود را وارد کنید."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="نام"
                value={firstName}
                onChange={setFirstName}
                placeholder="مثلاً علیرضا"
                required
              />

              <Field
                label="نام خانوادگی"
                value={lastName}
                onChange={setLastName}
                placeholder="مثلاً آهنی"
                required
              />

              <Field
                label="شماره موبایل"
                value={phone}
                onChange={setPhone}
                placeholder="09123456789"
                inputMode="tel"
                required
              />

              <Field
                label="کد ملی"
                value={nationalCode}
                onChange={setNationalCode}
                placeholder="۱۰ رقم"
                inputMode="numeric"
                required
              />

              <Field
                label="تاریخ تولد"
                value={birthDate}
                onChange={setBirthDate}
                placeholder="مثلاً 1375/01/15"
              />

              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                کد ملی و تاریخ تولد برای بررسی اطلاعات
                ثبت می‌شوند و در پروفایل عمومی متخصص
                نمایش داده نخواهند شد.
              </div>
            </div>

            {/* Login */}
            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-5">
                <h3 className="text-lg font-black">
                  اطلاعات ورود به پنل متخصص
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  با این اطلاعات در آینده وارد پنل
                  شخصی خود خواهید شد.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="نام کاربری"
                  value={username}
                  onChange={(value) =>
                    setUsername(
                      value
                        .toLowerCase()
                        .replace(
                          /[^a-z0-9_]/g,
                          ""
                        )
                    )
                  }
                  placeholder="مثلاً ali_ahani"
                  required
                />

                <div className="hidden md:block" />

                <PasswordField
                  label="رمز عبور"
                  value={password}
                  onChange={setPassword}
                  placeholder="حداقل ۸ کاراکتر"
                  required
                />

                <PasswordField
                  label="تکرار رمز عبور"
                  value={confirmPassword}
                  onChange={
                    setConfirmPassword
                  }
                  placeholder="رمز عبور را دوباره وارد کنید"
                  required
                />
              </div>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                نام کاربری فقط شامل حروف انگلیسی،
                عدد و علامت _ باشد.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto]">
              <div>
                <label className="mb-2 block text-sm font-bold">
                  عکس پرسنلی
                  <span className="mr-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfile}
                  className="block w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm"
                />

                <p className="mt-2 text-xs text-slate-500">
                  عکس تا ۱۵ مگابایت قابل انتخاب است و
                  قبل از ارسال به‌صورت خودکار فشرده
                  می‌شود.
                </p>
              </div>

              {profile && (
                <img
                  src={profile.preview}
                  alt="پیش‌نمایش عکس پرسنلی"
                  className="h-32 w-24 rounded-2xl object-cover shadow-md"
                />
              )}
            </div>
          </section>

          {/* 02 Service */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
            <SectionTitle
              number="02"
              title="تخصص و زمینه فعالیت"
              subtitle="دسته اصلی فعالیت خود را انتخاب کنید."
            />

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {services.map((item) => {
                const selected =
                  category === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setCategory(item)
                    }
                    className={`rounded-2xl border p-4 text-right text-sm font-bold transition ${
                      selected
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white hover:border-slate-400"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <TextArea
                label="مهارت‌ها و تخصص‌های جزئی"
                value={skills}
                onChange={setSkills}
                placeholder="مثلاً نصب پنجره دوجداره، رگلاژ، تعویض یراق‌آلات و..."
              />
            </div>
          </section>

          {/* 03 Location */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
            <SectionTitle
              number="03"
              title="محدوده فعالیت"
              subtitle="کاربران بر اساس موقعیت مکانی بتوانند شما را پیدا کنند."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Select
                label="استان"
                value={province}
                onChange={setProvince}
                options={provinces}
                required
              />

              <Field
                label="شهر"
                value={city}
                onChange={setCity}
                placeholder="مثلاً تبریز"
                required
              />

              <div className="md:col-span-2">
                <Field
                  label="محدوده فعالیت"
                  value={activityArea}
                  onChange={setActivityArea}
                  placeholder="مثلاً تبریز، ولیعصر، ائل‌گلی و مناطق اطراف"
                />
              </div>
            </div>
          </section>

          {/* 04 Experience */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
            <SectionTitle
              number="04"
              title="سوابق و شرایط همکاری"
              subtitle="اطلاعاتی که باعث اعتماد بیشتر مشتری می‌شود."
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Select
                label="سابقه فعالیت"
                value={experience}
                onChange={setExperience}
                options={experiences}
                placeholder="انتخاب سابقه"
                required
              />

              <Select
                label="نوع همکاری"
                value={cooperationType}
                onChange={setCooperationType}
                options={cooperationTypes}
                placeholder="انتخاب نوع همکاری"
              />

              <Select
                label="زمان فعالیت"
                value={availability}
                onChange={setAvailability}
                options={availabilities}
                placeholder="انتخاب زمان فعالیت"
              />

              <Field
                label="اطلاعات تقریبی دستمزد / قیمت"
                value={priceInfo}
                onChange={setPriceInfo}
                placeholder="مثلاً توافقی یا بر اساس پروژه"
              />

              <div className="md:col-span-2">
                <TextArea
                  label="معرفی حرفه‌ای"
                  value={description}
                  onChange={setDescription}
                  placeholder="سابقه، نوع پروژه‌هایی که انجام داده‌اید، توانایی‌ها و هر نکته‌ای که مشتری باید درباره شما بداند..."
                  required
                />
              </div>

              <div className="md:col-span-2">
                <TextArea
                  label="مدارک و گواهی‌ها"
                  value={certificates}
                  onChange={setCertificates}
                  placeholder="مثلاً مدرک فنی حرفه‌ای، گواهی نصب، سابقه شرکت‌ها و..."
                />
              </div>
            </div>
          </section>

          {/* 05 Portfolio */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
            <SectionTitle
              number="05"
              title="نمونه‌کارها"
              subtitle="حداقل ۱ و حداکثر ۳ تصویر از پروژه‌ها یا کارهای انجام‌شده."
            />

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePortfolio}
              disabled={
                portfolio.length >=
                MAX_PORTFOLIO_COUNT
              }
              className="block w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm"
            />

            <p className="mt-2 text-xs text-slate-500">
              {remainingPortfolio > 0
                ? `${remainingPortfolio} جای خالی باقی مانده است. حداقل یک عکس نمونه‌کار الزامی است.`
                : "تعداد مجاز نمونه‌کار تکمیل شده است."}
            </p>

            {portfolio.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
                {portfolio.map(
                  (item, index) => (
                    <div
                      key={item.preview}
                      className="relative"
                    >
                      <img
                        src={item.preview}
                        alt={`نمونه‌کار ${index + 1}`}
                        className="aspect-square w-full rounded-2xl object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removePortfolio(
                            index
                          )
                        }
                        className="absolute right-2 top-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-red-600 shadow"
                      >
                        حذف
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </section>

          {/* 06 Privacy */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
            <SectionTitle
              number="06"
              title="نحوه نمایش اطلاعات"
              subtitle="کنترل بیشتری روی اطلاعات تماس خود داشته باشید."
            />

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 p-4">
              <input
                type="checkbox"
                checked={showPhone}
                onChange={(e) =>
                  setShowPhone(
                    e.target.checked
                  )
                }
                className="mt-1 h-5 w-5"
              />

              <span>
                <strong className="block text-sm">
                  نمایش شماره تماس
                </strong>

                <span className="mt-1 block text-xs leading-6 text-slate-500">
                  در صورت تأیید، شماره تماس شما برای
                  کاربران سایت قابل نمایش خواهد بود.
                </span>
              </span>
            </label>

            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4">
              <input
                type="checkbox"
                checked={acceptRules}
                onChange={(e) =>
                  setAcceptRules(
                    e.target.checked
                  )
                }
                className="mt-1 h-5 w-5"
              />

              <span className="text-sm leading-7">
                اطلاعات واردشده صحیح است و با قوانین ثبت
                خدمات سرچنو موافقم.
                <span className="mr-1 text-red-500">
                  *
                </span>
              </span>
            </label>
          </section>

          {/* Submit */}
          <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-black">
                  آماده ارسال درخواست هستید؟
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-300">
                  درخواست شما ابتدا بررسی می‌شود و پس از
                  تأیید در سرچنو منتشر خواهد شد.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-white px-8 py-4 text-sm font-black text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "در حال ثبت..."
                  : "ثبت درخواست خدمات"}
              </button>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}

/* =========================
   Section Title
========================= */

function SectionTitle({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-7">
      <div className="mb-2 flex items-center gap-3">
        <span className="text-xs font-black tracking-widest text-slate-400">
          {number}
        </span>

        <h2 className="text-xl font-black md:text-2xl">
          {title}
        </h2>
      </div>

      <p className="text-sm leading-7 text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}

/* =========================
   Input Field
========================= */

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  inputMode?:
    | "text"
    | "numeric"
    | "tel"
    | "email"
    | "url";
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
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        inputMode={inputMode}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-slate-950 focus:bg-white"
      />
    </div>
  );
}

/* =========================
   Password Field
========================= */

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
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
        type="password"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        autoComplete="new-password"
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-slate-950"
      />
    </div>
  );
}

/* =========================
   Select
========================= */

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
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

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none focus:border-slate-950 focus:bg-white"
      >
        {placeholder && (
          <option value="">
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================
   Text Area
========================= */

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
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

      <textarea
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        rows={5}
        className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-7 outline-none transition focus:border-slate-950 focus:bg-white"
      />
    </div>
  );
    }
