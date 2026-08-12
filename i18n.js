(() => {
  const STORAGE_KEY = 'portfolio-language';
  const arabic = {
    'Skip to content': 'تجاوز إلى المحتوى',
    'Skip to projects': 'تجاوز إلى المشاريع',
    'Skip to certificates': 'تجاوز إلى الشهادات',
    'Skip to project gallery': 'تجاوز إلى معرض المشروع',
    'Architectural BIM Engineer': 'مهندس نمذجة معلومات مبانٍ معماري',
    'About': 'نبذة', 'Projects': 'المشاريع', 'Expertise': 'الخبرات', 'Experience': 'الخبرة', 'Certificates': 'الشهادات',
    'Start a conversation': 'ابدأ محادثة', 'Contact': 'تواصل', 'Portfolio': 'الملف المهني', 'All projects': 'جميع المشاريع',
    'Available for selected opportunities': 'متاح للفرص المهنية المختارة',
    'Building clarity': 'نبني الوضوح', 'into': 'وسط', 'complexity.': 'التعقيد.',
    'I’m Ahmed Alamer, an Architectural BIM Engineer turning design intent into coordinated, buildable information—from concept and code analysis to IFC, shop drawings, and as-built delivery.': 'أنا أحمد العامر، مهندس نمذجة معلومات مبانٍ معماري، أحوّل الفكرة التصميمية إلى معلومات منسقة وقابلة للتنفيذ، بدءًا من المفهوم وتحليل الأكواد وصولًا إلى مخططات IFC والمخططات التنفيذية ونماذج ما بعد التنفيذ.',
    'View project galleries': 'استعرض المشاريع', 'View CV': 'عرض السيرة الذاتية',
    'Integrated project delivery': 'التسليم المتكامل للمشروعات', 'Architecture': 'العمارة', 'Structure': 'الإنشاء', 'Fire & Life Safety': 'الحريق وسلامة الأرواح',
    'Years across architecture, MEP & BIM': 'سنوات في العمارة والأنظمة وBIM', 'From concept through as-built': 'من الفكرة إلى نموذج ما بعد التنفيذ', 'Code-led design and compliance': 'تصميم وامتثال قائم على الكود',
    '01 / About': '01 / نبذة', 'Architecture meets': 'تلتقي العمارة', 'information.': 'بالمعلومات.',
    'I work at the point where design quality, digital coordination, and construction reality meet.': 'أعمل عند نقطة التقاء جودة التصميم والتنسيق الرقمي وواقع التنفيذ.',
    'Based in Al-Khobar, Saudi Arabia, I bring an interdisciplinary perspective shaped by architectural design, MEP systems, structural modeling, and project delivery. That breadth helps me see dependencies early, communicate clearly, and keep the model useful to every team around it.': 'أعمل من مدينة الخبر في المملكة العربية السعودية، وأمتلك منظورًا متعدد التخصصات تشكّل من خلال التصميم المعماري وأنظمة MEP والنمذجة الإنشائية وتسليم المشروعات. يتيح لي هذا التنوع اكتشاف الترابطات مبكرًا والتواصل بوضوح والحفاظ على فاعلية النموذج لجميع فرق المشروع.',
    'Discuss a project': 'ناقش مشروعًا', 'Education': 'التعليم', 'Core toolkit': 'الأدوات الأساسية',
    'Bachelor of Building Science Technology Engineering': 'بكالوريوس هندسة تقنية علوم البناء',
    '02 / Selected work': '02 / أعمال مختارة', 'Projects shaped by': 'مشاريع صاغها', 'coordination.': 'التنسيق.',
    'Eight selected projects spanning cultural, educational, residential, destination, hospitality, and industrial delivery across Saudi Arabia.': 'ثمانية مشاريع مختارة تشمل المشروعات الثقافية والتعليمية والسكنية والوجهات والضيافة والمنشآت الصناعية في المملكة العربية السعودية.',
    'View case study': 'عرض دراسة الحالة', 'View project': 'عرض المشروع', 'View all projects': 'عرض جميع المشاريع', 'Case study in preparation': 'دراسة الحالة قيد الإعداد',
    'Architectural redesign developed through concept, planning, visualization, and coordinated documentation.': 'إعادة تصميم معماري تطورت عبر الفكرة والتخطيط والإظهار والتوثيق المنسق.',
    'A coordinated educational package connecting architectural intent, technical drawings, and environmental studies.': 'حزمة تعليمية منسقة تربط الرؤية المعمارية بالرسومات الفنية والدراسات البيئية.',
    'Multidisciplinary BIM documentation for sports and dining facilities, including coordinated plans, sections, schedules, and construction details.': 'توثيق BIM متعدد التخصصات للمنشآت الرياضية ومنشآت الطعام، يشمل المخططات والقطاعات والجداول والتفاصيل التنفيذية المنسقة.',
    'Coordinated BIM delivery for worker housing, a dining facility, and a fire station, supported by detailed architectural documentation.': 'تسليم BIM منسق لسكن العمال ومنشأة الطعام ومحطة الإطفاء، مدعوم بتوثيق معماري تفصيلي.',
    'Coordinated structural documentation for the hospitality substructure, including foundations, schedules, plans, and model views.': 'توثيق إنشائي منسق للأعمال التحتية في مشروع الضيافة، يشمل الأساسات والجداول والمخططات ومشاهد النموذج.',
    'Residential space planning focused on clear circulation, zoning, and functional room relationships.': 'تخطيط سكني يركز على وضوح الحركة والتوزيع والعلاقات الوظيفية بين الفراغات.',
    'Cultural / Redesign': 'ثقافي / إعادة تصميم', 'Education / Architecture': 'تعليمي / عمارة', 'Residential / Design': 'سكني / تصميم', 'Sports / BIM': 'رياضي / BIM', 'Residential / BIM': 'سكني / BIM', 'Hospitality / Structure': 'ضيافة / إنشائي', 'Industrial / Documentation': 'صناعي / توثيق', 'Industrial / Architectural BIM': 'صناعي / BIM معماري',
    '03 / Expertise': '03 / الخبرات', 'One model.': 'نموذج واحد.', 'Many decisions.': 'قرارات متعددة.',
    'My role connects people, standards, and project information so teams can resolve issues earlier and deliver with confidence.': 'يربط دوري بين الأشخاص والمعايير ومعلومات المشروع، بما يمكّن الفرق من معالجة المشكلات مبكرًا والتسليم بثقة.',
    'BIM model development': 'تطوير نماذج BIM', 'Coordination & clash resolution': 'التنسيق ومعالجة التعارضات', 'Code-led architecture': 'عمارة قائمة على الأكواد', 'Multidisciplinary delivery': 'تسليم متعدد التخصصات',
    'Detailed architectural and structural models, disciplined model management, and accurate 2D/3D deliverables.': 'نماذج معمارية وإنشائية تفصيلية، وإدارة منضبطة للنماذج، ومخرجات دقيقة ثنائية وثلاثية الأبعاد.',
    'Federated model review, systematic clash detection, issue tracking, and coordination across design disciplines.': 'مراجعة النماذج المجمعة، والكشف المنهجي عن التعارضات، وتتبع المشكلات والتنسيق بين تخصصات التصميم.',
    'Project case studies, requirement analysis, concept design, and architectural documentation aligned with Saudi regulations.': 'دراسات المشروعات وتحليل المتطلبات والتصميم المفاهيمي والتوثيق المعماري المتوافق مع الأنظمة السعودية.',
    'A practical foundation spanning MEP, structural systems, visualization, and project planning.': 'أساس عملي يشمل أنظمة MEP والأنظمة الإنشائية والإظهار وتخطيط المشروعات.',
    '04 / Experience': '04 / الخبرة', 'Years of': 'سنوات من', 'experience': 'الخبرة', 'From systems to': 'من الأنظمة إلى', 'whole projects.': 'المشروعات المتكاملة.',
    'Architectural Intern': 'متدرب معماري', 'MEP Engineer → Lead Architect': 'مهندس MEP ← معماري رئيسي',
    'Developing and managing coordinated models, facilitating clash resolution, maintaining federated information, and delivering architectural documentation across every major LOD stage.': 'تطوير النماذج المنسقة وإدارتها، وتيسير معالجة التعارضات، والحفاظ على المعلومات المجمعة، وتسليم التوثيق المعماري عبر مراحل LOD الرئيسية.',
    'Progressed from electrical and HVAC design into architectural leadership, client coordination, authority engagement, concept design, and visualization.': 'تدرجت من تصميم الأنظمة الكهربائية والتكييف إلى قيادة الأعمال المعمارية والتنسيق مع العملاء والجهات والتصميم المفاهيمي والإظهار.',
    'Early professional experience connecting the built environment with Saudi heritage and institutional practice.': 'خبرة مهنية مبكرة تربط البيئة المبنية بالتراث السعودي والممارسة المؤسسية.',
    '05 / Credentials & certificates': '05 / المؤهلات والشهادات', 'Always': 'تطوير', 'developing.': 'مستمر.',
    'Verified professional development across BIM authoring, coordination, cloud delivery, automation, and Saudi Building Code practice.': 'تطوير مهني موثق في إعداد نماذج BIM والتنسيق والتسليم السحابي والأتمتة وتطبيق كود البناء السعودي.',
    'Coordination': 'التنسيق', 'Delivery': 'التسليم', 'Saudi Building Codes 201, 601 & 701': 'أكواد البناء السعودي 201 و601 و701',
    'Open certificate': 'فتح الشهادة', 'Inspect certificate': 'عرض الشهادة', 'View all certificates': 'عرض جميع الشهادات',
    'Certificate viewer': 'عارض الشهادات', 'Close certificate viewer': 'إغلاق عارض الشهادات', 'Previous certificate': 'الشهادة السابقة', 'Next certificate': 'الشهادة التالية',
    'Let’s coordinate the next move': 'لننسّق الخطوة التالية', 'Have a complex': 'هل لديك مشروع', 'project in mind?': 'معقد؟',
    'Email': 'البريد الإلكتروني', 'Phone': 'الهاتف', 'Professional profile': 'الملف المهني',
    'Selected work is presented for professional evaluation. Some project information has been limited or anonymized to respect client and project confidentiality.': 'تُعرض الأعمال المختارة لأغراض التقييم المهني. تم تقييد أو إخفاء بعض معلومات المشروعات احترامًا لسرية العملاء والمشروعات.',
    'Back to top': 'العودة للأعلى', 'Project portfolio': 'ملف المشروعات', 'Professional certificates': 'الشهادات المهنية',
    'Selected architectural & BIM work': 'أعمال معمارية وBIM مختارة', 'Project': 'معرض', 'galleries.': 'المشاريع.',
    'Eight curated projects covering architectural design, BIM coordination, structural documentation, and technical delivery.': 'ثمانية مشاريع مختارة تغطي التصميم المعماري وتنسيق BIM والتوثيق الإنشائي والتسليم الفني.',
    'Projects': 'المشاريع', 'Selected sheets': 'لوحات مختارة', 'Filter the projects': 'تصفية المشاريع', 'All': 'الكل', 'Residential': 'سكني', 'Hospitality': 'ضيافة', 'Industrial': 'صناعي',
    'View gallery': 'عرض المعرض', 'In preparation': 'قيد الإعداد', 'Case study pending': 'دراسة الحالة قيد الإعداد',
    'Verified professional development': 'تطوير مهني موثق', 'Professional': 'الشهادات', 'certificates.': 'المهنية.',
    'A curated record of continued learning across BIM authoring, coordination, automation, cloud delivery, and Saudi Building Code practice.': 'سجل مختار للتعلم المستمر في إعداد نماذج BIM والتنسيق والأتمتة والتسليم السحابي وتطبيق كود البناء السعودي.',
    'Categories': 'فئات', 'Filter the library': 'تصفية المكتبة', 'Autodesk Training Center': 'مركز Autodesk للتدريب', 'BIM Solutions': 'BIM Solutions', 'Saudi Building Code': 'كود البناء السعودي',
    '6 certificates': '6 شهادات', '7 certificates': '7 شهادات', '3 certificates': '3 شهادات', 'Open original': 'فتح الملف الأصلي',
    'Project type': 'نوع المشروع', 'Role': 'الدور', 'Scope': 'النطاق', 'Stage': 'المرحلة', 'Tools': 'الأدوات', 'Gallery': 'المعرض',
    'Cultural / Architectural redesign': 'ثقافي / إعادة تصميم معماري', 'Educational': 'تعليمي', 'Private villa': 'فيلا خاصة', 'Sports village': 'قرية رياضية', 'Worker accommodation': 'سكن عمال', 'Hospitality': 'ضيافة', 'Industrial facility': 'منشأة صناعية',
    'Architectural designer': 'مصمم معماري', 'Architectural BIM engineer': 'مهندس BIM معماري', 'Structural BIM modeler': 'نمذجة BIM إنشائية',
    'Design & documentation': 'التصميم والتوثيق', 'Architecture & BIM': 'العمارة وBIM', 'Space planning': 'تخطيط الفراغات', 'Multidisciplinary documentation': 'توثيق متعدد التخصصات', 'Architecture & coordination': 'العمارة والتنسيق', 'Substructure package': 'حزمة الأعمال التحتية', 'Architectural documentation': 'التوثيق المعماري',
    'Concept to detailed design': 'من الفكرة إلى التصميم التفصيلي', 'Design development': 'تطوير التصميم', 'Concept design': 'التصميم المفاهيمي', 'Detailed design': 'التصميم التفصيلي', 'Technical documentation': 'التوثيق الفني',
    'A cultural center redesign presented through architectural concept imagery, plans, elevations, sections, and detailed construction information.': 'إعادة تصميم مركز ثقافي معروضة من خلال صور الفكرة المعمارية والمخططات والواجهات والقطاعات ومعلومات التنفيذ التفصيلية.',
    'A coordinated school design package combining architectural visualization, plans, elevations, structural information, details, and environmental studies.': 'حزمة تصميم مدرسة منسقة تجمع الإظهار المعماري والمخططات والواجهات والمعلومات الإنشائية والتفاصيل والدراسات البيئية.',
    'Residential space planning developed through clear, furnished floor plans that communicate circulation, zoning, and room relationships.': 'تخطيط فراغي سكني مطور من خلال مساقط مفروشة وواضحة تشرح الحركة والتوزيع والعلاقات بين الغرف.',
    'A detailed BIM documentation set covering the dining facility and sports center, with coordinated plans, elevations, sections, schedules, and construction details.': 'مجموعة توثيق BIM تفصيلية لمنشأة الطعام والمركز الرياضي، وتشمل مخططات وواجهات وقطاعات وجداول وتفاصيل تنفيذية منسقة.',
    'A coordinated BIM package spanning worker housing, a dining facility, and a fire station, with model views and detailed architectural documentation.': 'حزمة BIM منسقة تشمل سكن العمال ومنشأة الطعام ومحطة الإطفاء، مع مشاهد النموذج والتوثيق المعماري التفصيلي.',
    'Structural documentation for the Turtle Bay substructure, including coordinated plans, foundation details, schedules, and a three-dimensional model view.': 'توثيق إنشائي للأعمال التحتية في Turtle Bay، يشمل المخططات المنسقة وتفاصيل الأساسات والجداول ومشهد النموذج ثلاثي الأبعاد.',
    'An industrial drawing package covering the HCL tank farm and warehouse through plans, elevations, schedules, sections, and envelope details.': 'حزمة رسومات صناعية لخزانات HCL والمستودع، تشمل المخططات والواجهات والجداول والقطاعات وتفاصيل الغلاف الخارجي.',
    'Design presentation & documentation': 'عرض التصميم والتوثيق', 'Architectural & technical package': 'الحزمة المعمارية والفنية', 'Villa floor plans': 'مخططات الفيلا', 'Dining Facility': 'منشأة الطعام', 'Sports Center': 'المركز الرياضي', 'Worker Housing': 'سكن العمال', 'Fire Station': 'محطة الإطفاء', 'Substructure documentation': 'توثيق الأعمال التحتية', 'HCL Tank Farm': 'خزانات HCL', 'Warehouse': 'المستودع',
    'Project cover': 'غلاف المشروع', 'images': 'صور', 'image': 'صورة',
    'Project film': 'فيلم المشروع', 'See the design': 'شاهد التصميم', 'in motion.': 'أثناء الحركة.',
    'A concise visual presentation of the project concept, architectural language, and design development.': 'عرض مرئي موجز لفكرة المشروع ولغته المعمارية وتطور التصميم.',
    'Watch on YouTube': 'المشاهدة على YouTube', 'Project documentation': 'توثيق المشروع', 'Explore the': 'استكشف', 'complete set.': 'المجموعة الكاملة.',
    'Select any sheet to inspect it full screen. Use the arrows to move through the set, or open the original image in a separate tab.': 'اختر أي لوحة لعرضها بملء الشاشة. استخدم الأسهم للتنقل بين اللوحات أو افتح الصورة الأصلية في علامة تبويب مستقلة.',
    'Select a sheet': 'اختر لوحة', 'Browse with arrows': 'تنقل بالأسهم', 'Open the full image': 'افتح الصورة الكاملة',
    'Portfolio language': 'لغة الموقع', 'العربية': 'English'
  };

  const originalText = new WeakMap();
  const attributes = ['aria-label', 'title'];
  const normalize = value => value.replace(/\s+/g, ' ').trim();

  const translateTextNode = (node, language) => {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    if (language === 'en') { node.nodeValue = source; return; }
    const key = normalize(source);
    if (!key || !arabic[key]) return;
    const leading = source.match(/^\s*/)?.[0] || '';
    const trailing = source.match(/\s*$/)?.[0] || '';
    node.nodeValue = `${leading}${arabic[key]}${trailing}`;
  };

  const translateElement = (element, language) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: node => ['SCRIPT', 'STYLE'].includes(node.parentElement?.tagName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    while (walker.nextNode()) translateTextNode(walker.currentNode, language);
    document.querySelectorAll('[aria-label], [title]').forEach(item => attributes.forEach(attribute => {
      const key = `i18nOriginal${attribute.replace(/[^a-z]/gi, '')}`;
      if (!item.dataset[key]) item.dataset[key] = item.getAttribute(attribute) || '';
      const source = item.dataset[key];
      item.setAttribute(attribute, language === 'ar' && arabic[normalize(source)] ? arabic[normalize(source)] : source);
    }));
  };

  const applyLanguage = language => {
    const selected = language === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = selected;
    document.documentElement.dir = selected === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', selected === 'ar');
    translateElement(document.body, selected);
    const page = location.pathname.split('/').pop() || 'index.html';
    const titles = {
      'index.html': ['Ahmed Alamer | Architectural BIM Engineer', 'أحمد العامر | مهندس نمذجة معلومات مبانٍ معماري'],
      'projects.html': ['Projects | Ahmed Alamer', 'المشاريع | أحمد العامر'],
      'certificates.html': ['Professional Certificates | Ahmed Alamer', 'الشهادات المهنية | أحمد العامر']
    };
    if (titles[page]) document.title = titles[page][selected === 'ar' ? 1 : 0];
    document.querySelectorAll('[data-language-toggle]').forEach(button => {
      button.textContent = selected === 'ar' ? 'English' : 'العربية';
      button.setAttribute('lang', selected === 'ar' ? 'en' : 'ar');
      button.setAttribute('aria-label', selected === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    });
    localStorage.setItem(STORAGE_KEY, selected);
  };

  const initial = localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en';
  window.PortfolioI18n = { applyLanguage, language: () => document.documentElement.lang };
  document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(initial);
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-language-toggle]');
      if (!button) return;
      applyLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar');
    });
  });
})();
