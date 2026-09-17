// 核心业务数据(光伏边框自动化 + 汽车焊装装备,双语)
export const services = [
  {
    id: 'pv-line',
    icon: 'SetUp',
    name: { zh: '光伏边框自动生产线', en: 'PV Frame Production Lines' },
    desc: {
      zh: 'YK 系列产线集自动上料、送料、切割、冲孔、铆压于一体，仅需 1 人上料；加工 1500-2500mm，节拍最快数秒一支，切割/孔距精度 ±0.1mm。',
      en: 'The YK series integrates auto feeding, conveying, cutting, punching and riveting with just one operator; 1500-2500mm frames at seconds per piece with ±0.1mm precision.',
    },
  },
  {
    id: 'online-vision',
    icon: 'View',
    name: { zh: '在线视觉检测系统', en: 'Inline Vision Inspection' },
    desc: {
      zh: 'YK-OL 系列在线检测长度、扭曲度、漏加工及碰伤、划伤、变形等十余类外观瑕疵并自动分拣，节拍 ≤1.7 秒，换型 ≤20 分钟。',
      en: 'The YK-OL series inspects length, twist, missed operations and a dozen-plus surface defects with auto sorting, at a cycle ≤1.7s and changeover ≤20min.',
    },
  },
  {
    id: 'offline-vision',
    icon: 'Search',
    name: { zh: '离线视觉检测系统', en: 'Offline Vision Inspection' },
    desc: {
      zh: 'YK-OF 系列离线全尺寸检测（长度、角度、卡槽、冲孔、铆压等），约 1 分钟/件，自动打印检测报告，结果长期可追溯。',
      en: 'The YK-OF series performs full-size offline inspection (length, angle, slots, punching, riveting) at ~1 min/piece with automatic reports and long-term traceability.',
    },
  },
  {
    id: 'biw',
    icon: 'OfficeBuilding',
    name: { zh: '汽车焊装交钥匙工程', en: 'Automotive Welding Turnkey' },
    desc: {
      zh: '白车身焊装线、分拼线、工装夹具、检具与输送线的规划设计制造，及机器人系统集成，服务大众、通用、上汽等主流主机厂。',
      en: 'Design and manufacturing of BIW welding lines, hemming lines, fixtures, gauges and conveyors with robot integration, serving VW, GM, SAIC and more.',
    },
  },
]

// 发展历程(真实大事记)
export const milestones = [
  { year: '2004', text: { zh: '上海寅铠精密机械制造有限公司成立，深耕汽车焊装装备。', en: 'Yinkai founded in Shanghai, focusing on automotive welding equipment.' } },
  { year: '2005', text: { zh: '通过德国莱茵 TÜV 认证，获 ISO9001 质量管理体系认证。', en: 'ISO9001 quality management system certified by TÜV Rheinland.' } },
  { year: '2011', text: { zh: '迁入嘉定安亭新厂区，厂房面积一万多平方米。', en: 'Relocated to the new plant in Anting, Jiading, covering 10,000+ m².' } },
  { year: '2024', text: { zh: '发布光伏边框在线/离线视觉检测新品，设备出口美国市场。', en: 'Launched inline/offline vision inspection products; equipment exported to the US.' } },
  { year: '2026', text: { zh: '持续拓展光伏边框自动化产线全球市场。', en: 'Continuing to expand the global market for PV frame automation lines.' } },
]

// 发展历程时间线(About 页纵向图文时间线,双语;image 为可选配图)
import imgT2004 from '../assets/timeline/t-2004.jpg'
import imgT2007 from '../assets/timeline/t-2007.png'
import imgT2011 from '../assets/timeline/t-2011.png'
import imgT2014 from '../assets/timeline/t-2014.png'
import imgT2017 from '../assets/timeline/t-2017.jpg'
import imgT2019 from '../assets/timeline/t-2019.jpg'
import imgT2022 from '../assets/timeline/t-2022.jpg'
import imgCompany from '../assets/banner-company.webp'
import imgVision from '../assets/banner-vision.png'

