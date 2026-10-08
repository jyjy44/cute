import { Question } from '../types';

export interface PersonalityChallengeTemplate {
  id: string;
  number: number;
  title: string;
  tagline: string;
  emoji: string;
  category: 'psychology' | 'relations' | 'traits' | 'identity';
  categoryLabel: string;
  gradient: string;
  badgeColor: string;
  questions: Question[];
}

export const PERSONALITY_CHALLENGES: PersonalityChallengeTemplate[] = [
  // 1. هل عندي مشاكل نفسية؟
  {
    id: 'ch_mental_issues',
    number: 1,
    title: 'تحدي: هل عندي مشاكل نفسية؟',
    tagline: 'هل أصدقاؤك يرونك متزناً هادئاً أم كتلة من الدراما والتقلبات غير المفهومة؟ 😂🧠',
    emoji: '🧠',
    category: 'psychology',
    categoryLabel: 'نفسية ومزاج',
    gradient: 'from-purple-500 to-indigo-600',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
    questions: [
      {
        id: 'q_p1_1',
        category: 'psychology',
        question: 'كيف أتعامل عادةً مع الضغوط والمواقف الصعبة فجأة؟',
        emoji: '🤯',
        options: [
          { id: 'opt_1', text: 'أنهار وأنعزل في غرفتي مع وسادتي', emoji: '🛌' },
          { id: 'opt_2', text: 'أتعامل ببرود وكأن شيئاً لم يحدث تماماً', emoji: '🧊' },
          { id: 'opt_3', text: 'أنفجر بالضحك الهستيري غير المبرر', emoji: '🤣' },
          { id: 'opt_4', text: 'أحلل الموقف بهدوء وأبحث عن خطة ب', emoji: '📋' },
        ],
      },
      {
        id: 'q_p1_2',
        category: 'psychology',
        question: 'ما هو مدى تقلب مزاجي خلال اليوم الواحد برأيك؟',
        emoji: '🎢',
        options: [
          { id: 'opt_1', text: 'أركب قطار الموت السريع.. 10 مشاعر في الساعة!', emoji: '🎢' },
          { id: 'opt_2', text: 'مزاجي ثابت ومستقر إلا لو جعت!', emoji: '🍔' },
          { id: 'opt_3', text: 'صباحي منتعش، ولكن ليلي مليء بالكآبة والنوستالجيا', emoji: '🌙' },
          { id: 'opt_4', text: 'حسب الشخص الذي أتحدث معه تماماً', emoji: '🎭' },
        ],
      },
      {
        id: 'q_p1_3',
        category: 'psychology',
        question: 'عندما أكون حزيناً، ما الذي أفعله غالباً دون أن أخبر أحداً؟',
        emoji: '🌧️',
        options: [
          { id: 'opt_1', text: 'أستمع لأغاني حزينة لأزيد الطين بلة', emoji: '🎧' },
          { id: 'opt_2', text: 'أطلب طعاماً لذيذاً وأشاهد مسلسلاً', emoji: '🍕' },
          { id: 'opt_3', text: 'أختفي من كل وسائل التواصل وأحذف الإشعارات', emoji: '📴' },
          { id: 'opt_4', text: 'أشتري أشياء عشوائية عبر الإنترنت أندم عليها لاحقاً', emoji: '🛍️' },
        ],
      },
      {
        id: 'q_p1_4',
        category: 'psychology',
        question: 'برأيك، ما هي العقدة النفسية الأقرب لشخصيتي؟',
        emoji: '🧩',
        options: [
          { id: 'opt_1', text: 'الهوس بالكمال والمثالية المطلقة', emoji: '✨' },
          { id: 'opt_2', text: 'الخوف الدائم من إزعاج الآخرين أو رفضهم', emoji: '🥺' },
          { id: 'opt_3', text: 'فقدان الشغف والكسل الوجودي المفاجئ', emoji: '🦥' },
          { id: 'opt_4', text: 'أنا سليم 100% وأنتم المشكلة!', emoji: '💅' },
        ],
      },
    ],
  },

  // 2. هل أنا شخصية سامة؟
  {
    id: 'ch_toxic',
    number: 2,
    title: 'تحدي: هل أنا شخصية سامة؟',
    tagline: 'هل أنا بلسم للقلب أم مادة كيميائية خطيرة يجب التعامل معها بحذر؟ ☣️🧪',
    emoji: '🧪',
    category: 'traits',
    categoryLabel: 'طباع وعلاقات',
    gradient: 'from-emerald-500 to-teal-700',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    questions: [
      {
        id: 'q_p2_1',
        category: 'traits',
        question: 'عندما أنزعج من صديق، كيف أتصرف معه في العادة؟',
        emoji: '🤐',
        options: [
          { id: 'opt_1', text: 'عقاب الصمت والتجاهل البارد (Silent Treatment)', emoji: '🧊' },
          { id: 'opt_2', text: 'أواجهه بصراحة ومباشرة ونحل الأمر', emoji: '🗣️' },
          { id: 'opt_3', text: 'ألقي تلميحات خفية وقصف جبهات في الجلسة', emoji: '💣' },
          { id: 'opt_4', text: 'أقول "ما فيني شي" بصوت يوضح أن فيني كل شي!', emoji: '🙃' },
        ],
      },
      {
        id: 'q_p2_2',
        category: 'traits',
        question: 'إذا لم يعجبني رأي أو تصرف شخص ما، فماذا أفعل؟',
        emoji: '👀',
        options: [
          { id: 'opt_1', text: 'أحكم عليه سراً بنظرات معبرة جداً', emoji: '👀' },
          { id: 'opt_2', text: 'أتقبل اختلافه بروح رياضية', emoji: '🤝' },
          { id: 'opt_3', text: 'أحاول إقناعه بكل الطرق أنني على حق دائماً', emoji: '🏆' },
          { id: 'opt_4', text: 'أنتقده بأسلوب "أنا أمزح فقط معك"', emoji: '🤡' },
        ],
      },
      {
        id: 'q_p2_3',
        category: 'traits',
        question: 'ما هي أكثر صفة قد يراها البعض "سامة" فيّ؟',
        emoji: '🐍',
        options: [
          { id: 'opt_1', text: 'الغيرة المفاجئة حتى على أصدقائي', emoji: '👀' },
          { id: 'opt_2', text: 'الدراما والتهويل من الأمور التافهة', emoji: '🎭' },
          { id: 'opt_3', text: 'المزاجية والاختفاء دون سابق إنذار', emoji: '💨' },
          { id: 'opt_4', text: 'لا يوجد! أنا نقي كالعسل الصافي', emoji: '🍯' },
        ],
      },
      {
        id: 'q_p2_4',
        category: 'traits',
        question: 'لو اعتذر مني شخص أخطأ في حقي، كيف يكون ردي الحقيقي؟',
        emoji: '🕊️',
        options: [
          { id: 'opt_1', text: 'أقبل الاعتذار ظاهرياً وأحفظ الموقف في الأرشيف للأبد', emoji: '📁' },
          { id: 'opt_2', text: 'أسامح من قلبي وأنسى الموضوع فوراً', emoji: '💖' },
          { id: 'opt_3', text: 'أجعله يشعر بالذنب لأطول فترة ممكنة أولاً', emoji: '⏳' },
          { id: 'opt_4', text: 'أرفض الاعتذار وأغلق الباب نهائياً', emoji: '🚪' },
        ],
      },
    ],
  },

  // 3. هل أنا نرجسية؟
  {
    id: 'ch_narcissist',
    number: 3,
    title: 'تحدي: هل أنا نرجسية؟',
    tagline: 'هل كوكبي يدور حولي فقط، أم لدي مساحة لبقية البشر في هذا العالم؟ 🪞👑',
    emoji: '🪞',
    category: 'traits',
    categoryLabel: 'غرور وثقة',
    gradient: 'from-amber-500 to-rose-500',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    questions: [
      {
        id: 'q_p3_1',
        category: 'traits',
        question: 'كم مرة أنظر في المرآة أو كاميرا الهاتف الأمامية يومياً؟',
        emoji: '🤳',
        options: [
          { id: 'opt_1', text: 'في كل سطح عاكس يقابلني.. حتى زجاج السيارات!', emoji: '🪞' },
          { id: 'opt_2', text: 'فقط قبل الخروج أو للتأكد من مظهري سريعاً', emoji: '👌' },
          { id: 'opt_3', text: 'نادراً جداً.. لا أهتم كثيراً بالصور والمرآة', emoji: '🙈' },
          { id: 'opt_4', text: 'أنظر فقط لأتأمل كم أنا جذاب ولا أصدق نفسي!', emoji: '✨' },
        ],
      },
      {
        id: 'q_p3_2',
        category: 'traits',
        question: 'عندما يتحدث صديق عن مشكلته، ماذا أفعل في الأغلب؟',
        emoji: '🗣️',
        options: [
          { id: 'opt_1', text: 'أقلب الموضوع فوراً لقصة حصلت معي أنا شخصياً!', emoji: '🙋' },
          { id: 'opt_2', text: 'أنصت بكل اهتمام وأقدم الدعم الصادق', emoji: '👂' },
          { id: 'opt_3', text: 'أعطيه حلولاً فلسفية سريعة وأنهي الجلسة', emoji: '💡' },
          { id: 'opt_4', text: 'أسرح في أفكاري الخاصة وأومئ برأسي فقط', emoji: '🌀' },
        ],
      },
      {
        id: 'q_p3_3',
        category: 'traits',
        question: 'كيف أتقبل النقد أو النصيحة من المقربين؟',
        emoji: '🛡️',
        options: [
          { id: 'opt_1', text: 'أعتبره هجوماً شخصياً وأدافع عن نفسي بشراسة', emoji: '⚔️' },
          { id: 'opt_2', text: 'أستمع بهدوء وأفكر إن كان كلامه صحيحاً', emoji: '🤔' },
          { id: 'opt_3', text: 'أتظاهر بالاهتمام ولا أطبق حرفاً واحداً', emoji: '🤫' },
          { id: 'opt_4', text: 'أذكره فوراً بأخطائه وعيوبه هو!', emoji: '🎯' },
        ],
      },
    ],
  },

  // 4. هل عندي تعلق عاطفي زائد؟
  {
    id: 'ch_attachment',
    number: 4,
    title: 'تحدي: هل عندي تعلق عاطفي زائد؟',
    tagline: 'هل أتعلق بسرعة كاللاصق العجيب، أم قلبي قلعة حصينة لا يدخلها أحد؟ 💔🔗',
    emoji: '🔗',
    category: 'relations',
    categoryLabel: 'مشاعر وعلاقات',
    gradient: 'from-pink-500 to-rose-600',
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    questions: [
      {
        id: 'q_p4_1',
        category: 'relations',
        question: 'إذا تأخر شخص أحبه في الرد على رسالتي لساعتين، ماذا يدور برأسي؟',
        emoji: '📱',
        options: [
          { id: 'opt_1', text: 'أرسم سيناريوهات مرعبة أنه كرهني أو وقع في كارثة!', emoji: '😱' },
          { id: 'opt_2', text: 'عادي، هو مشغول وسيرد حين يتفرغ', emoji: '☕' },
          { id: 'opt_3', text: 'أتعمد التأخر بالرد عليه ضعف المدة انتقاماً!', emoji: '⏱️' },
          { id: 'opt_4', text: 'أتحقق من ظهوره ونشاطه على كل التطبيقات سراً', emoji: '🕵️' },
        ],
      },
      {
        id: 'q_p4_2',
        category: 'relations',
        question: 'كم من الوقت أحتاج لأتعلق بشخص دخل حياتي للتو؟',
        emoji: '💘',
        options: [
          { id: 'opt_1', text: 'محادثة واحدة لطيفة كفيلة برسم خطة زواجنا ومستقبلنا!', emoji: '👰' },
          { id: 'opt_2', text: 'أحتاج أشهراً طويلة واختبارات قاسية لأثق به', emoji: '🏰' },
          { id: 'opt_3', text: 'أسبوع إلى أسبوعين من الاهتمام المتواصل', emoji: '💌' },
          { id: 'opt_4', text: 'لا أتعلق بأحد، أنا قلبي من حجر!', emoji: '🗿' },
        ],
      },
      {
        id: 'q_p4_3',
        category: 'relations',
        question: 'عند انتهاء علاقة أو صداقة، كيف أتعافى منها؟',
        emoji: '🩹',
        options: [
          { id: 'opt_1', text: 'أظل أراقبه وأبكي على الذكريات لأشهر أو سنوات', emoji: '😭' },
          { id: 'opt_2', text: 'أقطع الصلة نهائياً وأمضي قدماً بسرعة', emoji: '✂️' },
          { id: 'opt_3', text: 'أشغل نفسي بأشخاص جدد لتشتيت المشاعر', emoji: '🤹' },
          { id: 'opt_4', text: 'أعيش فترة حزن قصيرة ثم أعود أقوى', emoji: '💪' },
        ],
      },
    ],
  },

  // 5. هل أنا غيورة جدًا؟
  {
    id: 'ch_jealous',
    number: 5,
    title: 'تحدي: هل أنا غيورة جدًا؟',
    tagline: 'هل أنفجر من الغيرة إذا رأيت صديقي المفضل يضحك مع شخص آخر؟ 🔥👀',
    emoji: '🔥',
    category: 'relations',
    categoryLabel: 'مشاعر وعلاقات',
    gradient: 'from-red-500 to-amber-600',
    badgeColor: 'bg-red-100 text-red-700 border-red-200',
    questions: [
      {
        id: 'q_p5_1',
        category: 'relations',
        question: 'لو رأيت صديقي المقرب يتفق مع صديق جديد للخروج بدوني، ما رد فعلي؟',
        emoji: '😤',
        options: [
          { id: 'opt_1', text: 'أشعر بنار الغيرة والخذلان وأبدأ بالمعاتبة فوراً!', emoji: '🔥' },
          { id: 'opt_2', text: 'أتمنى لهما وقتاً سعيداً بكل أريحية', emoji: '🌸' },
          { id: 'opt_3', text: 'أتصرف بلا مبالاة تامة وأخرج مع شخص آخر نكاية!', emoji: '😎' },
          { id: 'opt_4', text: 'أرسل لهما تلميحات ورسائل عتاب خفية مضحكة', emoji: '😉' },
        ],
      },
      {
        id: 'q_p5_2',
        category: 'relations',
        question: 'عندما أرى شخصاً حولي حقق نجاحاً كنت أتمناه لنفسي، ماذا أشعر؟',
        emoji: '🏆',
        options: [
          { id: 'opt_1', text: 'أفرح له بصدق وأتحمس لأنجح أنا أيضاً', emoji: '🎉' },
          { id: 'opt_2', text: 'أفرح له ولكن يصيبني إحباط خفيف ومقارنة ذاتية', emoji: '🥺' },
          { id: 'opt_3', text: 'أقول في نفسي: "أنا كنت أستحقها أكثر منه!"', emoji: '😏' },
          { id: 'opt_4', text: 'أتساءل كيف وصل لها وأحاول معرفة السر فوراً', emoji: '🔍' },
        ],
      },
    ],
  },

  // 6. هل أنا شخصية متحكمة؟
  {
    id: 'ch_controlling',
    number: 6,
    title: 'تحدي: هل أنا شخصية متحكمة؟',
    tagline: 'هل يجب أن تسير كل الخروجات والخطط على طريقتي وحساباتي الدقيقة؟ 🎮🧭',
    emoji: '🧭',
    category: 'traits',
    categoryLabel: 'طباع وسيطرة',
    gradient: 'from-blue-600 to-cyan-600',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    questions: [
      {
        id: 'q_p6_1',
        category: 'traits',
        question: 'عند التخطيط لطلعة أو سفر مع الأصدقاء، ما هو دوري عادةً؟',
        emoji: '🗺️',
        options: [
          { id: 'opt_1', text: 'أنا القائد.. أحدد المكان والمطعم والجدول بالساعة!', emoji: '👑' },
          { id: 'opt_2', text: 'أنا مع المجموعة، أينما ذهبوا أنا موافق وسعيد', emoji: '🚗' },
          { id: 'opt_3', text: 'أعترض على كل اقتراح لا يعجبني حتى نوافق على اقتراحي', emoji: '🙅' },
          { id: 'opt_4', text: 'أعتذر عن القدوم في آخر لحظة لأن الخطة لم تعجبني', emoji: '🏃' },
        ],
      },
      {
        id: 'q_p6_2',
        category: 'traits',
        question: 'إذا رأيت شخصاً يفعل شيئاً بطريقة مختلفة عن طريقتي، ماذا أفعل؟',
        emoji: '🖐️',
        options: [
          { id: 'opt_1', text: 'آخذ الشيء من يده وأقول: "دعني أريك كيف يُصنع صح!"', emoji: '✋' },
          { id: 'opt_2', text: 'أتركه براحته، فلكل شخص طريقته الخاصة', emoji: '🕊️' },
          { id: 'opt_3', text: 'أراقبه بنظرات من التوتر الداخلي الشديد', emoji: '😬' },
          { id: 'opt_4', text: 'أقدم نصيحة سريعة وأبتعد', emoji: '💡' },
        ],
      },
    ],
  },

  // 7. هل عندي ثقة بالنفس؟
  {
    id: 'ch_confidence',
    number: 7,
    title: 'تحدي: هل عندي ثقة بالنفس؟',
    tagline: 'هل أنا واثق الخطوة يمشي ملكاً، أم أشك في كل حركة وقرار أتخذه؟ 🦁👑',
    emoji: '🦁',
    category: 'identity',
    categoryLabel: 'ثقة وتطوير',
    gradient: 'from-amber-400 to-yellow-600',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    questions: [
      {
        id: 'q_p7_1',
        category: 'identity',
        question: 'عندما أرتدي ملابس جديدة وأخرج بها، ماذا يدور في ذهني؟',
        emoji: '👗',
        options: [
          { id: 'opt_1', text: 'أشعر أنني الأجمل في المكان بلا منازع!', emoji: '🌟' },
          { id: 'opt_2', text: 'أسأل أصحابي 5 مرات: "هل هي لائقة عليّ حقاً؟"', emoji: '😟' },
          { id: 'opt_3', text: 'مرتاح وأشعر بالرضا دون حاجة لرأي أحد', emoji: '😎' },
          { id: 'opt_4', text: 'أشعر أن الكل ينظر إليّ وينتقدني سراً', emoji: '🙈' },
        ],
      },
      {
        id: 'q_p7_2',
        category: 'identity',
        question: 'كيف أتعامل عندما يمدحني شخص أو يثني على مظهري؟',
        emoji: '🥰',
        options: [
          { id: 'opt_1', text: 'أبتسم وأقول: "أعرف، شكراً لك!" بكل ثقة', emoji: '💅' },
          { id: 'opt_2', text: 'أخجل وأقلل من قيمة نفسي: "لا هذا قديم وعادي"', emoji: '🙈' },
          { id: 'opt_3', text: 'أشك في نواياه: "ماذا يريد مني يا ترى؟"', emoji: '🤨' },
          { id: 'opt_4', text: 'أشكر بامتنان وراحة تامة', emoji: '🌸' },
        ],
      },
    ],
  },

  // 8. هل أنا انطوائية أم اجتماعية؟
  {
    id: 'ch_introvert_extrovert',
    number: 8,
    title: 'تحدي: هل أنا انطوائية أم اجتماعية؟',
    tagline: 'هل طاقتي تُشحن بين الزحام والناس، أم في غرفتي مع شاي وكتاب؟ 🛋️🎉',
    emoji: '🛋️',
    category: 'identity',
    categoryLabel: 'طبيعة الشخصية',
    gradient: 'from-teal-400 to-emerald-600',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    questions: [
      {
        id: 'q_p8_1',
        category: 'identity',
        question: 'بعد قضاء 4 ساعات في حفلة أو تجمع مليء بالناس، كيف تكون حالتي؟',
        emoji: '🔋',
        options: [
          { id: 'opt_1', text: 'بطاريتي 0%.. أحتاج أسبوعاً من العزلة في غرفتي!', emoji: '🪫' },
          { id: 'opt_2', text: 'طاقتي 100%.. هيا نكمل السهرة في مكان آخر!', emoji: '⚡' },
          { id: 'opt_3', text: 'معتدل، انبسطت وجاهز للنوم فقط', emoji: '🛌' },
          { id: 'opt_4', text: 'أكون قد اختفيت قبل ساعتين دون أن يلاحظ أحد!', emoji: '👻' },
        ],
      },
      {
        id: 'q_p8_2',
        category: 'identity',
        question: 'إذا رن هاتفي برقم غير مسجل أو اتصال مفاجئ، ماذا أفعل؟',
        emoji: '📞',
        options: [
          { id: 'opt_1', text: 'أنظر إلى الشاشة برعب وأنتظر حتى يصمت الرنين!', emoji: '😱' },
          { id: 'opt_2', text: 'أرد مباشرة بفضول: "أهلاً، من معي؟"', emoji: '🤙' },
          { id: 'opt_3', text: 'أبحث عن الرقم في تطبيقات كشف الأرقام أولاً', emoji: '🔎' },
          { id: 'opt_4', text: 'أرسل رسالة نصية فوراً: "مين؟ أنا في اجتماع"', emoji: '💬' },
        ],
      },
    ],
  },

  // 9. هل أنا حساسة زيادة؟
  {
    id: 'ch_sensitive',
    number: 9,
    title: 'تحدي: هل أنا حساسة زيادة؟',
    tagline: 'هل كلمة بسيطة أو نبرة صوت كافية لتغيير مسار يومي بالكامل؟ 🥺💧',
    emoji: '🥺',
    category: 'psychology',
    categoryLabel: 'مشاعر ونفسية',
    gradient: 'from-rose-400 to-pink-500',
    badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
    questions: [
      {
        id: 'q_p9_1',
        category: 'psychology',
        question: 'إذا تغيرت نبرة صوت صديقي فجأة في مكالمة، ماذا يحصل معي؟',
        emoji: '🎙️',
        options: [
          { id: 'opt_1', text: 'أعتقد فوراً أنني ارتكبت مصيبة وأنه غاضب مني!', emoji: '💔' },
          { id: 'opt_2', text: 'عادي، ربما هو متعب أو يمر بيوم صعب', emoji: '🤷' },
          { id: 'opt_3', text: 'أسأله مباشرة: "هل أنت زعلان مني؟"', emoji: '🥺' },
          { id: 'opt_4', text: 'أنزعج وأقلب صوتي ببرود مماثل', emoji: '🧊' },
        ],
      },
      {
        id: 'q_p9_2',
        category: 'psychology',
        question: 'عندما أشاهد مشهداً حزيناً في فيلم أو إعلاناً مؤثراً، ما رد فعلي؟',
        emoji: '🎬',
        options: [
          { id: 'opt_1', text: 'أبكي بحرقة وكأني أنا بطل القصة المنكوب!', emoji: '😭' },
          { id: 'opt_2', text: 'أتأثر قليلاً وأمسح دمعة سريعة في الخفاء', emoji: '🥲' },
          { id: 'opt_3', text: 'لا أتأثر نهائياً، أعرف أنه تمثيل ومؤثرات', emoji: '🗿' },
          { id: 'opt_4', text: 'أنفجر بالضحك لأغطي على المشاعر المحرجة', emoji: '🤭' },
        ],
      },
    ],
  },

  // 10. هل أنا Overthinker؟
  {
    id: 'ch_overthinker',
    number: 10,
    title: 'تحدي: هل أنا Overthinker؟',
    tagline: 'هل دماغي عبارة عن 80 تبويب مفتوح في الثالثة فجراً بلا إيقاف؟ 🌀💭',
    emoji: '🌀',
    category: 'psychology',
    categoryLabel: 'تفكير زائد',
    gradient: 'from-indigo-500 to-violet-700',
    badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    questions: [
      {
        id: 'q_p10_1',
        category: 'psychology',
        question: 'قبل النوم، ماذا يفعل عقلي عادةً؟',
        emoji: '🛌',
        options: [
          { id: 'opt_1', text: 'يسترجع موقفاً محرجاً حدث عام 2017 ويحلله بدقة!', emoji: '⏰' },
          { id: 'opt_2', text: 'أضع رأسي وأنام خلال 5 دقائق كالطفل البريء', emoji: '😴' },
          { id: 'opt_3', text: 'أبني سيناريوهات خيالية وأفلام رومانسية حتى أنام', emoji: '🎬' },
          { id: 'opt_4', text: 'أفكر في مستقبل الكون ومصير البشرية وديوني', emoji: '🌌' },
        ],
      },
      {
        id: 'q_p10_2',
        category: 'psychology',
        question: 'لو أرسل لي شخص نقطة "." أو كلمة "تمام"، كيف أفسرها؟',
        emoji: '💬',
        options: [
          { id: 'opt_1', text: 'أراها إعلان حرب رسمية وقطع للعلاقات الدبلوماسية!', emoji: '⚔️' },
          { id: 'opt_2', text: 'رسالة عادية تدل على الموافقة والاختصار', emoji: '👍' },
          { id: 'opt_3', text: 'أعيد قراءة آخر 20 رسالة لأعرف متى أخطأت', emoji: '🔍' },
          { id: 'opt_4', text: 'أرد عليه بنقطتين ".." لأثبت قوتي!', emoji: '💣' },
        ],
      },
    ],
  },

  // 11. هل أنا عصبية؟
  {
    id: 'ch_angry',
    number: 11,
    title: 'تحدي: هل أنا عصبية؟',
    tagline: 'هل فيوزات مخي تحترق في ثانية، أم أنا هادئ كأمواج البحر الهادئ؟ 🌋⚡',
    emoji: '🌋',
    category: 'traits',
    categoryLabel: 'طباع وعصبية',
    gradient: 'from-orange-500 to-red-600',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    questions: [
      {
        id: 'q_p11_1',
        category: 'traits',
        question: 'ما هي سرعة اشتعال غضبي من 1 إلى 10؟',
        emoji: '⚡',
        options: [
          { id: 'opt_1', text: '10/10.. بركان جاهز للانفجار على أقل حركة!', emoji: '🌋' },
          { id: 'opt_2', text: '2/10.. هادئ جداً ونادراً ما يراني أحد غاضباً', emoji: '🧘' },
          { id: 'opt_3', text: '5/10.. أصبر طويلاً ولكن إن غضبت فاهربوا!', emoji: '🌪️' },
          { id: 'opt_4', text: 'أعصب بشدة لمدة 3 دقائق ثم أنسى كل شيء وأضحك', emoji: '🌤️' },
        ],
      },
      {
        id: 'q_p11_2',
        category: 'traits',
        question: 'عندما أغضب بشدة، ماذا أفعل في العادة؟',
        emoji: '💥',
        options: [
          { id: 'opt_1', text: 'أصرخ وأرمي الكلمات كالقذائف ثم أندم لاحقاً', emoji: '💣' },
          { id: 'opt_2', text: 'أصمت تماماً وأرمق الجميع بنظرات قاتلة مرعبة', emoji: '👀' },
          { id: 'opt_3', text: 'أبكي من شدة القهر والعصبية', emoji: '😭' },
          { id: 'opt_4', text: 'أخرج وأمشي أو أفرغ غضبي في الأكل والتنظيف', emoji: '🧹' },
        ],
      },
    ],
  },

  // 12. هل شخصيتي قوية أم ضعيفة؟
  {
    id: 'ch_strong_personality',
    number: 12,
    title: 'تحدي: هل شخصيتي قوية أم ضعيفة؟',
    tagline: 'هل أنا صاحب كلمة ورأي صلب، أم أنساق بسهولة مع كلام الآخرين؟ 🛡️💪',
    emoji: '💪',
    category: 'identity',
    categoryLabel: 'قوة الشخصية',
    gradient: 'from-slate-700 to-slate-900',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    questions: [
      {
        id: 'q_p12_1',
        category: 'identity',
        question: 'عندما يطلب مني شخص خدمة وأنا لا أريد، هل أستطيع قول "لا"؟',
        emoji: '🚫',
        options: [
          { id: 'opt_1', text: 'أقول "لا" مباشرة بوجه بارد وبلا تردد', emoji: '🙅' },
          { id: 'opt_2', text: 'أستحي وأقول "نعم" وأتحمل فوق طاقتي ومجهودي', emoji: '🥺' },
          { id: 'opt_3', text: 'أخترع عذراً كاذباً معقداً للهروب من الموقف', emoji: '🏃' },
          { id: 'opt_4', text: 'أتجاهل الرسالة وأتظاهر أنني لم أرها', emoji: '🙈' },
        ],
      },
      {
        id: 'q_p12_2',
        category: 'identity',
        question: 'في الجلسات والنقاشات الحادة، كيف يكون حضوري؟',
        emoji: '🗣️',
        options: [
          { id: 'opt_1', text: 'حضور قيادي لافت، رأيي مسموع ويحسب له حساب', emoji: '👑' },
          { id: 'opt_2', text: 'أفضل الاستماع والمراقبة دون لفت الانتباه', emoji: '🤫' },
          { id: 'opt_3', text: 'أغير رأيي إن رأيت الأغلبية متفقة ضدي', emoji: '🌊' },
          { id: 'opt_4', text: 'أحاول تهدئة الجميع وتلطيف الأجواء دائماً', emoji: '🕊️' },
        ],
      },
    ],
  },

  // 13. هل أخاف من الهجر؟
  {
    id: 'ch_abandonment',
    number: 13,
    title: 'تحدي: هل أخاف من الهجر؟',
    tagline: 'هل أخشى أن يتركني أصدقائي وأحبائي فجأة وحدي في منتصف الطريق؟ 🚪💔',
    emoji: '🚪',
    category: 'psychology',
    categoryLabel: 'مخاوف نفسية',
    gradient: 'from-cyan-600 to-blue-800',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    questions: [
      {
        id: 'q_p13_1',
        category: 'psychology',
        question: 'هل أقدم تنازلات مبالغة في العلاقات خوفاً من أن يبتعد الناس عني؟',
        emoji: '🤝',
        options: [
          { id: 'opt_1', text: 'نعم للأسف، أضحي براحتي لإرضاء من أحبهم دائماً', emoji: '💔' },
          { id: 'opt_2', text: 'أبداً، من يريد البقاء فأهلاً به، ومن يريد الرحيل فمع السلامة!', emoji: '👋' },
          { id: 'opt_3', text: 'أفعل ذلك أحياناً مع أشخاص محددين جداً فقط', emoji: '🔒' },
          { id: 'opt_4', text: 'أبتعد أنا أولاً قبل أن تسنح لهم فرصة التخلي عني!', emoji: '🏃' },
        ],
      },
      {
        id: 'q_p13_2',
        category: 'psychology',
        question: 'إذا شعرت بجفاء طفيف من صديق، ما هو استنتاجي المباشر؟',
        emoji: '💭',
        options: [
          { id: 'opt_1', text: '"لقد ملّ مني وبدأ يبحث عن بديل!"', emoji: '😢' },
          { id: 'opt_2', text: '"هو مشغول أو يمر بظروف شخصية"', emoji: '🧘' },
          { id: 'opt_3', text: '"سأقاطعه بنفس القدر فوراً حتى لا أهان"', emoji: '🧊' },
          { id: 'opt_4', text: 'أصارحه فوراً وأطلب توضيحاً مباشراً', emoji: '❓' },
        ],
      },
    ],
  },

  // 14. هل أنا Red Flag أم Green Flag؟
  {
    id: 'ch_red_flag_green_flag',
    number: 14,
    title: 'تحدي: هل أنا Red Flag أم Green Flag؟',
    tagline: 'هل أنا حقل من الورود المريحة، أم لافتة تحذير حمراء تمشي على قدمين؟ 🚩🌿',
    emoji: '🚩',
    category: 'traits',
    categoryLabel: 'تقييم الشخصية',
    gradient: 'from-rose-500 via-pink-500 to-emerald-500',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    questions: [
      {
        id: 'q_p14_1',
        category: 'traits',
        question: 'ما هو أكبر Red Flag (راية حمراء) يعترف به الجميع في شخصيتي؟',
        emoji: '🚩',
        options: [
          { id: 'opt_1', text: 'الاختفاء المفاجئ والتأخر الشديد في الرد على الرسائل', emoji: '📴' },
          { id: 'opt_2', text: 'حب السيطرة وإعطاء الأوامر والتوجيهات', emoji: '🧭' },
          { id: 'opt_3', text: 'الغيرة الزائدة والتدقيق في كل التفاصيل الصغيرة', emoji: '🔍' },
          { id: 'opt_4', text: 'العناد الشديد.. لا أعترف بخطئي حتى لو أحرقت السفينة!', emoji: '🔥' },
        ],
      },
      {
        id: 'q_p14_2',
        category: 'traits',
        question: 'وما هو أكبر Green Flag (راية خضراء) يجعل الناس تحبني؟',
        emoji: '🌿',
        options: [
          { id: 'opt_1', text: 'الوفاء والإخلاص.. أقف معك في أشد أوقاتك الصعبة!', emoji: '🛡️' },
          { id: 'opt_2', text: 'خفة الدم والمرح والضحك الذي لا ينتهي في وجودي', emoji: '😂' },
          { id: 'opt_3', text: 'كاتم أسرار مخلص لا يمكن أن أخون أمانتك أبداً', emoji: '🤐' },
          { id: 'opt_4', text: 'أعطي هدايا واهتماماً ولطفاً دون انتظار أي مقابل', emoji: '🎁' },
        ],
      },
    ],
  },

  // 15. هل أنا شخصية متلاعبة؟
  {
    id: 'ch_manipulative',
    number: 15,
    title: 'تحدي: هل أنا شخصية متلاعبة؟',
    tagline: 'هل أعرف كيف أحرك خيوط اللعبة وأحصل على ما أريد بطرق ذكية غير مباشرة؟ 🎭♟️',
    emoji: '♟️',
    category: 'traits',
    categoryLabel: 'دهاء وذكاء',
    gradient: 'from-purple-800 to-slate-900',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    questions: [
      {
        id: 'q_p15_1',
        category: 'traits',
        question: 'إذا أردت إقناع صديقي بشيء يرفضه، كيف أحصل على مرادي؟',
        emoji: '🎭',
        options: [
          { id: 'opt_1', text: 'ألعب على وتر المشاعر والذنب واللطافة المبالغة', emoji: '🥺' },
          { id: 'opt_2', text: 'أقنعه بالمنطق والحجج والبراهين الواضحة', emoji: '🧠' },
          { id: 'opt_3', text: 'أجعله يظن أن الفكرة كانت فكرته هو من البداية!', emoji: '♟️' },
          { id: 'opt_4', text: 'أستسلم فوراً ولا أحب الضغط على أحد', emoji: '🏳️' },
        ],
      },
      {
        id: 'q_p15_2',
        category: 'traits',
        question: 'هل أكشف كل أوراقي ومشاعري دائماً بوضوح؟',
        emoji: '🃏',
        options: [
          { id: 'opt_1', text: 'أنا كتاب مفتوح، كل ما في قلبي يظهر على وجهي', emoji: '📖' },
          { id: 'opt_2', text: 'أخفي أوراقي بحذر وأكشف ما يناسب الموقف فقط', emoji: '🤫' },
          { id: 'opt_3', text: 'أغير أقوالي وتصرفاتي حسب مصلحة الموقف', emoji: '🎭' },
          { id: 'opt_4', text: 'صريح لدرجة الوقاحة أحياناً!', emoji: '⚡' },
        ],
      },
    ],
  },

  // 16. هل أسامح بسهولة أم أحقد؟
  {
    id: 'ch_forgiving_or_grudge',
    number: 16,
    title: 'تحدي: هل أسامح بسهولة أم أحقد؟',
    tagline: 'هل قلبي أبيض كالسحاب، أم لدي دفتر أسود مليء بالذكريات والانتقام المؤجل؟ 📓🖤',
    emoji: '📓',
    category: 'traits',
    categoryLabel: 'تسامح ومواقف',
    gradient: 'from-slate-600 to-rose-700',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    questions: [
      {
        id: 'q_p16_1',
        category: 'traits',
        question: 'لو خذلني شخص عزيز جداً في موقف كبير، ماذا يحصل بيننا؟',
        emoji: '💔',
        options: [
          { id: 'opt_1', text: 'يموت بالنسبة لي للأبد ويمحى من سجلات حياتي!', emoji: '⚰️' },
          { id: 'opt_2', text: 'أسامحه بعد فترة ولكن العلاقة لا تعود كما كانت', emoji: '🩹' },
          { id: 'opt_3', text: 'أسامحه وتعود العلاقة طبيعية بعد عتاب صادق', emoji: '💖' },
          { id: 'opt_4', text: 'أنتظر اللحظة المناسبة لأرد له الصاع صاعين!', emoji: '🎯' },
        ],
      },
      {
        id: 'q_p16_2',
        category: 'traits',
        question: 'كم تدوم ذاكرتي في حفظ الإساءات والكلمات الجارحة؟',
        emoji: '🧠',
        options: [
          { id: 'opt_1', text: 'ذاكرة فيل لا تنسى كلمة قيلت قبل 10 سنوات بالساعة واليوم!', emoji: '🐘' },
          { id: 'opt_2', text: 'أنسى بسرعة بعد يومين ولا أتذكر سبب الزعل أصلاً', emoji: '🐟' },
          { id: 'opt_3', text: 'أتذكر الموقف فقط لكي لا أكرر خطأ الثقة فيه', emoji: '🛡️' },
          { id: 'opt_4', text: 'أحفظها وأعيد فتحها في كل شجار قادم!', emoji: '🔄' },
        ],
      },
    ],
  },

  // 17. هل أنا شخص يعتمد عليه؟
  {
    id: 'ch_reliable',
    number: 17,
    title: 'تحدي: هل أنا شخص يعتمد عليه؟',
    tagline: 'لو حدثت مصيبة في منتصف الليل، هل أكون أول شخص تتصل به وتثق في نجدته؟ 🛡️🚨',
    emoji: '🚨',
    category: 'relations',
    categoryLabel: 'وفاء ومسؤولية',
    gradient: 'from-blue-700 to-indigo-800',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    questions: [
      {
        id: 'q_p17_1',
        category: 'relations',
        question: 'إذا وعدت صديقاً بشيء أو موعد، ما هي نسبة التزامي الحقيقية؟',
        emoji: '🤝',
        options: [
          { id: 'opt_1', text: '100%.. كلمتي شرف حتى لو احترقت الدنيا!', emoji: '🏆' },
          { id: 'opt_2', text: 'أتأخر عادةً عن الموعد نصف ساعة مع عذر مقنع', emoji: '⏳' },
          { id: 'opt_3', text: 'أنسى الوعد أحياناً أو أعتذر قبل الموعد بساعة', emoji: '🙈' },
          { id: 'opt_4', text: 'ألتزم فقط إن كان الشيء يهمني شخصياً أيضاً', emoji: '🎯' },
        ],
      },
      {
        id: 'q_p17_2',
        category: 'relations',
        question: 'لو اتصل بي صديق يبكي ويطلب مساعدتي في وقت حرج، ماذا أفعل؟',
        emoji: '🚑',
        options: [
          { id: 'opt_1', text: 'أترك كل ما بيدي وأركض إليه فوراً دون تفكير', emoji: '🏃' },
          { id: 'opt_2', text: 'أهدئه عبر الهاتف وأحاول التفكير معه في حل', emoji: '📞' },
          { id: 'opt_3', text: 'أتوتر ولا أعرف كيف أتصرف وأتمنى لو لم أتصل', emoji: '😰' },
          { id: 'opt_4', text: 'أساعده في اليوم التالي بعد أن يهدأ الجو', emoji: '☀️' },
        ],
      },
    ],
  },

  // 18. هل أعرف أحب بطريقة صح؟
  {
    id: 'ch_how_i_love',
    number: 18,
    title: 'تحدي: هل أعرف أحب بطريقة صح؟',
    tagline: 'كيف أعبّر عن مشاعري ومن أكون في العلاقات الصادقة؟ حب ناضج أم فوضوي؟ 💖🕊️',
    emoji: '💖',
    category: 'relations',
    categoryLabel: 'حب ومشاعر',
    gradient: 'from-pink-500 via-rose-500 to-purple-600',
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    questions: [
      {
        id: 'q_p18_1',
        category: 'relations',
        question: 'ما هي لغة الحب الأساسية التي أعبر بها عن اهتمامي؟',
        emoji: '💌',
        options: [
          { id: 'opt_1', text: 'الأفعال والمساندة والوقوف في المواقف الصعبة', emoji: '💪' },
          { id: 'opt_2', text: 'الهدايا والمفاجآت والطعام اللذيذ دائماً!', emoji: '🎁' },
          { id: 'opt_3', text: 'الكلام الحلو والمدح والدلع المستمر', emoji: '🥰' },
          { id: 'opt_4', text: 'قضاء وقت ممتع ومسلي معاً والضحك طوال اليوم', emoji: '🎮' },
        ],
      },
      {
        id: 'q_p18_2',
        category: 'relations',
        question: 'عندما أحب شخصاً بصدق، ما هو أكبر عيب يظهر في علاقتي معه؟',
        emoji: '🥺',
        options: [
          { id: 'opt_1', text: 'الخوف المفرط من خسارته والغيرة الخانقة', emoji: '🔒' },
          { id: 'opt_2', text: 'البرود في التعبير وصعوبة إظهار المشاعر بوضوح', emoji: '🧊' },
          { id: 'opt_3', text: 'التضحية بنفسي ورغباتي حتى أختنق', emoji: '🥀' },
          { id: 'opt_4', text: 'العتاب والتدقيق على كل كلمة وحركة يفعلها', emoji: '🔍' },
        ],
      },
    ],
  },

  // 19. ما هو الجانب المظلم من شخصيتي؟
  {
    id: 'ch_dark_side',
    number: 19,
    title: 'تحدي: ما هو الجانب المظلم من شخصيتي؟',
    tagline: 'الوجه الذي لا يعرفه إلا من اقترب كثيراً واحترق بناره.. هل تجرؤ على كشفه؟ 🌑🦇',
    emoji: '🌑',
    category: 'identity',
    categoryLabel: 'أسرار وخفايا',
    gradient: 'from-slate-900 via-purple-950 to-slate-900',
    badgeColor: 'bg-slate-200 text-slate-900 border-slate-400',
    questions: [
      {
        id: 'q_p19_1',
        category: 'identity',
        question: 'ما هو أسوأ شيء أستطيع فعله ببرود شديد إذا قررت قطع علاقتي بشخص؟',
        emoji: '✂️',
        options: [
          { id: 'opt_1', text: 'التصرف وكأنه لم يخلق في الوجود أصلاً.. محو تام!', emoji: '🕳️' },
          { id: 'opt_2', text: 'توجيه ضربة قاضية في نقطة ضعفه التي ائتمنني عليها', emoji: '🎯' },
          { id: 'opt_3', text: 'تركه محتاراً يتساءل طوال حياته: "لماذا رحل؟"', emoji: '❓' },
          { id: 'opt_4', text: 'الضحك والسعادة أمامه ليرى أنني لم أتأثر نهائياً', emoji: '🎭' },
        ],
      },
      {
        id: 'q_p19_2',
        category: 'identity',
        question: 'ما هو العيب الذي أحاول إخفاءه عن العالم بكل قوتي؟',
        emoji: '🎭',
        options: [
          { id: 'opt_1', text: 'الهشاشة الشديدة والخوف من أن أكون شخصاً غير محبوب', emoji: '🥺' },
          { id: 'opt_2', text: 'القسوة والبرود الداخلي عندما يفقد الشخص قيمته عندي', emoji: '🧊' },
          { id: 'opt_3', text: 'حب المظاهر وأن أكون دائماً محط إعجاب الجميع', emoji: '🪞' },
          { id: 'opt_4', text: 'الكسل وفقدان الهدف وتضييع الوقت في التفاهات', emoji: '🦥' },
        ],
      },
    ],
  },

  // 20. مين أنا بجد؟
  {
    id: 'ch_who_am_i',
    number: 20,
    title: 'تحدي: مين أنا بجد؟',
    tagline: 'التحدي الأعمق والأشمل لاكتشاف الهوية الحقيقية وجوهر الروح بلا أي أقنعة! 🌟🔮',
    emoji: '🔮',
    category: 'identity',
    categoryLabel: 'جوهر الروح',
    gradient: 'from-amber-500 via-rose-500 to-indigo-600',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    questions: [
      {
        id: 'q_p20_1',
        category: 'identity',
        question: 'لو وصفتني كلمة واحدة تلخص حقيقتي في الحياة، فماذا ستكون؟',
        emoji: '✨',
        options: [
          { id: 'opt_1', text: 'المكافح الطموح الذي لا يستسلم أبداً', emoji: '🔥' },
          { id: 'opt_2', text: 'الروح الطيبة والملاذ الآمن لكل من حوله', emoji: '💖' },
          { id: 'opt_3', text: 'المرح الفوضوي صانع الضحكات في كل مكان', emoji: '😂' },
          { id: 'opt_4', text: 'اللغز الغامض الذي لا يعرف سره أحد تماماً', emoji: '🕵️' },
        ],
      },
      {
        id: 'q_p20_2',
        category: 'identity',
        question: 'ما هو حلمي الحقيقي والأكبر في الحياة الذي أسعى له دائماً؟',
        emoji: '🌌',
        options: [
          { id: 'opt_1', text: 'راحة البال والعيش بسلام وأمان مع من أحب', emoji: '🕊️' },
          { id: 'opt_2', text: 'النجاح الباهر والثروة وصنع اسم لامع في العالم', emoji: '💰' },
          { id: 'opt_3', text: 'السفر واكتشاف العالم وعيش مغامرات لا تنتهي', emoji: '✈️' },
          { id: 'opt_4', text: 'أن أجد شخصاً يفهمني ويحبني كما أنا بلا شروط', emoji: '🤝' },
        ],
      },
      {
        id: 'q_p20_3',
        category: 'identity',
        question: 'أمام أصدقائي الحقيقيين المقربين، كيف أكون؟',
        emoji: '🎭',
        options: [
          { id: 'opt_1', text: 'طفل عفوي وضحكات جنونية بلا أي فلتر أو قناع!', emoji: '🤪' },
          { id: 'opt_2', text: 'ناصح حكيم ومستمع هادئ ومحلل عميق لكل مشاكلهم', emoji: '🦉' },
          { id: 'opt_3', text: 'كتلة من الدلال والاهتمام والحب اللطيف', emoji: '🌸' },
          { id: 'opt_4', text: 'مزيج عجيب لا يمكن التنبؤ به في أي لحظة!', emoji: '🎲' },
        ],
      },
    ],
  },
];

export function getPersonalityChallengeById(id: string): PersonalityChallengeTemplate | undefined {
  return PERSONALITY_CHALLENGES.find((ch) => ch.id === id);
}
