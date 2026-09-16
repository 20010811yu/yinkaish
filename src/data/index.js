// 核心业务数据(占位,双语)
export const services = [
  {
    id: 'software',
    icon: 'Monitor',
    name: { zh: '企业级软件研发', en: 'Enterprise Software R&D' },
    desc: {
      zh: '定制化 ERP、CRM、中台系统设计与开发，助力企业核心业务数字化。',
      en: 'Custom ERP, CRM and middle-platform design and development to digitize your core business.',
    },
  },
  {
    id: 'cloud',
    icon: 'Cloudy',
    name: { zh: '云计算服务', en: 'Cloud Services' },
    desc: {
      zh: '云架构咨询、迁移与运维托管，构建弹性、安全、高可用的云上基座。',
      en: 'Cloud architecture consulting, migration and managed operations for an elastic, secure and highly available foundation.',
    },
  },
  {
    id: 'ai',
    icon: 'Cpu',
    name: { zh: '数据智能与 AI', en: 'Data Intelligence & AI' },
    desc: {
      zh: '数据中台建设与 AI 应用落地，让数据资产真正驱动业务决策。',
      en: 'Data platform building and AI applications that turn data assets into business decisions.',
    },
  },
  {
    id: 'consulting',
    icon: 'Compass',
    name: { zh: '数字化咨询', en: 'Digital Consulting' },
    desc: {
      zh: '从战略到落地的数字化规划咨询，为转型路径提供专业护航。',
      en: 'Digital planning and consulting from strategy to execution, safeguarding your transformation journey.',
    },
  },
]

// 发展历程(占位)
export const milestones = [
  { year: '2015', text: { zh: '银凯科技于上海成立，专注企业软件研发。', en: 'Yinkai Tech founded in Shanghai, focusing on enterprise software.' } },
  { year: '2018', text: { zh: '通过 CMMI 3 级认证，客户数量突破 100 家。', en: 'CMMI Level 3 certified; surpassed 100 clients.' } },
  { year: '2020', text: { zh: '成立云计算事业部，全面布局云服务。', en: 'Cloud computing division established, full commitment to cloud services.' } },
  { year: '2022', text: { zh: '获评国家高新技术企业，设立 AI 实验室。', en: 'Recognized as National High-Tech Enterprise; AI lab founded.' } },
  { year: '2025', text: { zh: '服务企业客户超 500 家，业务覆盖全国。', en: 'Serving 500+ enterprise clients nationwide.' } },
]

// 团队成员(占位)
export const team = [
  { id: 1, name: { zh: '陈志远', en: 'Chen Zhiyuan' }, title: { zh: '创始人 & CEO', en: 'Founder & CEO' }, desc: { zh: '二十年软件行业经验，前知名互联网公司技术副总裁。', en: '20 years in software industry, former VP of Technology at a leading internet company.' } },
  { id: 2, name: { zh: '林晓雯', en: 'Lin Xiaowen' }, title: { zh: '首席技术官 CTO', en: 'Chief Technology Officer' }, desc: { zh: '分布式系统专家，主导多个亿级用户平台架构设计。', en: 'Distributed systems expert, led architecture for platforms serving 100M+ users.' } },
  { id: 3, name: { zh: '王海峰', en: 'Wang Haifeng' }, title: { zh: 'AI 实验室负责人', en: 'Head of AI Lab' }, desc: { zh: '机器学习博士，发表多篇顶会论文，专注行业 AI 落地。', en: 'PhD in machine learning, multiple top-conference papers, focused on industry AI.' } },
  { id: 4, name: { zh: '苏婷婷', en: 'Su Tingting' }, title: { zh: '交付与运营总监', en: 'Delivery & Operations Director' }, desc: { zh: 'PMP 认证项目管理专家，擅长大型项目交付治理。', en: 'PMP-certified project expert, skilled in large-scale delivery governance.' } },
]