export const timeline = [
  { year: '2004', image: imgT2004, title: { zh: '寅铠成立', en: 'Yinkai Founded' }, desc: { zh: '公司于上海成立，切入汽车白车身焊装装备领域。', en: 'Founded in Shanghai, entering automotive BIW welding equipment.' } },
  { year: '2005', image: null, title: { zh: 'TÜV 认证', en: 'TÜV Certified' }, desc: { zh: '通过德国莱茵 TÜV 认证，获 ISO9001 质量管理体系认证。', en: 'ISO9001 certified by TÜV Rheinland.' } },
  { year: '2007-2010', image: imgT2007, title: { zh: '快速交付期', en: 'Rapid Delivery' }, desc: { zh: '年均交付 8-10 个项目，绑定主流主机厂配套体系。', en: '8-10 projects per year, tied into major OEM supply chains.' } },
  { year: '2011', image: imgT2011, title: { zh: '新厂区启用', en: 'New Plant' }, desc: { zh: '迁入嘉定安亭新厂区，厂房面积一万多平方米。', en: 'Relocated to a 10,000+ m² plant in Anting, Jiading.' } },
  { year: '2014', image: imgT2014, title: { zh: '整线交付', en: 'Full-Line Delivery' }, desc: { zh: '交付北汽、华晨白车身焊接生产线等整线项目。', en: 'Delivered full BIW lines for BAIC and Jinbei.' } },
  { year: '2017', image: imgT2017, title: { zh: 'YK-15 启航', en: 'YK-15 Kickoff' }, desc: { zh: '启动 YK-15 研发，探索非标自动化产品化路径。', en: 'Started YK-15 R&D, moving toward productized automation.' } },
  { year: '2018-2019', image: imgT2019, title: { zh: '累计破百', en: '100+ Projects' }, desc: { zh: 'YK-2/YK-3/YK-44 相继推出，累计交付项目突破 100。', en: 'YK-2/YK-3/YK-44 released; cumulative projects topped 100.' } },
  { year: '2020', image: null, title: { zh: 'YK-53 发布', en: 'YK-53 Released' }, desc: { zh: 'YK-53 系列推出，光伏边框产线持续迭代。', en: 'YK-53 series launched, iterating PV frame lines.' } },
  { year: '2022', image: imgT2022, title: { zh: '2.5 秒节拍', en: '2.5s Cycle' }, desc: { zh: 'YK-5 系列实现 2.5 秒级节拍突破。', en: 'YK-5 series achieved a 2.5-second cycle breakthrough.' } },
  { year: '2023', image: null, title: { zh: 'YK-62 发布', en: 'YK-62 Released' }, desc: { zh: 'YK-62 新一代机型推出。', en: 'Next-generation YK-62 model introduced.' } },
  { year: '2024', image: imgVision, title: { zh: '检测+出海', en: 'Inspection & Export' }, desc: { zh: 'YK-OL-2I/YK-OF-3I 视觉检测系统发布，设备出口美国。', en: 'YK-OL-2I/YK-OF-3I vision systems released; exported to the US.' } },
  { year: '2026', image: null, title: { zh: '面向全球', en: 'Going Global' }, desc: { zh: '持续拓展光伏边框自动化产线全球市场。', en: 'Continuing to expand PV frame automation worldwide.' } },
]

// 团队成员(岗位型占位,可替换为真实人员)
export const team = [
  { id: 1, name: { zh: '总经理', en: 'General Manager' }, title: { zh: '公司创始人', en: 'Founder' }, desc: { zh: '二十年非标自动化行业经验，带领公司从汽车焊装走向光伏装备。', en: 'Two decades in custom automation, leading Yinkai from automotive welding to PV equipment.' } },
  { id: 2, name: { zh: '技术总监', en: 'Technical Director' }, title: { zh: '研发中心', en: 'R&D Center' }, desc: { zh: '主导光伏边框产线与视觉检测系统的总体方案设计。', en: 'Leads overall design of PV frame lines and vision inspection systems.' } },
  { id: 3, name: { zh: '测量工程团队', en: 'Metrology Team' }, title: { zh: '质量控制', en: 'Quality Control' }, desc: { zh: '配备 3 套 FARO 激光跟踪仪与 7 套关节臂测量机，保障 ±0.1mm 精度。', en: 'Equipped with 3 FARO laser trackers and 7 measuring arms, ensuring ±0.1mm precision.' } },
  { id: 4, name: { zh: '项目交付团队', en: 'Delivery Team' }, title: { zh: '工程与安装', en: 'Engineering & Installation' }, desc: { zh: '机械、电气调试工程师占员工三分之一，具备海外项目交付经验。', en: 'Mechanical and electrical commissioning engineers make up a third of staff, with overseas delivery experience.' } },
]

