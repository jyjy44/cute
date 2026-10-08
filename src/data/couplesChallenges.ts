import { Question } from '../types';

export interface CoupleChallengeTemplate {
  id: string;
  number: number;
  title: string;
  tagline: string;
  emoji: string;
  category: 'couples' | 'romance' | 'secrets' | 'situations';
  categoryLabel: string;
  gradient: string;
  badgeColor: string;
  questions: Question[];
}

export const COUPLE_CHALLENGES: CoupleChallengeTemplate[] = [
  // 1. تحدي مين فينا يعرف التاني أكتر؟ ❤️
  {
    id: 'ch_c1_know_each_other',
    number: 1,
    title: 'تحدي: مين فينا يعرف التاني أكتر؟ ❤️',
    tagline: 'تحدي كشف الأسرار والتفاصيل.. مين الحافظ ومين اللي ناسي كل حاجة؟ 😂🔍',
    emoji: '❤️',
    category: 'couples',
    categoryLabel: 'تحدي المعرفة',
    gradient: 'from-rose-500 to-pink-600',
    badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
    questions: [
      {
        id: 'q_c1_1',
        category: 'couples',
        question: 'لو طلبت أكل فجأة وأنا زعلان أو متضايق، هطلب إيه فوراً؟',
        emoji: '🍔',
        options: [
          { id: 'opt_1', text: 'وجبة سريعة دسمة وبطاطس مقرمشة', emoji: '🍟' },
          { id: 'opt_2', text: 'شوكولاتة وحلويات وآيس كريم', emoji: '🍫' },
          { id: 'opt_3', text: 'أكلة بيتية دافية ومشروب ساخن', emoji: '🍲' },
          { id: 'opt_4', text: 'بفقد الشهية ومبقدرش آكل أصلاً!', emoji: '🤐' },
        ],
      },
      {
        id: 'q_c1_2',
        category: 'couples',
        question: 'إيه أكتر عادة بعملها لما أكون متوتر ومحدش بياخد باله غيرك؟',
        emoji: '👀',
        options: [
          { id: 'opt_1', text: 'هز الرجل أو اللعب في الأصابع باستمرار', emoji: '🦶' },
          { id: 'opt_2', text: 'السكوت المفاجئ والتحديق في الفراغ', emoji: '😶' },
          { id: 'opt_3', text: 'الكلام بسرعة ومحاولة تشتيت الانتباه بالضحك', emoji: '😅' },
          { id: 'opt_4', text: 'مسك الموبايل والتنقل بين التطبيقات بلا هدف', emoji: '📱' },
        ],
      },
      {
        id: 'q_c1_3',
        category: 'couples',
        question: 'لو قررنا نسافر بكرة الصبح، إيه وجهتي المفضلة في أحلامي؟',
        emoji: '✈️',
        options: [
          { id: 'opt_1', text: 'مكان هادي على البحر مع غروب الشمس', emoji: '🌊' },
          { id: 'opt_2', text: 'مدينة صاخبة مليانة خروجات وأسواق وأضواء', emoji: '🏙️' },
          { id: 'opt_3', text: 'أكواخ وسط الطبيعة والجبال والبرد', emoji: '🏔️' },
          { id: 'opt_4', text: 'المهم أكون معاك في أي مكان بالكون!', emoji: '💖' },
        ],
      },
    ],
  },

  // 2. تحدي مين بيحب التاني أكتر؟ 🥹
  {
    id: 'ch_c2_loves_more',
    number: 2,
    title: 'تحدي: مين بيحب التاني أكتر؟ 🥹',
    tagline: 'السؤال الأزلي اللي بيشعل كل مناقشة حب.. مين قلبه غرقان أكتر؟ 🌊💘',
    emoji: '🥹',
    category: 'romance',
    categoryLabel: 'مشاعر وحب',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    questions: [
      {
        id: 'q_c2_1',
        category: 'romance',
        question: 'مين فينا اللي بيهتم بالتاني بطريقة تفوق الوصف وبتفاصيل يومه؟',
        emoji: '💌',
        options: [
          { id: 'opt_1', text: 'أنا طبعاً وبشهادة التاريخ والواقع!', emoji: '🙋‍♀️' },
          { id: 'opt_2', text: 'أنت بحنيتك واهتمامك اللي ملوش مثيل', emoji: '🙋‍♂️' },
          { id: 'opt_3', text: 'إحنا الاتنين بنفس المقدار بالظبط', emoji: '⚖️' },
          { id: 'opt_4', text: 'كل واحد بطريقته الخاصة والمختلفة', emoji: '🎨' },
        ],
      },
      {
        id: 'q_c2_2',
        category: 'romance',
        question: 'لما نبعد شوية عن بعض، مين بيشتاق الأول ومبيستحملش الغياب؟',
        emoji: '🥺',
        options: [
          { id: 'opt_1', text: 'أنا ببعت رسايل وشوق بعد ربع ساعة!', emoji: '💬' },
          { id: 'opt_2', text: 'أنت بتتصل أول ما تفضى وتسأل عني', emoji: '📞' },
          { id: 'opt_3', text: 'بنتسابق مين يتصل الأول!', emoji: '🏃‍♂️' },
          { id: 'opt_4', text: 'بنتظاهر بالثقل بس جوانا نار الشوق', emoji: '🔥' },
        ],
      },
      {
        id: 'q_c2_3',
        category: 'romance',
        question: 'لو اتقاس الحب بالأفعال، إيه أكتر إثبات لحبي ليك؟',
        emoji: '🫶',
        options: [
          { id: 'opt_1', text: 'إني بتحملك في أسوأ حالاتك ومزاجيتك', emoji: '🛡️' },
          { id: 'opt_2', text: 'الدعم المستمر والتشجيع في كل خطواتك', emoji: '🌟' },
          { id: 'opt_3', text: 'الأمان والراحة اللي بحس بيهم وأنا معاك', emoji: '🕊️' },
          { id: 'opt_4', text: 'كل نظرة وابتسامة لما عيوني بتيجي في عيونك', emoji: '👁️' },
        ],
      },
    ],
  },

  // 3. تحدي مين بيغير أكتر؟ 🔥
  {
    id: 'ch_c3_jealous_more',
    number: 3,
    title: 'تحدي: مين بيغير أكتر؟ 🔥',
    tagline: 'الغيرة نار شاعلة.. مين المحقق كونان ومين اللي بيتظاهر إنه عادي؟ 🕵️‍♀️🔥',
    emoji: '🔥',
    category: 'couples',
    categoryLabel: 'غيرة وتحقيق',
    gradient: 'from-orange-500 to-amber-600',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    questions: [
      {
        id: 'q_c3_1',
        category: 'couples',
        question: 'إيه رد فعلي لما حد غريب يوجهلك اهتمام أو مجاملة زيادة؟',
        emoji: '⚡',
        options: [
          { id: 'opt_1', text: 'نظرة ليزر حارقة تكفي لحرق المكان!', emoji: '👀' },
          { id: 'opt_2', text: 'ببتسم بس جرد الحساب هيبدأ أول ما ننفرد', emoji: '📝' },
          { id: 'opt_3', text: 'واثق فيك ومبهتمش خالص', emoji: '😎' },
          { id: 'opt_4', text: 'بغير من جوايا وبسكت تماماً وبزعل', emoji: '🤐' },
        ],
      },
      {
        id: 'q_c3_2',
        category: 'couples',
        question: 'مين فينا بيسأل أسئلة تحقيق: (كنت بتكلم مين؟ وليه اتأخرت؟) أكتر؟',
        emoji: '🔍',
        options: [
          { id: 'opt_1', text: 'أنا المحقق الرسمي للعلاقة بلا منازع!', emoji: '🕵️' },
          { id: 'opt_2', text: 'أنت اللي بتمسك تفاصيل المكالمات والوقت', emoji: '⏱️' },
          { id: 'opt_3', text: 'الغيرة عندنا متبادلة بالتساوي', emoji: '🤝' },
          { id: 'opt_4', text: 'محدش بيسأل لأننا بنحكي كل حاجة لوحدنا', emoji: '📖' },
        ],
      },
      {
        id: 'q_c3_3',
        category: 'couples',
        question: 'هل غيرتي عليك بتشوفها غيرة حب ولطافة ولا تحكم؟',
        emoji: '💗',
        options: [
          { id: 'opt_1', text: 'ألطف وأجمل غيرة في الكون بحبها جداً', emoji: '🥰' },
          { id: 'opt_2', text: 'غيرة مسلية وبتضحكني في معظم الأوقات', emoji: '😂' },
          { id: 'opt_3', text: 'فيها شوية جنون بس مقبولة عشان بحبك', emoji: '🤪' },
          { id: 'opt_4', text: 'أوقات بتوترني وبتحتاج تهدئة', emoji: '🧘' },
        ],
      },
    ],
  },

  // 4. تحدي مين بيتعلق أسرع؟ 💕
  {
    id: 'ch_c4_attached_faster',
    number: 4,
    title: 'تحدي: مين بيتعلق أسرع؟ 💕',
    tagline: 'مين قلبه خفيف وبيقع في الفخ من أول محادثة ومن أول ابتسامة؟ 🪤❤️',
    emoji: '💕',
    category: 'romance',
    categoryLabel: 'مشاعر وبدايات',
    gradient: 'from-pink-500 to-rose-400',
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    questions: [
      {
        id: 'q_c4_1',
        category: 'romance',
        question: 'في بداية معرفتنا، مين فينا اتعلق برسايل التاني وتعود عليها أسرع؟',
        emoji: '📲',
        options: [
          { id: 'opt_1', text: 'أنا كنت بستنى الإشعار بفارغ الصبر', emoji: '🔔' },
          { id: 'opt_2', text: 'أنت كنت بتبعت من قبل ما أصحى حتى', emoji: '☀️' },
          { id: 'opt_3', text: 'التعلق حصل في نفس اللحظة بدون تخطيط', emoji: '⚡' },
          { id: 'opt_4', text: 'خدنا وقت طويل وتدرجنا بهدوء', emoji: '🐢' },
        ],
      },
      {
        id: 'q_c4_2',
        category: 'romance',
        question: 'لو عدا يوم من غير ما نحكي، إيه اللي بيحصلي؟',
        emoji: '🥀',
        options: [
          { id: 'opt_1', text: 'اليوم بيكون باهت وناقص وبدون أي طعم', emoji: '☁️' },
          { id: 'opt_2', text: 'بتعصب وبكون مضغوط وحاسس بغربة', emoji: '😤' },
          { id: 'opt_3', text: 'بشغل نفسي بس التفكير شغال بيك طول الوقت', emoji: '🧠' },
          { id: 'opt_4', text: 'مستحيل يعدي يوم من غير ما نحكي أصلاً!', emoji: '🙅‍♂️' },
        ],
      },
      {
        id: 'q_c4_3',
        category: 'romance',
        question: 'درجة تعلقي بيك توصل لدرجة إنك:',
        emoji: '🧩',
        options: [
          { id: 'opt_1', text: 'أول شخص بيجي في بالي لما أفرح أو أحزن', emoji: '🎯' },
          { id: 'opt_2', text: 'جزء لا يتجزأ من كل خطة مستقبلية ليا', emoji: '🗺️' },
          { id: 'opt_3', text: 'الأمان اللي مبلقاش زيه عند أي حد تاني', emoji: '🏰' },
          { id: 'opt_4', text: 'كل ما سبق وأكتر بكتير!', emoji: '👑' },
        ],
      },
    ],
  },

  // 5. تحدي مين بيصالح التاني الأول؟ 🫶
  {
    id: 'ch_c5_reconciles_first',
    number: 5,
    title: 'تحدي: مين بيصالح التاني الأول؟ 🫶',
    tagline: 'مين اللي قلبه حنين ومبيستحملش الخصام والزعل أكتر من ساعة؟ 🕊️❤️',
    emoji: '🫶',
    category: 'couples',
    categoryLabel: 'صلح ووفاق',
    gradient: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    questions: [
      {
        id: 'q_c5_1',
        category: 'couples',
        question: 'أول ما نتخانق، مين اللي بيبادر يكسر الصمت ويقول كلمة حلوة؟',
        emoji: '🕊️',
        options: [
          { id: 'opt_1', text: 'أنا بكسر الجليد برسالة أو ميم يضحك', emoji: '🤣' },
          { id: 'opt_2', text: 'أنت بحنيتك بتصالح على طول ومبتسبنيش زعلان', emoji: '🫂' },
          { id: 'opt_3', text: 'اللي غلطان هو اللي بيجي يعتذر دايماً', emoji: '⚖️' },
          { id: 'opt_4', text: 'بنسكت شوية وبعدين بنرجع نكلم بعض كأن مفيش حاجة', emoji: '🤷' },
        ],
      },
      {
        id: 'q_c5_2',
        category: 'couples',
        question: 'إيه أسرع طريقة بتخليني أصفى وأنسى الزعل فوراً؟',
        emoji: '🍯',
        options: [
          { id: 'opt_1', text: 'حضن أو كلمة حنينة من القلب: (حقك عليا)', emoji: '🥺' },
          { id: 'opt_2', text: 'عزومة أكل بحبها أو هدية لطيفة مفاجئة', emoji: '🍫' },
          { id: 'opt_3', text: 'اعتراف بالخطأ ومناقشة هادية للموضوع', emoji: '🤝' },
          { id: 'opt_4', text: 'نكتة أو ضحكة عفوية من غير مقدمات', emoji: '😄' },
        ],
      },
      {
        id: 'q_c5_3',
        category: 'couples',
        question: 'أطول مدة فضلنا فيها زعلانين من بعض كانت قد إيه تقريباً؟',
        emoji: '⏳',
        options: [
          { id: 'opt_1', text: 'أقل من ساعتين ومقدرناش نكمل خصام!', emoji: '⏱️' },
          { id: 'opt_2', text: 'يوم كامل وكان أطول وأصعب يوم', emoji: '🗓️' },
          { id: 'opt_3', text: 'بضع دقائق فقط والضحكة غلبتنا', emoji: '😆' },
          { id: 'opt_4', text: 'عمرنا ما زعلنا زعل حقيقي أصلاً الحمد لله', emoji: '🧿' },
        ],
      },
    ],
  },

  // 6. تحدي مين بيزعل أسرع؟ 😂
  {
    id: 'ch_c6_upset_faster',
    number: 6,
    title: 'تحدي: مين بيزعل أسرع؟ 😂',
    tagline: 'مين الحساس اللي بياخد على خاطره من نبرة الصوت وتغيير الإيموجي؟ 🎭 حساسين!',
    emoji: '😂',
    category: 'couples',
    categoryLabel: 'دراما وزعل',
    gradient: 'from-amber-500 to-rose-500',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    questions: [
      {
        id: 'q_c6_1',
        category: 'couples',
        question: 'إيه أكتر تصرف تافه ممكن يخليني أتقمص وأزعل فجأة؟',
        emoji: '😤',
        options: [
          { id: 'opt_1', text: 'رد متأخر أو كلمة باردة بنقطة في آخر الجملة', emoji: '💬' },
          { id: 'opt_2', text: 'نسيان تفصيلة صغيرة حكيتها إمبارح', emoji: '🤦' },
          { id: 'opt_3', text: 'تغيير نبرة صوتك أو التحدث باقتضاب', emoji: '🗣️' },
          { id: 'opt_4', text: 'أنا ميزعلنيش غير الحاجات الكبيرة والواضحة بس', emoji: '🛡️' },
        ],
      },
      {
        id: 'q_c6_2',
        category: 'couples',
        question: 'لما أزعل، إيه تعبير وشي اللي بيكشفني على طول؟',
        emoji: '😐',
        options: [
          { id: 'opt_1', text: 'تكشيرة لطيفة وشفاه مزمومة', emoji: '😗' },
          { id: 'opt_2', text: 'وجه بارد بدون أي ملامح ولا ابتسامة', emoji: '🧊' },
          { id: 'opt_3', text: 'عيون حزينة ممتلئة بالدموع', emoji: '🥺' },
          { id: 'opt_4', text: 'ضحك مصطنع وسخرية سريعة', emoji: '🙃' },
        ],
      },
      {
        id: 'q_c6_3',
        category: 'couples',
        question: 'مين فينا حاصل على جائزة الأوسكار في الدراما والقمص؟',
        emoji: '🏆',
        options: [
          { id: 'opt_1', text: 'أنا طبعاً وبكل فخر وجدارة!', emoji: '👑' },
          { id: 'opt_2', text: 'أنت لما تتقمص بتعمل مسلسل تركي كامل', emoji: '🎬' },
          { id: 'opt_3', text: 'إحنا الاتنين بنتنافس على المركز الأول', emoji: '🥇' },
          { id: 'opt_4', text: 'مفيش دراما إحنا أهدى كابل في العالم', emoji: '🌿' },
        ],
      },
    ],
  },

  // 7. تحدي مين بيفهم التاني من غير كلام؟ 👀
  {
    id: 'ch_c7_understands_without_words',
    number: 7,
    title: 'تحدي: مين بيفهم التاني من غير كلام؟ 👀',
    tagline: 'التخاطر الروحي ونظرات العيون في وسط الناس.. فاهمين بعض ولا في الضياع؟ 🔮',
    emoji: '👀',
    category: 'secrets',
    categoryLabel: 'تخاطر وأسرار',
    gradient: 'from-violet-600 to-indigo-700',
    badgeColor: 'bg-violet-100 text-violet-700 border-violet-200',
    questions: [
      {
        id: 'q_c7_1',
        category: 'secrets',
        question: 'لو كنا في عزومة ورميتلك نظرة معينة، هتفهم إيه على طول؟',
        emoji: '👁️',
        options: [
          { id: 'opt_1', text: 'إننا لازم نمشي ونقوم حالاً بدون تأخير!', emoji: '🚪' },
          { id: 'opt_2', text: 'إن في موضوع خطير لازم نحش فيه أول ما نخرج', emoji: '🤫' },
          { id: 'opt_3', text: 'إني جعان أو زهقان من القعدة', emoji: '🥱' },
          { id: 'opt_4', text: 'إنك جميل وعاجبني في اللحظة دي بالذات', emoji: '🥰' },
        ],
      },
      {
        id: 'q_c7_2',
        category: 'secrets',
        question: 'هل بتقدر تعرف إني متضايق من مجرد نبرة (ألو) في التليفون؟',
        emoji: '📞',
        options: [
          { id: 'opt_1', text: 'من أول حرف بتعرف في ثانية واحدة', emoji: '⚡' },
          { id: 'opt_2', text: 'لازم أتكلم جملتين عشان تلقط الحالة', emoji: '👂' },
          { id: 'opt_3', text: 'أحياناً بتفهم وأحياناً بتفوت عليك', emoji: '🎲' },
          { id: 'opt_4', text: 'أنا شاطر في إخفاء مشاعري حتى عنك', emoji: '🎭' },
        ],
      },
      {
        id: 'q_c7_3',
        category: 'secrets',
        question: 'درجة التخاطر بيننا من 10 تقيمها بكام؟',
        emoji: '📡',
        options: [
          { id: 'opt_1', text: '10/10 متصلين بروح واحدة على نفس التردد!', emoji: '💯' },
          { id: 'opt_2', text: '8/10 قريبين جداً بس بنحتاج شوية إشارات', emoji: '📶' },
          { id: 'opt_3', text: '6/10 محتاجين شوية تقوية شبكة بيننا', emoji: '🔋' },
          { id: 'opt_4', text: 'كل يوم بنفهم بعض أكتر وأكتر', emoji: '📈' },
        ],
      },
    ],
  },

  // 8. تحدي مين حافظ تفاصيل التاني أكتر؟ 🥰
  {
    id: 'ch_c8_remembers_details',
    number: 8,
    title: 'تحدي: مين حافظ تفاصيل التاني أكتر؟ 🥰',
    tagline: 'الألوان المفضلة، مقاس الهدوم، ذكريات أول لقاء.. مين الذاكرة الذهبية؟ 🧠✨',
    emoji: '🥰',
    category: 'couples',
    categoryLabel: 'ذاكرة وتفاصيل',
    gradient: 'from-pink-500 to-purple-600',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
    questions: [
      {
        id: 'q_c8_1',
        category: 'couples',
        question: 'إيه أكتر تفصيلة غريبة أنا بحبها فيك ومحدش واخد باله منها غيري؟',
        emoji: '🔍',
        options: [
          { id: 'opt_1', text: 'طريقة ضحكتك لما تفرح بصدق من قلبك', emoji: '✨' },
          { id: 'opt_2', text: 'حركة إيديك وأنت بتشرح موضوع بحماس', emoji: '👐' },
          { id: 'opt_3', text: 'نظرة عينيك لما تطمن عليا وتخاف على زعَلي', emoji: '🥺' },
          { id: 'opt_4', text: 'ريحة عطرك اللي بتميزك في أي مكان تدخله', emoji: '🌸' },
        ],
      },
      {
        id: 'q_c8_2',
        category: 'couples',
        question: 'مين اللي فاكر تواريخ الذكريات المهمة والمناسبات بدون منبه؟',
        emoji: '📅',
        options: [
          { id: 'opt_1', text: 'أنا حافظ اليوم والساعة والدقيقة بالضبط!', emoji: '🎯' },
          { id: 'opt_2', text: 'أنت المنبه الرسمي للمناسبات والتواريخ', emoji: '⏰' },
          { id: 'opt_3', text: 'إحنا الاتنين بنحتفل بكل مناسبة بحب', emoji: '🎉' },
          { id: 'opt_4', text: 'التقويم على الموبايل هو المنقذ الحقيقي لينا', emoji: '📱' },
        ],
      },
      {
        id: 'q_c8_3',
        category: 'couples',
        question: 'لو حد سألك عن قهوتي أو مشروبي المفضل، هتقوله إيه؟',
        emoji: '☕',
        options: [
          { id: 'opt_1', text: 'حافظ النوع وكمية السكر وطريقة التقديم تماماً', emoji: '💯' },
          { id: 'opt_2', text: 'عارف الخطوط العريضة بس ممكن أنسى السكر!', emoji: '🧂' },
          { id: 'opt_3', text: 'هسألك في اللحظة نفسها عشان مغلطش', emoji: '😅' },
          { id: 'opt_4', text: 'مشروبي بيتغير حسب المزاج ومستحيل حفظه', emoji: '🌀' },
        ],
      },
    ],
  },

  // 9. تحدي مين بيعبّر عن حبه أكتر؟ ❤️
  {
    id: 'ch_c9_expresses_love',
    number: 9,
    title: 'تحدي: مين بيعبّر عن حبه أكتر؟ ❤️',
    tagline: 'الكلام الحلو ولا الأفعال؟ مين اللي بيغرق التاني مشاعر وكلام يدوب؟ 💬🍯',
    emoji: '❤️',
    category: 'romance',
    categoryLabel: 'تعبير واعتراف',
    gradient: 'from-rose-500 to-red-600',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    questions: [
      {
        id: 'q_c9_1',
        category: 'romance',
        question: 'طريقتي الأساسية في التعبير عن حبي ليك بتظهر إزاي؟',
        emoji: '💌',
        options: [
          { id: 'opt_1', text: 'كلام رومانسي ورسايل طويلة تلمس القلب', emoji: '📜' },
          { id: 'opt_2', text: 'اهتمام بالأفعال وحماية وتسهيل أمورك دايماً', emoji: '🛠️' },
          { id: 'opt_3', text: 'هدايا ومفاجآت وحاجات كيوت من غير مناسبة', emoji: '🎁' },
          { id: 'opt_4', text: 'قضاء وقت هادي معاك ومشاركتك كل لحظة', emoji: '☕' },
        ],
      },
      {
        id: 'q_c9_2',
        category: 'romance',
        question: 'مين اللي بيقول (بحبك) أكتر في اليوم العادي؟',
        emoji: '🗣️',
        options: [
          { id: 'opt_1', text: 'أنا بكررها 50 مرة في اليوم مع كل مكالمة!', emoji: '📢' },
          { id: 'opt_2', text: 'أنت اللي بتبعت (بحبك) عفوية فجأة بنص اليوم', emoji: '💌' },
          { id: 'opt_3', text: 'بنقولها لبعض في كل بداية ونهاية كلام', emoji: '🔁' },
          { id: 'opt_4', text: 'عيوننا بتقولها أكتر من لسانا بكتير', emoji: '👀' },
        ],
      },
      {
        id: 'q_c9_3',
        category: 'romance',
        question: 'إيه أكتر كلمة حب قولتهالك وحسيت إنها دخلت قلبك فوراً؟',
        emoji: '💘',
        options: [
          { id: 'opt_1', text: 'أنت أماني وبيتي ونعمة حياتي', emoji: '🏡' },
          { id: 'opt_2', text: 'عمري ما هسيبك أو أتخلى عنك مهما حصل', emoji: '🤝' },
          { id: 'opt_3', text: 'أنا بحبك بكل عيوبك قبل مميزاتك', emoji: '💎' },
          { id: 'opt_4', text: 'كل كلمة صادقة بتطلع منك بتدفي روحي', emoji: '🔥' },
        ],
      },
    ],
  },

  // 10. تحدي مين رومانسي أكتر؟ 🌹
  {
    id: 'ch_c10_more_romantic',
    number: 10,
    title: 'تحدي: مين رومانسي أكتر؟ 🌹',
    tagline: 'الشموع، الورود، الأغاني والمفاجآت.. مين شاعر العلاقة ومين الواقعي العملي؟ 🕯️',
    emoji: '🌹',
    category: 'romance',
    categoryLabel: 'رومانسية وشغف',
    gradient: 'from-red-500 via-pink-600 to-rose-600',
    badgeColor: 'bg-red-100 text-red-700 border-red-200',
    questions: [
      {
        id: 'q_c10_1',
        category: 'romance',
        question: 'لو نظمنا سهرة مثالية مع بعض، مين اللي هيركز على الأجواء الشاعرية؟',
        emoji: '🕯️',
        options: [
          { id: 'opt_1', text: 'أنا هجهز الشموع والمزيكا الهادية والإضاءة', emoji: '🎻' },
          { id: 'opt_2', text: 'أنت هتفكر في المفاجآت واللمسات السحرية', emoji: '✨' },
          { id: 'opt_3', text: 'هنعمل خروجة بسيطة ومرحة تعجبنا إحنا الاتنين', emoji: '🍕' },
          { id: 'opt_4', text: 'المهم نقعد مع بعض حتى لو في أي مكان بسيط', emoji: '🛋️' },
        ],
      },
      {
        id: 'q_c10_2',
        category: 'romance',
        question: 'هل بتشوفني شخص رومانسي خيالي ولا واقعي مع حب صادق؟',
        emoji: '💭',
        options: [
          { id: 'opt_1', text: 'رومانسي جداً وعايش في قصص الأفلام والمسلسلات', emoji: '🎞️' },
          { id: 'opt_2', text: 'رومانسي بطريقة متزنة وواقعية وحقيقية', emoji: '⚖️' },
          { id: 'opt_3', text: 'عملي جداً بس بيطلع منك حاجات رومانسية مفاجئة', emoji: '🎁' },
          { id: 'opt_4', text: 'رومانسيتك خاصة ومبتتقارنش بأي حد تاني', emoji: '👑' },
        ],
      },
      {
        id: 'q_c10_3',
        category: 'romance',
        question: 'إيه أكتر أغنية بتفكرك بقصتنا وأول ما تسمعها بتفتكرني؟',
        emoji: '🎵',
        options: [
          { id: 'opt_1', text: 'أغنية هادية كلاسيكية سمعناها مع بعض أول مرة', emoji: '🎶' },
          { id: 'opt_2', text: 'أغنية فرحانة ومبهجة بنغنيها ونضحك في الطريق', emoji: '💃' },
          { id: 'opt_3', text: 'أغنية كلماتها بتوصف حبنا وشوقنا بدقة', emoji: '📝' },
          { id: 'opt_4', text: 'كل أغنية حب حلوة بتفكرني بيك فوراً', emoji: '📻' },
        ],
      },
    ],
  },

  // 11. تحدي مين بيخاف يخسر التاني أكتر؟ 🥺
  {
    id: 'ch_c11_afraid_to_lose',
    number: 11,
    title: 'تحدي: مين بيخاف يخسر التاني أكتر؟ 🥺',
    tagline: 'الخوف الدفين اللي ورا كل اهتمام وعتاب.. مين حياته بتقف لو التاني غاب؟ 💔',
    emoji: '🥺',
    category: 'romance',
    categoryLabel: 'عمق وصدق',
    gradient: 'from-indigo-500 to-purple-600',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    questions: [
      {
        id: 'q_c11_1',
        category: 'romance',
        question: 'لما يحصل خلاف كبير ونتخانق، إيه أكتر فكرة بتخوفني وبتوجع قلبي؟',
        emoji: '⚡',
        options: [
          { id: 'opt_1', text: 'إن بعدنا يطول أو يتغير قلبك من ناحيتي', emoji: '💔' },
          { id: 'opt_2', text: 'إنك تفهمني غلط وتنسى كل الأيام الحلوة', emoji: '😔' },
          { id: 'opt_3', text: 'إني أكون سبب في زعلك ووجعك', emoji: '🥺' },
          { id: 'opt_4', text: 'واثق في حبنا وعارف إننا هنرجع أقوى', emoji: '🛡️' },
        ],
      },
      {
        id: 'q_c11_2',
        category: 'romance',
        question: 'هل بتبان لهفتي وخوفي عليك في تصرفاتي لما تتعب أو تبعد؟',
        emoji: '🌡️',
        options: [
          { id: 'opt_1', text: 'بقلب الدنيا ومبهداش لحد ما أطمن عليك تماماً', emoji: '🚨' },
          { id: 'opt_2', text: 'بكون هادي في الظاهر بس النار قايدة جوايا', emoji: '🕯️' },
          { id: 'opt_3', text: 'بتصل واسأل في كل لحظة كأني أمك/أبوك!', emoji: '📞' },
          { id: 'opt_4', text: 'بتدعيلي وبتحاوطني بدعواتك واهتمامك', emoji: '🤲' },
        ],
      },
      {
        id: 'q_c11_3',
        category: 'romance',
        question: 'لو اتقالنا جملة (حياتي من غيرك مستحيلة)، مين بيقولها بصدق أكبر؟',
        emoji: '🌍',
        options: [
          { id: 'opt_1', text: 'أنا، لأنك فعلاً بقيت كل حياتي ونورها', emoji: '🌟' },
          { id: 'opt_2', text: 'أنت، دايماً بتأكدلي المعنى ده بكلامك وأفعالك', emoji: '❤️' },
          { id: 'opt_3', text: 'إحنا الاتنين مفيش حياة لواحد من غير التاني', emoji: '♾️' },
          { id: 'opt_4', text: 'ربنا يديم وجودنا في حياة بعض دائماً وأبداً', emoji: '🤲' },
        ],
      },
    ],
  },

  // 12. تحدي مين بيعمل تنازلات أكتر؟ 💗
  {
    id: 'ch_c12_concessions',
    number: 12,
    title: 'تحدي: مين بيعمل تنازلات أكتر؟ 💗',
    tagline: 'عشان المركب تمشي والحب يفضل عايش.. مين بيجي على نفسه عشان يسعد التاني؟ ⛵',
    emoji: '💗',
    category: 'couples',
    categoryLabel: 'تضحية وتفاهم',
    gradient: 'from-teal-500 to-cyan-600',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    questions: [
      {
        id: 'q_c12_1',
        category: 'couples',
        question: 'لو اختلفنا على خروجة أو مطعم أو فيلم، مين اللي بيوافق على رغبة التاني برضا؟',
        emoji: '🎬',
        options: [
          { id: 'opt_1', text: 'أنا بتنازل فوراً عشان أشوف فرحتك ورضاك', emoji: '😊' },
          { id: 'opt_2', text: 'أنت بتسيبلي حرية الاختيار دايمًا بكل حب', emoji: '🌸' },
          { id: 'opt_3', text: 'بنوصل لحل وسط يرضي الاتنين بنظام قرعة أو تبادل', emoji: '🎲' },
          { id: 'opt_4', text: 'بنتناقش ساعة وبالآخر بنقعد في البيت ناكل!', emoji: '😂' },
        ],
      },
      {
        id: 'q_c12_2',
        category: 'couples',
        question: 'إيه أكتر حاجة أنا غيرتها أو عدلتها في طبعي عشان أريحك؟',
        emoji: '🔄',
        options: [
          { id: 'opt_1', text: 'قللت العصبية وسرعة الانفعال قدر الإمكان', emoji: '🧘' },
          { id: 'opt_2', text: 'بقيت أشارك تفاصيل وأحكي أكتر بعد ما كنت كتوم', emoji: '🗣️' },
          { id: 'opt_3', text: 'بقيت أهتم بحاجات مكنتش بهتم بيها عشانك', emoji: '🌱' },
          { id: 'opt_4', text: 'أنت بتحبني زي ما أنا بدون ما تطلب تنازلات قاسية', emoji: '💎' },
        ],
      },
      {
        id: 'q_c12_3',
        category: 'couples',
        question: 'هل التنازلات في علاقتنا متوازنة وتخلينا مرتاحين؟',
        emoji: '⚖️',
        options: [
          { id: 'opt_1', text: 'نعم ومتوازنة ومبنية على الحب والاحترام', emoji: '✅' },
          { id: 'opt_2', text: 'واحد فينا بيتعب أكتر بس بحب وسرور', emoji: '❤️' },
          { id: 'opt_3', text: 'محتاجين نتفاهم أكتر في بعض النقاط الصغيرة', emoji: '💬' },
          { id: 'opt_4', text: 'التنازل بين المحبين مش تنازل.. ده تعبير عن العشق!', emoji: '👑' },
        ],
      },
    ],
  },

  // 13. تحدي مين بيعتذر حتى لو مش غلطان؟ 😂
  {
    id: 'ch_c13_apologizes_anyway',
    number: 13,
    title: 'تحدي: مين بيعتذر حتى لو مش غلطان؟ 😂',
    tagline: 'من أجل شراء راحة البال وحفظ الود.. مين بيكتم كبريائه ويقول "حقك عليا"؟ 🕊️',
    emoji: '😂',
    category: 'couples',
    categoryLabel: 'صلح وسلام',
    gradient: 'from-emerald-500 to-green-600',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    questions: [
      {
        id: 'q_c13_1',
        category: 'couples',
        question: 'لما يكون في نقاش حاد ومحدش عارف مين الغلطان، مين بيقول: (خلاص حقك عليا)؟',
        emoji: '🤐',
        options: [
          { id: 'opt_1', text: 'أنا عشان مش طايق أشوفك زعلان أو بعيد', emoji: '🥺' },
          { id: 'opt_2', text: 'أنت عشان بتشتري خاطري وتنهي الحوار بسلام', emoji: '🕊️' },
          { id: 'opt_3', text: 'محدش فينا بيعتذر غير لما يثبت الحق بالأدلة!', emoji: '⚖️' },
          { id: 'opt_4', text: 'بنضحك وننسى الموضوع من غير كلمة اعتذار أصلاً', emoji: '🤣' },
        ],
      },
      {
        id: 'q_c13_2',
        category: 'couples',
        question: 'هل الاعتذار بيننا بيقلل من كرامة حد ولا بيزود غلاوته؟',
        emoji: '💎',
        options: [
          { id: 'opt_1', text: 'بيزود الغلاوة وبيقرب القلوب أكتر بكتير', emoji: '💖' },
          { id: 'opt_2', text: 'مفيش كرامة بين اتنين بيحبوا بعض بجد', emoji: '🤝' },
          { id: 'opt_3', text: 'أهم حاجة طريقة الاعتذار تكون حنينة وصادقة', emoji: '🌸' },
          { id: 'opt_4', text: 'بيحل أكبر المشاكل في دقيقة واحدة', emoji: '🪄' },
        ],
      },
      {
        id: 'q_c13_3',
        category: 'couples',
        question: 'مين عنده كبرياء أعلى شوية وصعب يعترف بغلطه بسهولة؟',
        emoji: '🦁',
        options: [
          { id: 'opt_1', text: 'أنا رأسي ناشفة شوية وبحتاج وقت أهدى', emoji: '🧱' },
          { id: 'opt_2', text: 'أنت كبريائك عالي وبتحتاج تدليل عشان تعترف', emoji: '👑' },
          { id: 'opt_3', text: 'إحنا الاتنين بنعاند في الأول وبعدين بنلين', emoji: '😼' },
          { id: 'opt_4', text: 'مفيش عناد بيننا الحمد لله سلسين مع بعض', emoji: '🌊' },
        ],
      },
    ],
  },

  // 14. تحدي مين بيبدأ الخناق ومين بينهيه؟ 😭
  {
    id: 'ch_c14_fights_starts_ends',
    number: 14,
    title: 'تحدي: مين بيبدأ الخناق ومين بينهيه؟ 😭',
    tagline: 'شرارة المعركة من أين تبدأ وكيف تنطفئ؟ حكاية الخناقات المضحكة بين العشاق! 🥊',
    emoji: '😭',
    category: 'couples',
    categoryLabel: 'خناقات ومعارك',
    gradient: 'from-rose-600 to-red-700',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    questions: [
      {
        id: 'q_c14_1',
        category: 'couples',
        question: 'أغلب خناقاتنا بتبدأ بسبب إيه غالباً؟',
        emoji: '💥',
        options: [
          { id: 'opt_1', text: 'سوء تفاهم في الشات وكتابة الكلام بنبرة غلط', emoji: '📱' },
          { id: 'opt_2', text: 'تأخير في الرد أو عدم تركيز أثناء الكلام', emoji: '⏳' },
          { id: 'opt_3', text: 'غيرة على سبب تافه أو مجرد شك غير مقصود', emoji: '🔥' },
          { id: 'opt_4', text: 'واحد فينا كان جعان أو تعبان وفش غله في التاني!', emoji: '🍔' },
        ],
      },
      {
        id: 'q_c14_2',
        category: 'couples',
        question: 'مين اللي عنده موهبة تضخيم الموضوع وقلبه لقضية رأي عام؟',
        emoji: '📢',
        options: [
          { id: 'opt_1', text: 'أنا بفتكر كل مواقف التاريخ من 3 سنين فاتوا!', emoji: '📚' },
          { id: 'opt_2', text: 'أنت بتعمل دراما وسيناريو كامل في ثواني', emoji: '🎭' },
          { id: 'opt_3', text: 'إحنا الاتنين مبنسيبش تفصيلة إلا وبنحاسب عليها', emoji: '📝' },
          { id: 'opt_4', text: 'بنتخانق 5 دقايق وبنرجع نموت على روحنا من الضحك', emoji: '🤣' },
        ],
      },
      {
        id: 'q_c14_3',
        category: 'couples',
        question: 'مين اللي بينهي الخناقة ويقول: (خلاص بقى فكك وكفاية نكد)؟',
        emoji: '🏳️',
        options: [
          { id: 'opt_1', text: 'أنا بمل بسرعة من النكد وعايز أسمع صوتك فرحان', emoji: '🕊️' },
          { id: 'opt_2', text: 'أنت بحكمتك بتلم الموضوع وتلطف الجو', emoji: '🍃' },
          { id: 'opt_3', text: 'بنبعت ميم مضحك والخناقة بتنتهي تلقائياً', emoji: '🐸' },
          { id: 'opt_4', text: 'لما واحد فينا يقرر ينام ويصحى ناسي كل حاجة', emoji: '🛌' },
        ],
      },
    ],
  },

  // 15. تحدي مين ممكن يسافر عشان التاني؟ ✈️❤️
  {
    id: 'ch_c15_travel_for_other',
    number: 15,
    title: 'تحدي: مين ممكن يسافر عشان التاني؟ ✈️❤️',
    tagline: 'المسافات والبلاد مش عائق لما يكون القلب مربوط بالقلب.. مين يقطع المسافات؟ 🌍',
    emoji: '✈️',
    category: 'situations',
    categoryLabel: 'مواقف ومسافات',
    gradient: 'from-sky-500 via-indigo-500 to-purple-600',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    questions: [
      {
        id: 'q_c15_1',
        category: 'situations',
        question: 'لو كنا في مدينتين أو بلدين مختلفين، مين اللي مستعد يقطع المسافة فجأة عشان يشوف التاني؟',
        emoji: '🚆',
        options: [
          { id: 'opt_1', text: 'أنا مستعد أحجز أول طيارة أو قطار وأجيلك مفاجأة!', emoji: '🎟️' },
          { id: 'opt_2', text: 'أنت مجنون وممكن تعملها فعلاً وتفاجئني', emoji: '🧳' },
          { id: 'opt_3', text: 'إحنا الاتنين هنتقابل في نص الطريق بالظبط', emoji: '📍' },
          { id: 'opt_4', text: 'هنخطط ليها مع بعض ونسافر لأحلى مكان', emoji: '🌴' },
        ],
      },
      {
        id: 'q_c15_2',
        category: 'situations',
        question: 'لو واحد جاله فرصة شغل أو دراسة بعيد، إيه هيكون قرارنا؟',
        emoji: '💼',
        options: [
          { id: 'opt_1', text: 'هسافر معاك ومش هسيبك لوحدك في أي مكان بالكون', emoji: '🫂' },
          { id: 'opt_2', text: 'هدعمك بكل طاقتي وهنفضل على تواصل وحب أقوى', emoji: '💪' },
          { id: 'opt_3', text: 'هنرتب إزاي نتجمع ونبني مستقبلنا سوا بسرعة', emoji: '🏗️' },
          { id: 'opt_4', text: 'مفيش فرصة في الدنيا تسوى بعدنا عن بعض', emoji: '💎' },
        ],
      },
      {
        id: 'q_c15_3',
        category: 'situations',
        question: 'أحلى رحلة بنحلم نعملها مع بعض في المستقبل هتكون فين؟',
        emoji: '🗺️',
        options: [
          { id: 'opt_1', text: 'جزر المالديف والبحر الفيروزي والاسترخاء', emoji: '🏝️' },
          { id: 'opt_2', text: 'باريس أو إيطاليا وعشاء رومانسي وشوارع قديمة', emoji: '🗼' },
          { id: 'opt_3', text: 'أداء عمرة مع بعض وندعي لبعض أمام الكعبة', emoji: '🕋' },
          { id: 'opt_4', text: 'أي مكان في العالم طالما إيدك في إيدي', emoji: '❤️' },
        ],
      },
    ],
  },

  // 16. تحدي مين يفتكر أول خروجة وأول كلمة حب؟ 💭
  {
    id: 'ch_c16_first_date_word',
    number: 16,
    title: 'تحدي: مين يفتكر أول خروجة وأول كلمة حب؟ 💭',
    tagline: 'نبش الذكريات الحلوة.. المكان، اللبس، التوتر، وأول دقة قلب حقيقية! 💓',
    emoji: '💭',
    category: 'secrets',
    categoryLabel: 'ذكريات اللقاء',
    gradient: 'from-amber-500 via-rose-500 to-pink-500',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
    questions: [
      {
        id: 'q_c16_1',
        category: 'secrets',
        question: 'في أول خروجة أو لقاء بيننا، مين فينا كان متوتر وإيديه بترتعش أكتر؟',
        emoji: '🥶',
        options: [
          { id: 'opt_1', text: 'أنا كنت متلخبط وبحاول أظهر واثق وثابت بالعافية!', emoji: '😅' },
          { id: 'opt_2', text: 'أنت وشك كان أحمر ومكنتش عارف تبص في عيني', emoji: '😳' },
          { id: 'opt_3', text: 'إحنا الاتنين كنا بنموت من التوتر ودقات القلب السريعة', emoji: '💓' },
          { id: 'opt_4', text: 'اللقاء كان طبيعي وعفوي كأننا عارفين بعض من سنين', emoji: '🍃' },
        ],
      },
      {
        id: 'q_c16_2',
        category: 'secrets',
        question: 'أول كلمة حب أو تلميح صريح خرج من مين الأول وفين؟',
        emoji: '💌',
        options: [
          { id: 'opt_1', text: 'مني أنا بمصارحة مباشرة بعد ما فاض بيا الشوق', emoji: '🙋‍♀️' },
          { id: 'opt_2', text: 'منك أنت برسالة غيرت مجرى كل شيء', emoji: '🙋‍♂️' },
          { id: 'opt_3', text: 'طلعت عفوية في وسط كلام عادي ووقفت اللحظة عندها', emoji: '⏱️' },
          { id: 'opt_4', text: 'كانت واضحة في النظرات قبل ما تتنطق بالأحرف', emoji: '👀' },
        ],
      },
      {
        id: 'q_c16_3',
        category: 'secrets',
        question: 'لو رجعنا لنفس مكان أول لقاء النهاردة، إيه هيكون إحساسك؟',
        emoji: '🏰',
        options: [
          { id: 'opt_1', text: 'قشعريرة وفرحة لا توصف بإن حبنا كبر وبقى حقيقة', emoji: '✨' },
          { id: 'opt_2', text: 'ضحك متواصل على لبسنا وكلامنا في اليوم ده', emoji: '🤣' },
          { id: 'opt_3', text: 'دموع فرح وامتنان لوجودك في حياتي', emoji: '🥹' },
          { id: 'opt_4', text: 'هنقعد ونسترجع كل كلمة وحرف قولناه ساعتها', emoji: '📖' },
        ],
      },
    ],
  },

  // 17. تحدي اختار بيني وبين… 😈
  {
    id: 'ch_c17_choose_between',
    number: 17,
    title: 'تحدي: اختار بيني وبين… 😈',
    tagline: 'تحدي المقارنات الخطيرة والمحرجة.. هل هتختار حب حياتك ولا أكلك المفضل؟ 🍕💣',
    emoji: '😈',
    category: 'situations',
    categoryLabel: 'مقارنات نارية',
    gradient: 'from-purple-600 to-pink-600',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    questions: [
      {
        id: 'q_c17_1',
        category: 'situations',
        question: 'لو خيروك بيني وبين أكلتك المفضلة وإنت ميت من الجوع؟',
        emoji: '🍔',
        options: [
          { id: 'opt_1', text: 'أنت طبعاً.. الأكل يتعوض وأنت متتعوضش!', emoji: '💖' },
          { id: 'opt_2', text: 'هاكل وأنا باصص في عينك عشان أكسب الاتنين!', emoji: '😋' },
          { id: 'opt_3', text: 'الأكل أول 5 دقائق وبعدين نرجع للحب!', emoji: '😂' },
          { id: 'opt_4', text: 'هقسم الأكل معاك بالنص وناكل سوا', emoji: '🤝' },
        ],
      },
      {
        id: 'q_c17_2',
        category: 'situations',
        question: 'لو خيروك بين خروجة معايا وبين قعدة نوم وراحة ومسلسلك المفضل؟',
        emoji: '🛌',
        options: [
          { id: 'opt_1', text: 'خروجة معاك في أي وقت وفي أي حالة طقس!', emoji: '🏃' },
          { id: 'opt_2', text: 'نتفرج على المسلسل وإحنا قاعدين سوا تحت البطانية', emoji: '🍿' },
          { id: 'opt_3', text: 'لو تعبان جداً هطلب منك تسيبني أنام ساعة وبعدها أجيلك', emoji: '😴' },
          { id: 'opt_4', text: 'معاك حتى النوم بيكون ليه طعم تاني ومختلف', emoji: '✨' },
        ],
      },
      {
        id: 'q_c17_3',
        category: 'situations',
        question: 'لو خيروك بيني وبين أصحابك وسهرة البلايستيشن أو القهوة؟',
        emoji: '🎮',
        options: [
          { id: 'opt_1', text: 'أنت صاحب حياتي ورقم 1 قبل أي حد وأي حاجة', emoji: '👑' },
          { id: 'opt_2', text: 'هوازن بينكم عشان محدش يزعل', emoji: '⚖️' },
          { id: 'opt_3', text: 'هاخدك معايا في السهرة لو ينفع تشاركنا', emoji: '🥳' },
          { id: 'opt_4', text: 'السهرة معاك أحسن من 100 خروجة تانية', emoji: '🌟' },
        ],
      },
    ],
  },

  // 18. تحدي أسئلة صراحة للحبيبين 🔥
  {
    id: 'ch_c18_frankness_questions',
    number: 18,
    title: 'تحدي: أسئلة صراحة للحبيبين 🔥',
    tagline: 'أسئلة الصراحة بدون مجاملات ولا لف ولا دوران.. الحقيقة كاملة على الطاولة! 🪓',
    emoji: '🔥',
    category: 'secrets',
    categoryLabel: 'صراحة مطلقة',
    gradient: 'from-red-600 via-rose-600 to-amber-600',
    badgeColor: 'bg-red-100 text-red-900 border-red-300',
    questions: [
      {
        id: 'q_c18_1',
        category: 'secrets',
        question: 'بكل صراحة، إيه أكتر عادة بعملها وبتعصبك مني من غير ما تقول؟',
        emoji: '🤫',
        options: [
          { id: 'opt_1', text: 'التأخير المستمر وعدم الالتزام بالمواعيد بدقة', emoji: '⏰' },
          { id: 'opt_2', text: 'العناد ومسك الرأي حتى لو كنت مش مقتنع تماماً', emoji: '🧱' },
          { id: 'opt_3', text: 'المبالغة في التفكير والقلق من حاجات لسه محصلتش', emoji: '🤯' },
          { id: 'opt_4', text: 'مفيش حاجة معينة.. بحبك بكل تفاصيلك حتى المزعجة!', emoji: '🥰' },
        ],
      },
      {
        id: 'q_c18_2',
        category: 'secrets',
        question: 'هل في سر أو فكرة مخبيها عليا عشان خايف أزعل؟',
        emoji: '🤐',
        options: [
          { id: 'opt_1', text: 'لا أبداً، كتاب مفتوح قدامك ومفيش أسرار بيننا', emoji: '📖' },
          { id: 'opt_2', text: 'حاجات بسيطة جداً متستاهلش الذكر ولا القلق', emoji: '🍃' },
          { id: 'opt_3', text: 'مفاجأة حلوة بحضرها ومش عايز أحرقها عليك!', emoji: '🎁' },
          { id: 'opt_4', text: 'أحياناً بسكت عشان أعدي الموقف ومكبرش الموضوع', emoji: '🛡️' },
        ],
      },
      {
        id: 'q_c18_3',
        category: 'secrets',
        question: 'لو طلبت منك تقولي عيب واحد فيا لازم أغيره لمصلحتنا، هيكون إيه؟',
        emoji: '🪞',
        options: [
          { id: 'opt_1', text: 'تهدي أعصابك ومتاخدش الأمور على كرامتك أوي', emoji: '🧘' },
          { id: 'opt_2', text: 'تثق في نفسك وقدراتك أكتر لأنك تستاهل الأحسن', emoji: '🌟' },
          { id: 'opt_3', text: 'تفتح قلبك وتعبر عن تعبك ومتحملش كل حاجة لوحدك', emoji: '🤲' },
          { id: 'opt_4', text: 'أنت مثالي في عيوني ومش عايزك تغير ولا شعرة واحدة!', emoji: '💎' },
        ],
      },
    ],
  },

  // 19. تحدي مواقف: هتعمل إيه لو…؟ 👀
  {
    id: 'ch_c19_situations_what_if',
    number: 19,
    title: 'تحدي: مواقف: هتعمل إيه لو…؟ 👀',
    tagline: 'مواقف محرجة، غير متوقعة وغريبة.. ردود أفعالك تحت الاختبار الصعب! 🚨',
    emoji: '👀',
    category: 'situations',
    categoryLabel: 'سيناريوهات ومواقف',
    gradient: 'from-amber-600 to-orange-600',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    questions: [
      {
        id: 'q_c19_1',
        category: 'situations',
        question: 'لو كنا ماشيين في الشارع فجأة ووقعت وقعة كوميدية قدام الناس، هتعمل إيه؟',
        emoji: '🍌',
        options: [
          { id: 'opt_1', text: 'هموت من الضحك الأول وبعدين أساعدك تقوم!', emoji: '🤣' },
          { id: 'opt_2', text: 'هجري عليك بخضة وأطمن إنك سليم ومش موجوع', emoji: '🏃' },
          { id: 'opt_3', text: 'هعمل نفسي مش عارفك لثانيتين عشان الموقف يعدي!', emoji: '🫣' },
          { id: 'opt_4', text: 'هقع جنبك عشان محدش يضحك عليك لوحدك!', emoji: '🦸' },
        ],
      },
      {
        id: 'q_c19_2',
        category: 'situations',
        question: 'لو طبختلك أكلة مخصوص بس طلعت محروقة وطعمها وحش جداً؟',
        emoji: '🍳',
        options: [
          { id: 'opt_1', text: 'هاكلها وأشكرك وأقولك دي أحلى أكلة عشان من إيدك!', emoji: '😋' },
          { id: 'opt_2', text: 'هنضحك ونطلب دليفري ونسيب الأكلة للذكرى', emoji: '🍕' },
          { id: 'opt_3', text: 'هقولك الحقيقة بدلع وأعلمك تعملها إزاي صح', emoji: '👨‍🍳' },
          { id: 'opt_4', text: 'هقدر تعبك ونيتك الحلوة قبل أي طعم', emoji: '💖' },
        ],
      },
      {
        id: 'q_c19_3',
        category: 'situations',
        question: 'لو نسيت عيد ميلادك أو يوم مهم جداً بيننا بالغلط؟',
        emoji: '🎂',
        options: [
          { id: 'opt_1', text: 'هتقمص وأعملك مناحة صامتة تندمك على اليوم!', emoji: '😭' },
          { id: 'opt_2', text: 'هفكرك بذكاء وأقول: (مش ناسي حاجة يا قمر؟)', emoji: '😉' },
          { id: 'opt_3', text: 'هسامحك لو اعتذرت وجبت هدية تعوض النسيان فوراً', emoji: '🎁' },
          { id: 'opt_4', text: 'مستحيل أنسى مناسبة تخصك أصلاً عشان يحصل ده!', emoji: '🙅' },
        ],
      },
    ],
  },

  // 20. تحدي مين يعرف أسرار التاني أكتر؟ 🤫
  {
    id: 'ch_c20_knows_secrets',
    number: 20,
    title: 'تحدي: مين يعرف أسرار التاني أكتر؟ 🤫',
    tagline: 'الصندوق الأسود لعلاقتنا.. مين البير الغويط اللي حافظ كل أسرار الطرف التاني؟ 🗝️',
    emoji: '🤫',
    category: 'secrets',
    categoryLabel: 'أسرار وغموض',
    gradient: 'from-slate-700 via-purple-900 to-indigo-900',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    questions: [
      {
        id: 'q_c20_1',
        category: 'secrets',
        question: 'مين فينا بيحكي للتاني أسرار طفولته ومشاكله العائلية بدون أي حرج؟',
        emoji: '👶',
        options: [
          { id: 'opt_1', text: 'أنا بحكيلك كل حاجة من أول ما وعيت على الدنيا', emoji: '🗣️' },
          { id: 'opt_2', text: 'أنت بتثق فيا وبتقولي كل اللي جوه قلبك', emoji: '🗝️' },
          { id: 'opt_3', text: 'إحنا الاتنين بيران غويطة لبعض مفيش حواجز بيننا', emoji: '🕳️' },
          { id: 'opt_4', text: 'في حاجات لسه بنكتشفها مع الوقت بالتدريج', emoji: '⏳' },
        ],
      },
      {
        id: 'q_c20_2',
        category: 'secrets',
        question: 'هل في سر عندك مفيش مخلوق في الكوكب يعرفه غيري أنا وبس؟',
        emoji: '🔒',
        options: [
          { id: 'opt_1', text: 'أيوة طبعاً، أنت الشخص الوحيد الآمن على أسراري', emoji: '🛡️' },
          { id: 'opt_2', text: 'أكتر من سر وكتير جداً محدش يعرفهم غيرك', emoji: '📚' },
          { id: 'opt_3', text: 'أنا حياتي واضحة عموماً بس خصوصياتي معاك أنت', emoji: '🌟' },
          { id: 'opt_4', text: 'لو كشفت سري لحد هيكون أنت وبدون تردد', emoji: '🤝' },
        ],
      },
      {
        id: 'q_c20_3',
        category: 'secrets',
        question: 'لو حد حاول يوقع بيننا أو يستدرج أسرارنا، إيه رد فعلك؟',
        emoji: '💣',
        options: [
          { id: 'opt_1', text: 'هسد الباب في وشه وأدافع عنك بدمي!', emoji: '🛡️' },
          { id: 'opt_2', text: 'هاجي أقولك فوراً وأحكيلك كل اللي اتقال', emoji: '💬' },
          { id: 'opt_3', text: 'محدش يقدر يهز ثقتنا في بعض مهما عمل', emoji: '🏰' },
          { id: 'opt_4', text: 'أسرارنا خط أحمر مقفول عليه بألف قفل', emoji: '🗝️' },
        ],
      },
    ],
  },

  // 21. تحدي أول انطباع عن بعض 😍
  {
    id: 'ch_c21_first_impression',
    number: 21,
    title: 'تحدي: أول انطباع عن بعض 😍',
    tagline: 'أول ما شوفتك قولت إيه في سري؟ انطباع الصدمة ولا الإعجاب ولا التناكة؟ 😂',
    emoji: '😍',
    category: 'secrets',
    categoryLabel: 'انطباعات وذكريات',
    gradient: 'from-pink-500 via-rose-500 to-yellow-500',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    questions: [
      {
        id: 'q_c21_1',
        category: 'secrets',
        question: 'أول فكرة خطرت في بالي أول ما اتعرفت عليك كانت إيه؟',
        emoji: '💡',
        options: [
          { id: 'opt_1', text: '(يا لهوي إيه الجمال واللطافة دي كلها؟!)', emoji: '😍' },
          { id: 'opt_2', text: '(شكله شخص تقيل ورخم ومغرور شوية بس جذاب)', emoji: '😎' },
          { id: 'opt_3', text: '(حسيت براحة غريبة كأني أعرفك من زمان أوي)', emoji: '🕊️' },
          { id: 'opt_4', text: '(عادي ومكنتش متخيل إننا هنكون مع بعض أصلاً!)', emoji: '🙃' },
        ],
      },
      {
        id: 'q_c21_2',
        category: 'secrets',
        question: 'هل انطباعك الأول عني طلع صح ولا اتغير 180 درجة بعد ما قربنا؟',
        emoji: '🔄',
        options: [
          { id: 'opt_1', text: 'اتغير تماماً واكتشفت شخص أحن وأجمل بكتير', emoji: '💖' },
          { id: 'opt_2', text: 'طلع صح بنسبة 100% وإحساسي مبيخيبش أبداً', emoji: '🎯' },
          { id: 'opt_3', text: 'اتصدمت في كمية الجنان والضحك اللي مخبيه!', emoji: '🤪' },
          { id: 'opt_4', text: 'كل يوم بكتشف فيك ميزة جديدة بتخليني أحبك أكتر', emoji: '🌟' },
        ],
      },
      {
        id: 'q_c21_3',
        category: 'secrets',
        question: 'إيه أكتر حاجة شدت انتباهي فيك من أول لقاء؟',
        emoji: '👀',
        options: [
          { id: 'opt_1', text: 'ضحكتك وطريقة كلامك العفوية والمريحة', emoji: '😄' },
          { id: 'opt_2', text: 'عيونك ونظرتك اللي خطفت قلبي في ثانية', emoji: '👁️' },
          { id: 'opt_3', text: 'أناقتك وشياكتك وطريقتك في اللبس', emoji: '👔' },
          { id: 'opt_4', text: 'شخصيتك القوية وحضورك الطاغي في المكان', emoji: '👑' },
        ],
      },
    ],
  },

  // 22. تحدي أكتر حاجة بتحبها فيا ❤️
  {
    id: 'ch_c22_what_you_love_most',
    number: 22,
    title: 'تحدي: أكتر حاجة بتحبها فيا ❤️',
    tagline: 'الميزة الساحرة اللي خلت القلب يدوب ويختارك أنت من بين كل الناس! 💎✨',
    emoji: '❤️',
    category: 'romance',
    categoryLabel: 'مميزات وعشق',
    gradient: 'from-rose-500 to-red-600',
    badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
    questions: [
      {
        id: 'q_c22_1',
        category: 'romance',
        question: 'لو هتختار صفة واحدة بتميزني عن كل الناس، هتكون إيه؟',
        emoji: '🌟',
        options: [
          { id: 'opt_1', text: 'الحنية الزايدة والقلب الأبيض اللي ميعرفش يكره', emoji: '🕊️' },
          { id: 'opt_2', text: 'الوفاء والجدعنة وإنك دايماً في ضهري', emoji: '🛡️' },
          { id: 'opt_3', text: 'خفة دمك وضحكتك اللي بتنسيني أي هم', emoji: '😂' },
          { id: 'opt_4', text: 'ذكائك وطموحك وإصرارك على النجاح', emoji: '🔥' },
        ],
      },
      {
        id: 'q_c22_2',
        category: 'romance',
        question: 'إيه أكتر حركة بعملها عفوية بتخليك تبتسم وتبصلي بحب؟',
        emoji: '🥰',
        options: [
          { id: 'opt_1', text: 'لما أركز في حاجة وأسرح وأنا ماسك إيدك', emoji: '🤝' },
          { id: 'opt_2', text: 'لما أفرح زي الأطفال بحاجة صغيرة جبتها ليا', emoji: '🎈' },
          { id: 'opt_3', text: 'لما تقولي: (خلي بالك من نفسك ومتتأخرش)', emoji: '🥺' },
          { id: 'opt_4', text: 'نظرة الامتنان والدفء اللي بشوفها في عيونك', emoji: '👁️' },
        ],
      },
      {
        id: 'q_c22_3',
        category: 'romance',
        question: 'لو سألوك: (ليه اخترته هو بالذات؟)، إجابتك الصادقة هتكون إيه؟',
        emoji: '🎯',
        options: [
          { id: 'opt_1', text: 'لأني معاه بحس إني على طبيعتي ومش محتاج أتصنع أبداً', emoji: '🌿' },
          { id: 'opt_2', text: 'لأنه الأمان الوحيد اللي لاقيته في دنيا صعبة', emoji: '🏰' },
          { id: 'opt_3', text: 'لأن قلبي ارتاحله من أول نظرة ومقدرتش أقاوم', emoji: '💘' },
          { id: 'opt_4', text: 'لأنه عوض ربنا الجميل عن كل حاجة وحشة مرت بيا', emoji: '🤲' },
        ],
      },
    ],
  },

  // 23. تحدي أكتر حاجة بتضايقك فيا 😂
  {
    id: 'ch_c23_what_annoys_most',
    number: 23,
    title: 'تحدي: أكتر حاجة بتضايقك فيا 😂',
    tagline: 'العادة المستفزة اللي بتخليك تشد في شعرك بس لسه بتحبني رغم كل شيء! 🪚',
    emoji: '😂',
    category: 'couples',
    categoryLabel: 'مواقف مستفزة',
    gradient: 'from-amber-500 to-rose-600',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
    questions: [
      {
        id: 'q_c23_1',
        category: 'couples',
        question: 'إيه أكتر حركة بتعملها بتخليني عايز أخنقك بهزار؟',
        emoji: '🙃',
        options: [
          { id: 'opt_1', text: 'البرود المفاجئ لما أكون محروق دمي وبحكي بحماس', emoji: '🧊' },
          { id: 'opt_2', text: 'التردد في اتخاذ قرارات الأكل والخروج: (أي حاجة)!', emoji: '🤷' },
          { id: 'opt_3', text: 'مسك الموبايل وإنت سامع نص كلامي بس!', emoji: '📱' },
          { id: 'opt_4', text: 'الزن والأسئلة الكتير ورا بعض بدون فواصل', emoji: '🐝' },
        ],
      },
      {
        id: 'q_c23_2',
        category: 'couples',
        question: 'مين اللي بينسى حاجته ومفاتيحه وموبايله في كل حتة؟',
        emoji: '🔑',
        options: [
          { id: 'opt_1', text: 'أنا بضيع كل حاجة وأنت بتلم ورايا!', emoji: '🤦' },
          { id: 'opt_2', text: 'أنت الذاكرة المخرومة الرسمية للبيت', emoji: '🕳️' },
          { id: 'opt_3', text: 'إحنا الاتنين محتاجين أجهزة تتبع لأغراضنا', emoji: '📍' },
          { id: 'opt_4', text: 'منظمين جداً ومبننساش حاجة الحمد لله', emoji: '📁' },
        ],
      },
      {
        id: 'q_c23_3',
        category: 'couples',
        question: 'هل عيوبي دي بتخليك تفكر تفركش ولا بتضحكك وتخليك تحبني أكتر؟',
        emoji: '💖',
        options: [
          { id: 'opt_1', text: 'بتخليني أحبك أكتر لأنها جزء من شخصيتك اللذيذة', emoji: '🥰' },
          { id: 'opt_2', text: 'أوقات بتعصبني بس بنسى وأرجع أضحك معاك', emoji: '😄' },
          { id: 'opt_3', text: 'مفيش فركشة في قاموسنا.. ملزومين ببعض للأبد!', emoji: '🔒' },
          { id: 'opt_4', text: 'عيوبك أهون بكتير من إني أعيش يوم واحد من غيرك', emoji: '🥺' },
        ],
      },
    ],
  },

  // 24. تحدي لو رجعنا لأول يوم هتحبني تاني؟ 🥹
  {
    id: 'ch_c24_first_day_again',
    number: 24,
    title: 'تحدي: لو رجعنا لأول يوم هتحبني تاني؟ 🥹',
    tagline: 'لو رجع بينا شريط الزمن لنقطة الصفر.. هل هتختار نفس الشخص بنفس الجنون؟ ⏳❤️',
    emoji: '🥹',
    category: 'romance',
    categoryLabel: 'زمن واختيار',
    gradient: 'from-pink-600 via-purple-600 to-indigo-600',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    questions: [
      {
        id: 'q_c24_1',
        category: 'romance',
        question: 'لو عاد الزمن لأول يوم اتقابلنا فيه، هتعمل إيه؟',
        emoji: '⏪',
        options: [
          { id: 'opt_1', text: 'هحبك أسرع وبدل ما أضيع وقت هقرب منك في نفس اللحظة!', emoji: '🏃' },
          { id: 'opt_2', text: 'هكرر نفس كل تفصيلة عشاناها بكل حلاوتها وتعبها', emoji: '🎞️' },
          { id: 'opt_3', text: 'هتجنب الخناقات التافهة اللي زعلتنا في النص', emoji: '🕊️' },
          { id: 'opt_4', text: 'هشكر ربنا ألف مرة على اللحظة اللي جمعتنا', emoji: '🤲' },
        ],
      },
      {
        id: 'q_c24_2',
        category: 'romance',
        question: 'لو اتعرضت عليا كل شخصيات العالم تختار منهم شريك، هتختار مين؟',
        emoji: '🌍',
        options: [
          { id: 'opt_1', text: 'أنت ومفيش حد تاني ممكن يملى عينك ولا قلبك', emoji: '👑' },
          { id: 'opt_2', text: 'أنت في كل زمن ومكان وبكل الظروف', emoji: '💎' },
          { id: 'opt_3', text: 'الاختيار كان وسيفضل أنت دائماً وأبداً', emoji: '🔒' },
          { id: 'opt_4', text: 'مستحيل أتخيل روحي مع غيرك أصلاً', emoji: '♾️' },
        ],
      },
      {
        id: 'q_c24_3',
        category: 'romance',
        question: 'هل تتوقع إن حبنا هيصمد ويكبر مع السنين لما نكبر ونعجز سوا؟',
        emoji: '👵🧓',
        options: [
          { id: 'opt_1', text: 'هنعجز وإحنا ماسكين إيد بعض وبنضحك على خناقات زمان', emoji: '🥰' },
          { id: 'opt_2', text: 'الحب الحقيقي مبيشيبش ولا بينتهي بالزمن', emoji: '🌟' },
          { id: 'opt_3', text: 'هنكون أحلى كابل عجايز كيوت في المنطقة!', emoji: '👴' },
          { id: 'opt_4', text: 'مادام بنراعي ربنا وبنحب بصدق حبنا أبدي', emoji: '🤲' },
        ],
      },
    ],
  },

  // 25. تحدي احكيلي عن أكتر لحظة حسيت فيها إنك بتحبني 💕
  {
    id: 'ch_c25_moment_felt_love',
    number: 25,
    title: 'تحدي: احكيلي عن أكتر لحظة حسيت فيها إنك بتحبني 💕',
    tagline: 'اللحظة الفارقة اللي اتفتحت فيها بوابات القلب وعرفت إن ده الشخص الصح! 💫',
    emoji: '💕',
    category: 'romance',
    categoryLabel: 'لحظات لا تنسى',
    gradient: 'from-rose-500 via-pink-500 to-amber-500',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    questions: [
      {
        id: 'q_c25_1',
        category: 'romance',
        question: 'إيه اللحظة اللي حسيت فيها إن خلاص مفيش مفر وإنك واقع في حبي تماماً؟',
        emoji: '💘',
        options: [
          { id: 'opt_1', text: 'لما لاقيتني جنبك وساندك في موقف صعب كل الناس سابتك فيه', emoji: '🛡️' },
          { id: 'opt_2', text: 'لما ضحكنا ضحك هستيري على حاجة تافهة وفهمنا بعض بدون كلام', emoji: '🤣' },
          { id: 'opt_3', text: 'لما شوفت لهفتك وخوفك عليا وأنا تعبان', emoji: '🥺' },
          { id: 'opt_4', text: 'أول مرة حسيت فيها بالأمان والسكينة وإحنا سوا', emoji: '🕊️' },
        ],
      },
      {
        id: 'q_c25_2',
        category: 'romance',
        question: 'لو وصفت حبنا في كلمة واحدة عميقة، إيه أول كلمة تطلع؟',
        emoji: '✍️',
        options: [
          { id: 'opt_1', text: 'الأمان والبيت والوطن', emoji: '🏡' },
          { id: 'opt_2', text: 'العوض والنعمة الجميلة', emoji: '🤲' },
          { id: 'opt_3', text: 'الروح الواحدة في جسدين', emoji: '♾️' },
          { id: 'opt_4', text: 'السند والكتف الثابت', emoji: '🤝' },
        ],
      },
      {
        id: 'q_c25_3',
        category: 'romance',
        question: 'هل اللحظات الحلوة بيننا قادرة تمحي أي زعل وتعب مرينا بيه؟',
        emoji: '🌈',
        options: [
          { id: 'opt_1', text: 'بتمحي أي زعل في ثواني معدودة وبتبني أمل جديد', emoji: '✨' },
          { id: 'opt_2', text: 'رصيد الحب بيننا كبير جداً ومبيخلصش أبداً', emoji: '🏦' },
          { id: 'opt_3', text: 'كل لحظة صعبة بتخلينا نقدر اللحظات الحلوة أكتر', emoji: '💎' },
          { id: 'opt_4', text: 'حبنا أقوى من أي ظرف وأي اختبار', emoji: '🦁' },
        ],
      },
    ],
  },

  // 26. تحدي مين أحن على التاني؟ 🫂
  {
    id: 'ch_c26_more_tender',
    number: 26,
    title: 'تحدي: مين أحن على التاني؟ 🫂',
    tagline: 'الحنية طوق نجاة في كل علاقة.. مين صاحب القلب الطيب واليد اللي بتطبطب؟ 🕊️',
    emoji: '🫂',
    category: 'couples',
    categoryLabel: 'حنية وطيبة',
    gradient: 'from-teal-500 via-emerald-500 to-green-600',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    questions: [
      {
        id: 'q_c26_1',
        category: 'couples',
        question: 'مين اللي لما التاني يكون زعلان، بيطبطب عليه وياخده في حضنه بكل حنان؟',
        emoji: '🫂',
        options: [
          { id: 'opt_1', text: 'أنا قلبي مبيستحملش أشوف دمعة في عينك أو ضيق في صدرك', emoji: '🥺' },
          { id: 'opt_2', text: 'أنت بحنيتك وكلماتك الدافية بتداوي كل جروح يومي', emoji: '🍯' },
          { id: 'opt_3', text: 'إحنا لبعض بلسم وطاقة حنية لا تنتهي', emoji: '🌸' },
          { id: 'opt_4', text: 'اللي بيكون عنده طاقة هو اللي بيشيل التاني ويسنده', emoji: '🤝' },
        ],
      },
      {
        id: 'q_c26_2',
        category: 'couples',
        question: 'مين فينا بيخاف على صحة وأكل ونوم التاني أكتر؟',
        emoji: '🍲',
        options: [
          { id: 'opt_1', text: 'أنا بعمل دور الدكتور والأم والأب في نفس الوقت!', emoji: '🩺' },
          { id: 'opt_2', text: 'أنت بتسأل: (كلت؟ نمت كويس؟ شربت ماية؟) طول اليوم', emoji: '💧' },
          { id: 'opt_3', text: 'بنتسابق في الاهتمام بكل تفصيلة صحية لبعض', emoji: '🏃' },
          { id: 'opt_4', text: 'بنهتم لما حد يتعب بس في العادي بننسى نفسنا', emoji: '😅' },
        ],
      },
      {
        id: 'q_c26_3',
        category: 'couples',
        question: 'هل الحنية هي أهم صفة بتخلي علاقتنا مريحة وناجحة؟',
        emoji: '🌿',
        options: [
          { id: 'opt_1', text: 'أهم صفة بلا منازع.. الحنية بتعوض أي نقص تاني', emoji: '💯' },
          { id: 'opt_2', text: 'الحنية مع الاحترام هما أساس بيتنا وحياتنا', emoji: '🏛️' },
          { id: 'opt_3', text: 'من غير حنية الحب بيموت وبيبقى قاسي', emoji: '🥀' },
          { id: 'opt_4', text: 'حنيتك هي أكتر حاجة مخلتني متمسك بيك للنهاية', emoji: '🔒' },
        ],
      },
    ],
  },

  // 27. تحدي مين بيحتاج التاني أكتر؟ 🥺
  {
    id: 'ch_c27_needs_other_more',
    number: 27,
    title: 'تحدي: مين بيحتاج التاني أكتر؟ 🥺',
    tagline: 'الاحتياج العاطفي والروحي.. مين اللي ميعرفش يمشي خطوة في الدنيا بدون استشارة التاني؟ 🧭',
    emoji: '🥺',
    category: 'romance',
    categoryLabel: 'احتياج وسند',
    gradient: 'from-purple-600 to-indigo-700',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
    questions: [
      {
        id: 'q_c27_1',
        category: 'romance',
        question: 'مين اللي بياخد رأي التاني في كل قراراته ولبسه وشغله وأصحابه؟',
        emoji: '🤔',
        options: [
          { id: 'opt_1', text: 'أنا لازم أرجعلك في كل خطوة ومبتحركش من غير شورك', emoji: '🙋‍♀️' },
          { id: 'opt_2', text: 'أنت بتثق في رأيي وبتستشيرني في كل صغيرة وكبيرة', emoji: '🙋‍♂️' },
          { id: 'opt_3', text: 'قراراتنا كلها مشتركة وبنتفق عليها سوا بعد نقاش', emoji: '🤝' },
          { id: 'opt_4', text: 'كل واحد مستقل بس بنحب نسمع وجهة نظر التاني', emoji: '🗣️' },
        ],
      },
      {
        id: 'q_c27_2',
        category: 'romance',
        question: 'لما الدنيا تضيق عليك، أول شخص بتجري عليه وترمي همومك عنده مين؟',
        emoji: '🏃',
        options: [
          { id: 'opt_1', text: 'أنت وبلا تردد، ملكيش غيرك في الدنيا ملجأ', emoji: '🏡' },
          { id: 'opt_2', text: 'أنت بتيجي تحكيلي وتفضفض لحد ما ترتاح وتضحك', emoji: '🫂' },
          { id: 'opt_3', text: 'بنسند بعض ومحدش فينا بيشيل حمله لوحده', emoji: '💪' },
          { id: 'opt_4', text: 'وجودك بس كفاية يهون أي وجع مهما كان صعب', emoji: '🕊️' },
        ],
      },
      {
        id: 'q_c27_3',
        category: 'romance',
        question: 'هل تشوف إن احتياجنا لبعض ضعف ولا قمة القوة في الحب؟',
        emoji: '💎',
        options: [
          { id: 'opt_1', text: 'قمة القوة والأمان.. مفيش أجمل من إنك تحتاج اللي بيحبك بجد', emoji: '🌟' },
          { id: 'opt_2', text: 'احتياج لطيف ومتبادل مفيش فيه أي استغلال', emoji: '💗' },
          { id: 'opt_3', text: 'بيخلينا نكمل بعض ونبقى أقوى قدام العالم كله', emoji: '🛡️' },
          { id: 'opt_4', text: 'أنت نقطة ضعفي وقوتي في نفس اللحظة!', emoji: '⚡' },
        ],
      },
    ],
  },

  // 28. تحدي مين ممكن يضحي أكتر عشان العلاقة؟ ❤️
  {
    id: 'ch_c28_sacrifice_more',
    number: 28,
    title: 'تحدي: مين ممكن يضحي أكتر عشان العلاقة؟ ❤️',
    tagline: 'وقت الجد والظروف الصعبة.. مين مستعد يضحي براحته ووقته وفلوسه عشان التاني؟ 🛡️',
    emoji: '❤️',
    category: 'situations',
    categoryLabel: 'تضحية وإخلاص',
    gradient: 'from-rose-600 via-red-600 to-amber-700',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    questions: [
      {
        id: 'q_c28_1',
        category: 'situations',
        question: 'لو مرينا بظروف مادية أو أسرية معقدة جداً، مين اللي هيتحمل ويصبر للآخر؟',
        emoji: '🧗',
        options: [
          { id: 'opt_1', text: 'أنا مستعد أصبر على الحلوة والمرة ومش هسيب إيدك أبداً', emoji: '🤝' },
          { id: 'opt_2', text: 'أنت جدع وأصيل وهتثبت في المواقف الصعبة كعادتك', emoji: '🦁' },
          { id: 'opt_3', text: 'إحنا الاتنين هنعدي الأزمة بفضل الله وبحبنا الصادق', emoji: '🤲' },
          { id: 'opt_4', text: 'حبنا اتخلق عشان يقهر الظروف مش الظروف تقهره', emoji: '🔥' },
        ],
      },
      {
        id: 'q_c28_2',
        category: 'situations',
        question: 'إيه أكبر تضحية قدمتها أنت أو التاني لعلاقتنا لحد دلوقتي؟',
        emoji: '🎁',
        options: [
          { id: 'opt_1', text: 'الصبر والتحمل والوقوف قدام أي معارضة أو صعوبات', emoji: '🛡️' },
          { id: 'opt_2', text: 'التنازل عن رغبات شخصية في سبيل استقرار العلاقة', emoji: '⚖️' },
          { id: 'opt_3', text: 'إعطاء وقت واهتمام كامل رغم ضغوط الحياة والشغل', emoji: '⏰' },
          { id: 'opt_4', text: 'التضحية بيننا متعتبرش تضحية بل واجب نابع من العشق', emoji: '👑' },
        ],
      },
      {
        id: 'q_c28_3',
        category: 'situations',
        question: 'هل واثق إن الطرف التاني مش هيخذلك لو طلبت منه مساعدة مصيرية؟',
        emoji: '🎯',
        options: [
          { id: 'opt_1', text: 'واثق بنسبة مليون في المية وعيني مغمضة!', emoji: '💯' },
          { id: 'opt_2', text: 'عارف إنه هيبذل أقصى ما عنده حتى لو مش بإيده', emoji: '🤲' },
          { id: 'opt_3', text: 'التجارب اللي عشناها أثبتتلي ده أكتر من مرة', emoji: '💎' },
          { id: 'opt_4', text: 'هو سندي الوحيد بعد ربنا في الدنيا دي', emoji: '🏰' },
        ],
      },
    ],
  },

  // 29. تحدي توقع إجابة شريكك 🔮
  {
    id: 'ch_c29_predict_partner_answer',
    number: 29,
    title: 'تحدي: توقع إجابة شريكك 🔮',
    tagline: 'التحدي الكاشف لعقول المحبين.. هتعرف شريكك هيختار إيه قبل ما يجاوب؟ 🧠⚡',
    emoji: '🔮',
    category: 'secrets',
    categoryLabel: 'توقع وقراءة أفكار',
    gradient: 'from-violet-600 via-purple-600 to-pink-500',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-200',
    questions: [
      {
        id: 'q_c29_1',
        category: 'secrets',
        question: 'لو خيرت شريكك بين: (الهدوء في البيت) أو (مغامرة وسفر فوري)، هيختار إيه؟',
        emoji: '🎲',
        options: [
          { id: 'opt_1', text: 'الهدوء والراحة في البيت مع أكل لذيذ ومسلسل', emoji: '🛋️' },
          { id: 'opt_2', text: 'السفر والمغامرة وتجربة كل جديد ومجنون!', emoji: '✈️' },
          { id: 'opt_3', text: 'حسب مزاجه وتعب الشغل في اليوم ده بالذات', emoji: '⚖️' },
          { id: 'opt_4', text: 'المهم نكون مع بعض ومبيفرقش المكان معاه أصلاً', emoji: '❤️' },
        ],
      },
      {
        id: 'q_c29_2',
        category: 'secrets',
        question: 'شريكك لما بيتضايق من حاجة في شغله، بيفضل إيه منك؟',
        emoji: '🤯',
        options: [
          { id: 'opt_1', text: 'تسمعه وتهديه وتطبطب عليه بدون ما تقدم حلول معقدة', emoji: '👂' },
          { id: 'opt_2', text: 'تسيبه نص ساعة يهدى مع نفسه وبعدين يرجع يحكي براحته', emoji: '🤫' },
          { id: 'opt_3', text: 'تشتت انتباهه بموضوع يضحك وأكلة بيحبها', emoji: '🍔' },
          { id: 'opt_4', text: 'تحلل معاه المشكلة وتقدم حلول منطقية وسريعة', emoji: '💡' },
        ],
      },
      {
        id: 'q_c29_3',
        category: 'secrets',
        question: 'إيه أكتر صفة شريكك فخور بيها فيك وبيحكي عنها قدام الناس؟',
        emoji: '🦚',
        options: [
          { id: 'opt_1', text: 'جمالك وأناقتك وشياكتك اللي ملهاش مثيل', emoji: '✨' },
          { id: 'opt_2', text: 'جدعنتك وأصلك الطيب وطيبتك اللي بتساع الكل', emoji: '🕊️' },
          { id: 'opt_3', text: 'نجاحك وذكائك وطموحك العالي في حياتك', emoji: '🎓' },
          { id: 'opt_4', text: 'حبك الكبير ليه واهتمامك اللي محليه في عيون الكل', emoji: '👑' },
        ],
      },
    ],
  },

  // 30. تحدي هل تعرف لغة حب شريكك؟ 💗
  {
    id: 'ch_c30_love_language',
    number: 30,
    title: 'تحدي: هل تعرف لغة حب شريكك؟ 💗',
    tagline: 'لغات الحب الخمس الشهيرة: كلام حلو، هدايا، وقت ممتع، مساعدة، ولا تلامس؟ 🗝️',
    emoji: '💗',
    category: 'romance',
    categoryLabel: 'لغات الحب',
    gradient: 'from-pink-500 via-rose-500 to-purple-600',
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    questions: [
      {
        id: 'q_c30_1',
        category: 'romance',
        question: 'إيه لغة الحب الأساسية اللي بتخلي قلب شريكك يطير من الفرحة؟',
        emoji: '🗝️',
        options: [
          { id: 'opt_1', text: 'كلمات التشجيع والغزل الصادق: (أنت جميل/فخور بيك)', emoji: '📜' },
          { id: 'opt_2', text: 'قضاء وقت خاص مع بعض بدون موبايلات ومشتتات', emoji: '⏳' },
          { id: 'opt_3', text: 'الهدايا والمفاجآت الرمزية اللي بتعبر عن التفكير فيه', emoji: '🎁' },
          { id: 'opt_4', text: 'المساعدة في المهام اليومية وتخفيف الضغوط عنه', emoji: '🛠️' },
        ],
      },
      {
        id: 'q_c30_2',
        category: 'romance',
        question: 'لما شريكك بيحب يبينلك إنه بيحبك، بيعمل إيه تلقائياً؟',
        emoji: '💖',
        options: [
          { id: 'opt_1', text: 'بيغرقك رسايل وكلام مدح ودلع طول اليوم', emoji: '💬' },
          { id: 'opt_2', text: 'بيفاجئك بحاجة كان نفسك فيها أو بأكل بتحبه', emoji: '🍫' },
          { id: 'opt_3', text: 'بيفضي وقته مخصوص عشان يقعد معاك ويسمعك', emoji: '☕' },
          { id: 'opt_4', text: 'بيساعدك في كل مشاكلك ويقف جنبك لحد ما تخلص', emoji: '🦸' },
        ],
      },
      {
        id: 'q_c30_3',
        category: 'romance',
        question: 'هل أنتم متوافقين في لغات الحب وبتعرفوا تفرحوا بعض صح؟',
        emoji: '🎯',
        options: [
          { id: 'opt_1', text: 'متوافقين جداً وفاهمين مفاتيح قلوب بعض تماماً', emoji: '🗝️' },
          { id: 'opt_2', text: 'بنتعلم كل يوم لغة التاني وبنحاول نرضيه بطريقته', emoji: '🌱' },
          { id: 'opt_3', text: 'لغاتنا مختلفة شوية بس الحب المشترك بيعوض كل حاجة', emoji: '🎨' },
          { id: 'opt_4', text: 'الحب بيننا فطري وسهل ومبيحتاجش كتالوج ولا قواعد!', emoji: '👑' },
        ],
      },
    ],
  },
];

export function getCoupleChallengeById(id: string): CoupleChallengeTemplate | undefined {
  return COUPLE_CHALLENGES.find((ch) => ch.id === id);
}