// 新闻(占位)
export const news = [
  {
    id: 1,
    date: '2026-09-10',
    title: { zh: '银凯科技发布新一代企业数据中台产品', en: 'Yinkai Tech Releases Next-Gen Enterprise Data Platform' },
    summary: { zh: '新产品融合 AI 能力，帮助企业更高效地管理与使用数据资产。', en: 'The new product integrates AI capabilities to help enterprises manage and use data assets more efficiently.' },
    content: {
      zh: '9 月 10 日，银凯科技在上海举办新品发布会，正式推出新一代企业数据中台产品。该产品内置多种 AI 辅助分析能力，支持低代码建模与实时数据处理，可帮助企业将数据治理效率提升 50% 以上。多家首批客户代表出席发布会并分享了试点成果。',
      en: 'On September 10, Yinkai Tech held a launch event in Shanghai to officially release its next-generation enterprise data platform. With built-in AI-assisted analytics, low-code modeling and real-time data processing, the product improves data governance efficiency by over 50%. Representatives of the first batch of clients attended and shared pilot results.',
    },
  },
  {
    id: 2,
    date: '2026-08-22',
    title: { zh: '银凯科技与华东某大型制造集团达成战略合作', en: 'Yinkai Tech Signs Strategic Partnership with a Major Manufacturing Group' },
    summary: { zh: '双方将在智能工厂与工业互联网领域展开深度合作。', en: 'The two parties will cooperate deeply on smart factories and industrial internet.' },
    content: {
      zh: '银凯科技与华东某大型制造集团签署战略合作协议，双方将围绕智能工厂、工业互联网平台与供应链数字化展开三年期深度合作。银凯将提供从咨询规划到系统实施的全流程服务，首期项目已正式启动。',
      en: 'Yinkai Tech signed a strategic partnership agreement with a major manufacturing group in East China. The three-year cooperation covers smart factories, industrial internet platforms and supply chain digitalization. Yinkai will provide full-cycle services from consulting to implementation, and the first phase has started.',
    },
  },
  {
    id: 3,
    date: '2026-07-15',
    title: { zh: '公司通过 ISO/IEC 27001 信息安全管理体系换版认证', en: 'Yinkai Tech Passes ISO/IEC 27001 Recertification' },
    summary: { zh: '信息安全管理体系持续保持国际标准水准。', en: 'The information security management system remains at the international standard level.' },
    content: {
      zh: '近日，银凯科技顺利通过 ISO/IEC 27001:2022 信息安全管理体系换版认证。这标志着公司在信息安全管理、风险控制与合规运营方面持续保持国际标准水准，为客户提供更可靠的安全保障。',
      en: 'Yinkai Tech recently passed the ISO/IEC 27001:2022 information security management system recertification, demonstrating sustained international-standard performance in security management, risk control and compliance, providing clients with more reliable protection.',
    },
  },
  {
    id: 4,
    date: '2026-06-03',
    title: { zh: '银凯 AI 实验室两项研究成果入选行业顶会', en: 'Two AI Lab Papers Accepted by Top Industry Conferences' },
    summary: { zh: '研究成果聚焦大模型在企业场景中的高效应用。', en: 'The research focuses on efficient LLM applications in enterprise scenarios.' },
    content: {
      zh: '银凯科技 AI 实验室两项研究成果成功入选行业顶级会议，研究方向包括大语言模型在企业知识管理中的高效微调方法，以及面向制造质检场景的小样本视觉检测模型。相关成果已在部分客户项目中落地验证。',
      en: 'Two research papers from the Yinkai AI Lab were accepted by top industry conferences, covering efficient fine-tuning of LLMs for enterprise knowledge management and few-shot visual inspection models for manufacturing quality control. The results have been validated in client projects.',
    },
  },
  {
    id: 5,
    date: '2026-04-18',
    title: { zh: '2026 校园招聘正式启动，计划招聘 60 余名新成员', en: 'Campus Recruitment 2026 Kicks Off with 60+ Openings' },
    summary: { zh: '面向全球高校招聘研发、产品与咨询类岗位。', en: 'Hiring R&D, product and consulting roles from universities worldwide.' },
    content: {
      zh: '银凯科技 2026 校园招聘正式启动，本年度计划面向全球高校招聘 60 余名新成员，岗位覆盖软件研发、算法、产品经理与数字化咨询等方向。公司为校招新人提供导师制培养体系与清晰的职业发展通道。',
      en: 'Yinkai Tech Campus Recruitment 2026 officially started, planning to hire 60+ graduates worldwide for software R&D, algorithm, product management and digital consulting roles. New graduates will enjoy a mentorship program and clear career development paths.',
    },
  },
  {
    id: 6,
    date: '2026-03-05',
    title: { zh: '银凯科技荣膺"年度最佳数字化服务商"奖项', en: 'Yinkai Tech Named "Digital Service Provider of the Year"' },
    summary: { zh: '凭借客户口碑与技术实力获得行业权威认可。', en: 'Recognized by the industry for client reputation and technical strength.' },
    content: {
      zh: '在 2026 中国企业数字化服务大会上，银凯科技凭借突出的客户口碑与综合技术实力，荣获"年度最佳数字化服务商"奖项。评委会认为银凯在金融与制造行业的解决方案具有行业标杆意义。',
      en: 'At the 2026 China Enterprise Digitalization Summit, Yinkai Tech won the "Digital Service Provider of the Year" award for its outstanding client reputation and comprehensive technical strength. The jury highlighted Yinkai\'s finance and manufacturing solutions as industry benchmarks.',
    },
  },
]