// 新闻(真实事件 + 行业内容)
export const news = [
  {
    id: 1,
    date: '2026-08-20',
    title: { zh: '寅铠光伏边框自动生产线再获海外订单', en: 'Yinkai Wins Another Overseas Order for PV Frame Production Lines' },
    summary: { zh: '海外客户对 ±0.1mm 加工精度与数秒级节拍给予高度认可。', en: 'The overseas customer highly recognized the ±0.1mm precision and second-level cycle time.' },
    content: {
      zh: '近日，寅铠与海外客户签订光伏边框自动生产线订单。该产线延续 YK 系列模块化设计，集自动上料、切割、冲孔、铆压于一体，节拍最快数秒一支，切割与孔距精度达 ±0.1mm。客户表示，寅铠设备的高稳定性与快速换型能力是本次合作的关键因素。',
      en: 'Yinkai recently signed an order for PV frame production lines with an overseas customer. Continuing the modular YK series design, the line integrates auto feeding, cutting, punching and riveting with a cycle of seconds per frame and ±0.1mm precision. The customer cited Yinkai\'s stability and fast changeover as key factors.',
    },
  },
  {
    id: 2,
    date: '2026-05-12',
    title: { zh: 'YK-OL 在线视觉检测系统完成新一轮迭代升级', en: 'New Iteration of the YK-OL Inline Vision Inspection System Released' },
    summary: { zh: '检测节拍提升至 1.7 秒以内，新增多类瑕疵识别模型。', en: 'Cycle improved to under 1.7 seconds with new defect recognition models.' },
    content: {
      zh: '寅铠研发团队完成 YK-OL 系列在线视觉检测系统新一轮迭代。系统可在线检测长度、扭曲度、漏加工及碰伤、划伤、变形、脏污、铝屑等十余类外观瑕疵并自动分拣，节拍 ≤1.7 秒，换型时间 ≤20 分钟，检测数据可保存追溯，进一步巩固了公司在光伏边框检测领域的技术优势。',
      en: 'Yinkai\'s R&D team completed a new iteration of the YK-OL inline vision inspection system. It inspects length, twist, missed operations and over a dozen surface defects (dents, scratches, deformation, dirt, aluminum chips) with auto sorting at ≤1.7s cycle and ≤20min changeover, with traceable data storage, reinforcing Yinkai\'s technical edge in PV frame inspection.',
    },
  },
  {
    id: 3,
    date: '2026-03-02',
    title: { zh: '美国光伏边框产线项目顺利通过终验收', en: 'US PV Frame Line Project Passes Final Acceptance' },
    summary: { zh: '涵盖边框生产与在线视觉尺寸检测的整线方案获客户认可。', en: 'The complete line with production and inline dimension inspection was accepted by the customer.' },
    content: {
      zh: '寅铠为美国客户提供的光伏边框生产与视觉检测设备项目顺利通过终验收。项目包含边框自动生产线与在线视觉尺寸检测工位，采用 2500 万像素远心镜头双相机进行直线度与弯扭检测，检测数据以 Excel 保存并可追溯。这标志着寅铠光伏装备的国际化交付能力再上台阶。',
      en: 'Yinkai\'s PV frame production and vision inspection equipment project for a US customer passed final acceptance. The project included an automatic frame line and an inline dimension inspection station with dual 25MP telecentric cameras for straightness and bend/twist detection, with Excel-exported traceable data — another milestone in Yinkai\'s global delivery capability.',
    },
  },
  {
    id: 4,
    date: '2025-11-15',
    title: { zh: '寅铠亮相国际光伏装备展会', en: 'Yinkai Exhibited at an International PV Equipment Show' },
    summary: { zh: '现场展示光伏边框自动生产线核心技术方案。', en: 'Showcased core technologies of the PV frame production line on site.' },
    content: {
      zh: '寅铠携光伏边框自动生产线核心技术方案亮相行业展会，重点展示弹性夹具系统、旋转切割刀头等自主技术，以及"切冲铆一气呵成"的整线设计理念，吸引众多国内外客户驻足交流。',
      en: 'Yinkai showcased its PV frame production line technologies at an industry expo, highlighting proprietary innovations such as the elastic clamping system and rotary cutting head, and the one-flow cutting-punching-riveting line concept, attracting many domestic and international customers.',
    },
  },
  {
    id: 5,
    date: '2025-06-18',
    title: { zh: '公司通过 ISO9001 质量管理体系换版审核', en: 'Yinkai Passed the ISO9001 Recertification Audit' },
    summary: { zh: '自 2005 年首次认证以来持续保持质量体系有效运行。', en: 'Maintaining an effective quality system since first certification in 2005.' },
    content: {
      zh: '寅铠顺利通过 ISO9001 质量管理体系换版审核。公司自 2005 年获得德国莱茵 TÜV 颁发的 ISO9001 认证以来，始终严格执行质量管理体系标准，为汽车与光伏两大行业客户提供稳定可靠的装备与服务。',
      en: 'Yinkai passed the ISO9001 recertification audit. Since first receiving ISO9001 from TÜV Rheinland in 2005, the company has strictly maintained its quality management system, providing reliable equipment and services to customers in both automotive and PV industries.',
    },
  },
  {
    id: 6,
    date: '2025-01-10',
    title: { zh: '汽车焊装业务稳步推进，多条产线同步交付', en: 'Steady Progress in Automotive BIW Business with Multiple Lines Delivered' },
    summary: { zh: '延续大众、通用等主机厂长期合作关系。', en: 'Continuing long-term partnerships with OEMs such as VW and GM.' },
    content: {
      zh: '寅铠汽车白车身焊装业务保持稳健发展，年内多条焊装线、分拼线及工装夹具项目按期交付。公司自 2004 年成立以来累计服务上海大众、上海通用、上汽、吉利、长城等众多主机厂与一级供应商，以宝马级制造标准赢得行业口碑。',
      en: 'Yinkai\'s BIW welding business remained solid, with multiple welding lines, hemming lines and fixture projects delivered on schedule this year. Since 2004, Yinkai has served many OEMs and Tier-1 suppliers including SVW, SGM, SAIC, Geely and Great Wall, earning industry recognition with BMW-grade manufacturing standards.',
    },
  },
]

