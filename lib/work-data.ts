
export type Video = {
  id: string;
  title: string;
  client: string;
  year: string;
  desc: string;
  youtubeId: string;
};

export type Category = {
  id: string;
  label: string;
  img: string;
};

/* تحويل اسم القسم إلى slug مناسب للرابط */
export const slugOf = (id: string) =>
  id.toLowerCase().replace(/\s*&\s*/g, "-").replace(/\s+/g, "-");

export const CATEGORIES: Category[] = [
  {
    id: "Content",
    label: "Content",
    img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=480&h=320&fit=crop&auto=format",
  },
  {
    id: "Promo",
    label: "Promo",
    img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=480&h=320&fit=crop&auto=format",
  },
  {
    id: "Gym",
    label: "Gym",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=480&h=320&fit=crop&auto=format",
  },
  {
    id: "Food & Drinks",
    label: "Food & Drinks",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=480&h=320&fit=crop&auto=format",
  },
  {
    id: "Factories",
    label: "Factories",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=480&h=320&fit=crop&auto=format",
  },
  {
    id: "Medical",
    label: "Medical",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=480&h=320&fit=crop&auto=format",
  },
  {
    id: "Others",
    label: "Others",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=480&h=320&fit=crop&auto=format",
  },
];

/* إنشاء فيديو بالقيم الافتراضية */
const v = (id: string, youtubeId: string): Video => ({
  id,
  title: "اسم الفيديو",
  client: "اسم الكلايينت",
  year: "2024",
  desc: "وصف قصير",
  youtubeId,
});

export const VIDEOS: Record<string, Video[]> = {
  Content: [
    v("c-1", "jX5unmmP_ik"),
    v("c-2", "x1KD7eZV1nQ"),
    v("c-3", "1lxyiY45R74"),
    v("c-4", "PnMy8AudBRI"),
    v("c-5", "0r_yWXZnR_Y"),
    v("c-6", "I8awANybDFs"),
    v("c-7", "87WzVCqIVtw"),
    v("c-8", "7TgCWYLc7To"),

    // إضافات نسخة صاحبك
    v("c-9", "bNx6bzIx26A"),
    v("c-10", "NnoAYFEvRGQ"),
    v("c-11", "iEtlZ_KhXh0"),
  ],

  Promo: [
    v("p-1", "JLqLjnX0V7o"),
    v("p-2", "C82MH7p-LEs"),
    v("p-3", "1P25FEcsnDI"),
    v("p-4", "DSGR5r2v-EM"),
  ],

  Gym: [
    // الفيديو القديم g-1 كان متوقفًا كـ comment في ملفك
    // v("g-1", "ie0itE7YmGI"),

    v("g-2", "pigA8yqQgk4"),
    v("g-3", "sRXwLa2Nzy4"),
    v("g-4", "lCd8rfAhNSE"),
    v("g-5", "cZPnUuwIVY0"),
    v("g-6", "NSnnOgu5nag"),
    v("g-7", "UA35QjDNoKA"),
    v("g-8", "iXt9V1La8R8"),
    v("g-9", "moutE0G4nv0"),
    v("g-10", "58uUTJSYUwM"),
    v("g-11", "Uuq85cumWTk"),

    // فيديوهاتك الأصلية
    v("g-12", "bNx6bzIx26A"),
    v("g-13", "NnoAYFEvRGQ"),

    // إضافات نسخة صاحبك بمعرفات جديدة
    v("g-14", "GWB-i37wdBo"),
    v("g-15", "3D7eBEgLx08"),
    v("g-16", "WyMDwibU7ZM"),
    v("g-17", "n_o1XtZLryk"),
    v("g-18", "Mo5Apf1c8V0"),
  ],

  "Food & Drinks": [
    v("fd-1", "CdG4faWdW0g"),
    v("fd-2", "dGaDbUWORrA"),
    v("fd-3", "yucb2Op_7jU"),
    v("fd-4", "VOG4gSqCRBI"),
  ],

  Product: [
    v("prod-1", "1RIK9MGby_U"),
    v("prod-2", "cNmnwXHupjo"),
    v("prod-3", "NUEDELh18Tc"),
    v("prod-4", "U8tN9RXwknU"),
  ],

  Factories: [
    v("f-1", "mea7sJQamng"),
    v("f-2", "eCBYkWAvUZM"),
  ],

  Medical: [
    v("m-1", "iEtlZ_KhXh0"),
    v("m-2", "7vmO_45Owg0"),
    v("m-3", "7TgCWYLc7To"),
    v("m-4", "o_6MtCLAw7k"),
    v("m-5", "4NxXotUl-9g"),
    v("m-6", "UipQRii9BwU"),
    v("m-7", "v4PfmFrR3T0"),

    // فيديو إضافي ظهر في نسخة صاحبك
    v("m-8", "AQ6ULJb7rtA"),
  ],

  Others: [
    v("o-1", "elrNdi15UT4"),
    v("o-2", "Tq6CNjw3Uek"),
    v("o-3", "CQbg3Op1TAE"),
    v("o-4", "768I2xacnO4"),
    v("o-5", "JjedbIPEKq8"),
    v("o-6", "QKSJ_CBgjhc"),
    v("o-7", "4NxXotUl-9g"),

    // إضافة نسخة صاحبك
    v("o-8", "WyMDwibU7ZM"),
  ],
};