// 职位(占位)
export const jobs = [
  { id: 1, title: { zh: '高级前端工程师', en: 'Senior Frontend Engineer' }, dept: { zh: '研发中心', en: 'R&D Center' }, location: { zh: '上海', en: 'Shanghai' } },
  { id: 2, title: { zh: 'Java 后端工程师', en: 'Java Backend Engineer' }, dept: { zh: '研发中心', en: 'R&D Center' }, location: { zh: '上海', en: 'Shanghai' } },
  { id: 3, title: { zh: '算法工程师（大模型方向）', en: 'Algorithm Engineer (LLM)' }, dept: { zh: 'AI 实验室', en: 'AI Lab' }, location: { zh: '上海', en: 'Shanghai' } },
  { id: 4, title: { zh: '产品经理', en: 'Product Manager' }, dept: { zh: '产品部', en: 'Product Dept.' }, location: { zh: '上海 / 北京', en: 'Shanghai / Beijing' } },
  { id: 5, title: { zh: '数字化咨询顾问', en: 'Digital Consultant' }, dept: { zh: '咨询事业部', en: 'Consulting' }, location: { zh: '上海', en: 'Shanghai' } },
  { id: 6, title: { zh: '解决方案架构师', en: 'Solutions Architect' }, dept: { zh: '交付中心', en: 'Delivery Center' }, location: { zh: '深圳', en: 'Shenzhen' } },
]

// 福利(占位)
export const welfares = [
  { icon: 'Opportunity', text: { zh: '导师制培养与清晰晋升通道', en: 'Mentorship program and clear promotion paths' } },
  { icon: 'Coin', text: { zh: '有竞争力的薪酬与年终奖励', en: 'Competitive salary and year-end bonus' } },
  { icon: 'Umbrella', text: { zh: '补充商业保险与年度体检', en: 'Supplementary insurance and annual health check' } },
  { icon: 'AlarmClock', text: { zh: '弹性工作与带薪年假', en: 'Flexible hours and paid annual leave' } },
  { icon: 'Reading', text: { zh: '技术大会、培训与购书基金', en: 'Tech conferences, training and book fund' } },
  { icon: 'Watermelon', text: { zh: '下午茶、团建与节日福利', en: 'Snacks, team events and holiday perks' } },
]