// 职位(占位)
export const jobs = [
  { id: 1, title: { zh: '机械设计工程师', en: 'Mechanical Design Engineer' }, dept: { zh: '研发中心', en: 'R&D Center' }, location: { zh: '上海·安亭', en: 'Anting, Shanghai' } },
  { id: 2, title: { zh: '电气调试工程师', en: 'Electrical Commissioning Engineer' }, dept: { zh: '工程部', en: 'Engineering' }, location: { zh: '上海·安亭', en: 'Anting, Shanghai' } },
  { id: 3, title: { zh: '视觉算法工程师', en: 'Vision Algorithm Engineer' }, dept: { zh: '研发中心', en: 'R&D Center' }, location: { zh: '上海·安亭', en: 'Anting, Shanghai' } },
  { id: 4, title: { zh: '测量工程师（FARO）', en: 'Metrology Engineer (FARO)' }, dept: { zh: '质量部', en: 'Quality' }, location: { zh: '上海·安亭', en: 'Anting, Shanghai' } },
  { id: 5, title: { zh: '装配钳工', en: 'Assembly Fitter' }, dept: { zh: '生产部', en: 'Production' }, location: { zh: '上海·安亭', en: 'Anting, Shanghai' } },
  { id: 6, title: { zh: '国际销售工程师', en: 'International Sales Engineer' }, dept: { zh: '销售部', en: 'Sales' }, location: { zh: '上海·安亭', en: 'Anting, Shanghai' } },
]

// 福利(占位)
export const welfares = [
  { icon: 'Opportunity', text: { zh: '导师制培养与清晰晋升通道', en: 'Mentorship program and clear promotion paths' } },
  { icon: 'Coin', text: { zh: '有竞争力的薪酬与项目奖励', en: 'Competitive salary and project bonuses' } },
  { icon: 'Umbrella', text: { zh: '五险一金与年度体检', en: 'Social insurance, housing fund and annual health check' } },
  { icon: 'AlarmClock', text: { zh: '带薪年假与弹性加班调休', en: 'Paid annual leave and flexible compensatory leave' } },
  { icon: 'Reading', text: { zh: '技术培训与海外项目机会', en: 'Technical training and overseas project opportunities' } },
  { icon: 'Watermelon', text: { zh: '工作餐补、团建与节日福利', en: 'Meal allowance, team events and holiday perks' } },
]
