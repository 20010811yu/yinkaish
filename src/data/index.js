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

// 产品分类(依据企业画册设备内容归类,图片源自官网产品图,双语)
import yk6aImg from '../assets/products/yk-6a_banner.png'
import yk6bImg from '../assets/products/yk-6b_banner.png'
import yk6wImg from '../assets/products/yk-6w_banner.png'
import ykFc3cImg from '../assets/products/yk-fc-3c_banner.png'
import ykFc3dImg from '../assets/products/yk-fc-3d_banner.png'
import ykFc3jImg from '../assets/products/yk-fc-3j_banner.png'
import yk3eImg from '../assets/products/yk-3e_banner.png'
import yk3fImg from '../assets/products/yk-3f_banner.png'
import ykAl1Img from '../assets/products/yk-al-1_banner.png'
import ykOl2iImg from '../assets/products/yk-ol-2i_banner.png'
import ykOl3iImg from '../assets/products/yk-ol-3i_banner.png'
import ykLawanImg from '../assets/products/yk-xingcailawanji_banner.png'
import ykLuomuImg from '../assets/products/yk-zidongsuoluomushengchanxian_banner.png'

export const productCategories = [
  {
    id: 'pv-alu',
    name: { zh: '光伏边框铝型材自动生产线', en: 'PV Frame Aluminium Profile Lines' },
    desc: {
      zh: '面向长边/短边铝型材边框的自动冲切、铆接全线装备，自动送料、切割、冲压、铆接、检测全流程覆盖。',
      en: 'Complete lines for long/short aluminium PV frames covering auto feeding, cutting, stamping, riveting and inspection.',
    },
    products: [
      {
        model: 'YK-6A',
        tag: { zh: '立冲长边', en: 'Vertical Punch, Long Edge' },
        image: yk6aImg,
        desc: {
          zh: '适用边框长度 1500-2600mm，节拍 1.8-2.1 秒/支，12 小时产能 18000-20000 支，加工精度 ±0.1mm，稼动率 98%。',
          en: 'For 1500-2600mm frames at 1.8-2.1s per piece, 18,000-20,000 pcs per 12h, ±0.1mm precision, 98% uptime.',
        },
      },
      {
        model: 'YK-6B',
        tag: { zh: '卧冲短边', en: 'Horizontal Punch, Short Edge' },
        image: yk6bImg,
        desc: {
          zh: '适用边框长度 850-1500mm，节拍 1.8-2.1 秒/支，12 小时产能 18000-20000 支，加工精度 ±0.1mm，稼动率 98%。',
          en: 'For 850-1500mm frames at 1.8-2.1s per piece, 18,000-20,000 pcs per 12h, ±0.1mm precision, 98% uptime.',
        },
      },
      {
        model: 'YK-6W',
        tag: { zh: '卧冲长边', en: 'Horizontal Punch, Long Edge' },
        image: yk6wImg,
        desc: {
          zh: '适用边框长度 1500-2600mm，节拍 1.8-2.1 秒/支，加工精度 ±0.1mm，稼动率 98%，装机容量 10.8 吨。',
          en: 'For 1500-2600mm frames at 1.8-2.1s per piece, ±0.1mm precision, 98% uptime, 10.8t overall weight.',
        },
      },
    ],
  },
  {
    id: 'pv-fc',
    name: { zh: '光伏边框复合材料自动生产线', en: 'PV Frame Composite Material Lines' },
    desc: {
      zh: '复合材料边框长边/短边自动线与角码装配机，精度 ±0.15mm，稼动率 98%。',
      en: 'Long/short-edge composite frame lines and corner-key assembly machines with ±0.15mm precision and 98% uptime.',
    },
    products: [
      {
        model: 'YK-FC-3C',
        tag: { zh: '长边自动线', en: 'Long-Edge Line' },
        image: ykFc3cImg,
        desc: {
          zh: '适用边框长度 1500-2600mm，加工精度 ±0.15mm，45° 切角精度，稼动率 98%。',
          en: 'For 1500-2600mm composite frames, ±0.15mm precision with 45° mitre accuracy, 98% uptime.',
        },
      },
      {
        model: 'YK-FC-3D',
        tag: { zh: '短边自动线', en: 'Short-Edge Line' },
        image: ykFc3dImg,
        desc: {
          zh: '适用边框长度 850-1500mm，结构紧凑，稼动率 98%，装机容量 8.3 吨。',
          en: 'For 850-1500mm frames in a compact footprint, 98% uptime, 8.3t overall weight.',
        },
      },
      {
        model: 'YK-FC-3J',
        tag: { zh: '角码装配机', en: 'Corner-Key Assembly Machine' },
        image: ykFc3jImg,
        desc: {
          zh: '边框角码自动装配，外形 4500×3800×1500mm，装机容量仅 1.5 吨，稼动率 98%。',
          en: 'Automatic corner-key assembly, footprint 4500×3800×1500mm, only 1.5t overall weight, 98% uptime.',
        },
      },
    ],
  },
  {
    id: 'stacker',
    name: { zh: '自动码垛机', en: 'Automatic Stacking Machines' },
    desc: {
      zh: '长边/短边边框成品自动码垛，替代人工整理，稼动率 98%。',
      en: 'Automatic stacking of long/short finished frames, replacing manual handling, 98% uptime.',
    },
    products: [
      {
        model: 'YK-3E',
        tag: { zh: '长边自动码垛机', en: 'Long-Edge Stacker' },
        image: yk3eImg,
        desc: {
          zh: '适用 1500-2600mm 长边框自动码垛，外形 7000×6300×2500mm，稼动率 98%。',
          en: 'Automatic stacking for 1500-2600mm long frames, footprint 7000×6300×2500mm, 98% uptime.',
        },
      },
      {
        model: 'YK-3F',
        tag: { zh: '短边自动码垛机', en: 'Short-Edge Stacker' },
        image: yk3fImg,
        desc: {
          zh: '适用 850-1500mm 短边框自动码垛，外形 5000×7200×2500mm，稼动率 98%。',
          en: 'Automatic stacking for 850-1500mm short frames, footprint 5000×7200×2500mm, 98% uptime.',
        },
      },
    ],
  },
  {
    id: 'feeder',
    name: { zh: '自动上料机', en: 'Automatic Feeding Machine' },
    desc: {
      zh: '边框原材料自动上料与缓存，保障深加工设备连续生产。',
      en: 'Automatic feeding and buffering of frame raw material for continuous downstream production.',
    },
    products: [
      {
        model: 'YK-AL-1',
        tag: { zh: '桁架式自动上料', en: 'Gantry-Type Auto Feeding' },
        image: ykAl1Img,
        desc: {
          zh: '适用原料长 3900-7500mm、宽 30-45mm、高 11-35mm；最大承重 3000kg（含托盘），托盘存放 360 支，上料节拍 2 秒/支，缓冲区可存 50 支确保不停机换框，稼动率 ≥85%。',
          en: 'For raw material 3900-7500mm long, 30-45mm wide, 11-35mm high; 3000kg max load (incl. pallet), 360 pcs per pallet, 2s feeding cycle, 50-pc buffer for non-stop changeover, ≥85% uptime.',
        },
      },
    ],
  },
  {
    id: 'vision',
    name: { zh: '自动视觉检测系统', en: 'Automatic Vision Inspection' },
    desc: {
      zh: '在线/离线视觉检测，十余类瑕疵自动识别分拣，检测数据全程可追溯。',
      en: 'Inline/offline vision inspection with auto sorting of a dozen-plus defect types and full traceability.',
    },
    products: [
      {
        model: 'YK-OL-2I',
        tag: { zh: '在线视觉检测', en: 'Inline Inspection' },
        image: ykOl2iImg,
        desc: {
          zh: '产线在线式全检，外形 3550×2900×2500mm，与生产线节拍同步，自动分拣 OK/NG。',
          en: 'Inline full inspection synchronized with line cycle, footprint 3550×2900×2500mm, automatic OK/NG sorting.',
        },
      },
      {
        model: 'YK-OF-3I',
        tag: { zh: '离线视觉检测', en: 'Offline Inspection' },
        image: ykOl3iImg,
        desc: {
          zh: '离线式检测站，外形 3900×1550×2500mm，全尺寸检测并自动生成可追溯报告。',
          en: 'Offline inspection station, footprint 3900×1550×2500mm, full-size inspection with traceable reports.',
        },
      },
    ],
  },
  {
    id: 'automotive',
    name: { zh: '汽车轻量化设备', en: 'Automotive Lightweight Equipment' },
    desc: {
      zh: '面向车身轻量化结构件的型材成形与连接装备，支持 FSW 搅拌摩擦焊与 CMT 冷金属过渡焊工艺。',
      en: 'Forming and joining equipment for lightweight automotive structures, supporting FSW and CMT welding processes.',
    },
    products: [
      {
        model: '型材拉弯机',
        tag: { zh: '型材拉弯成形', en: 'Profile Stretch Bending' },
        image: ykLawanImg,
        desc: {
          zh: '适用型材宽度 900-3200mm，拉弯速度 0-100mm/s，成形精度 0.02mm，单件节拍约 40 秒。',
          en: 'For profiles 900-3200mm wide, bending speed 0-100mm/s, 0.02mm forming precision, ~40s per piece.',
        },
      },
      {
        model: '自动锁螺母生产线',
        tag: { zh: '螺母自动压装', en: 'Nut Auto-Insertion Line' },
        image: ykLuomuImg,
        desc: {
          zh: '轻量化结构件螺母自动锁定生产线，配合 FSW/CMT 焊接工艺，服务汽车白车身轻量化制造。',
          en: 'Automatic nut-insertion line for lightweight structures with FSW/CMT welding, serving BIW lightweight manufacturing.',
        },
      },
    ],
  },
]

// 产品参数表(画册"设备参数"转录;键为产品型号;值=label/value 双语行数组)
const p = (lzh, len, vzh, ven) => ({ label: { zh: lzh, en: len }, value: { zh: vzh, en: ven ?? vzh } })

export const productParams = {
  YK6A: [
    p('名称', 'Name', '铝材长边立冲生产线', 'Aluminium long-edge vertical-punch line'),
    p('加工范围 mm', 'Processing Range', '1500-2600'),
    p('原材料兼容尺寸(长度)', 'Raw Material Length', '≤7.5m'),
    p('生产节拍(支/秒)', 'Production Cycle', '1.8-2.1(18000-20000支/12H)', '1.8-2.1s (18,000-20,000 pcs/12H)'),
    p('长度切割精度 mm', 'Cutting Accuracy', '±0.1'),
    p('孔距精度 mm', 'Hole Pitch Accuracy', '±0.1'),
    p('切角角度', 'Mitre Angle', '35°-55°可调', '35°-55° adjustable'),
    p('角度切割精度', 'Angle Accuracy', '±0.1°'),
    p('铆点精度 mm', 'Riveting Accuracy', '±0.1'),
    p('换模时间', 'Changeover Time', '<2H'),
    p('无故障运行率', 'Uptime', '98%'),
    p('装机容量 KW', 'Installed Capacity', '28'),
    p('外形尺寸mm(长×宽×高)', 'Dimensions (L×W×H)', '10700×6300×2300'),
    p('气源电力源', 'Air Supply', '2300L/min 5.0-6.0kgf/cm²'),
    p('设备电源', 'Power Supply', '380V 50HZ'),
    p('控制系统电源', 'Control Power', 'DC24V'),
    p('设备重量 T', 'Net Weight', '14.8'),
    p('设备方向', 'Layout Orientation', '可选择对称方向', 'Symmetric orientation optional'),
  ],
  YK6B: [
    p('名称', 'Name', '铝材短边卧冲生产线', 'Aluminium short-edge horizontal-punch line'),
    p('加工范围 mm', 'Processing Range', '850-1500'),
    p('原材料兼容尺寸(长度)', 'Raw Material Length', '≤7.5m'),
    p('生产节拍(支/秒)', 'Production Cycle', '1.8-2.1(18000-20000支/12H)', '1.8-2.1s (18,000-20,000 pcs/12H)'),
    p('长度切割精度 mm', 'Cutting Accuracy', '±0.1'),
    p('孔距精度 mm', 'Hole Pitch Accuracy', '±0.1'),
    p('切角角度', 'Mitre Angle', '35°-55°可调', '35°-55° adjustable'),
    p('角度切割精度', 'Angle Accuracy', '±0.1°'),
    p('铆点精度 mm', 'Riveting Accuracy', '±0.1'),
    p('换模时间', 'Changeover Time', '<2H'),
    p('无故障运行率', 'Uptime', '98%'),
    p('装机容量 KW', 'Installed Capacity', '27'),
    p('外形尺寸mm(长×宽×高)', 'Dimensions (L×W×H)', '10700×7070×2300'),
    p('气源电力源', 'Air Supply', '2300L/min 5.0-6.0kgf/cm²'),
    p('设备电源', 'Power Supply', '380V 50HZ'),
    p('控制系统电源', 'Control Power', 'DC24V'),
    p('设备重量 T', 'Net Weight', '11.7'),
    p('设备方向', 'Layout Orientation', '可选择对称方向', 'Symmetric orientation optional'),
  ],
  YK6W: [
    p('名称', 'Name', '铝材长边卧冲生产线', 'Aluminium long-edge horizontal-punch line'),
    p('加工范围 mm', 'Processing Range', '1500-2600'),
    p('原材料兼容尺寸(长度)', 'Raw Material Length', '≤7.5m'),
    p('生产节拍(支/秒)', 'Production Cycle', '1.8-2.1(18000-20000支/12H)', '1.8-2.1s (18,000-20,000 pcs/12H)'),
    p('长度切割精度 mm', 'Cutting Accuracy', '±0.1'),
    p('孔距精度 mm', 'Hole Pitch Accuracy', '±0.1'),
    p('切角角度', 'Mitre Angle', '35°-55°可调', '35°-55° adjustable'),
    p('角度切割精度', 'Angle Accuracy', '±0.1°'),
    p('铆点精度 mm', 'Riveting Accuracy', '±0.1'),
    p('换模时间', 'Changeover Time', '<2H'),
    p('无故障运行率', 'Uptime', '98%'),
    p('装机容量 KW', 'Installed Capacity', '28'),
    p('外形尺寸mm(长×宽×高)', 'Dimensions (L×W×H)', '10700×6300×2300'),
    p('气源电力源', 'Air Supply', '2300L/min 5.0-6.0kgf/cm²'),
    p('设备电源', 'Power Supply', '380V 50HZ'),
    p('控制系统电源', 'Control Power', 'DC24V'),
    p('设备重量 T', 'Net Weight', '10.8'),
    p('设备方向', 'Layout Orientation', '可选择对称方向', 'Symmetric orientation optional'),
  ],
  'YK-FC-3C': [
    p('名称', 'Name', '复合材料长边自动生产线', 'Composite long-edge automatic line'),
    p('加工范围 mm', 'Processing Range', '1500-2600'),
    p('原材料兼容尺寸(长度)', 'Raw Material Length', '≤7.5m'),
    p('生产节拍(支/秒)', 'Production Cycle', '4.5'),
    p('长度切割精度 mm', 'Cutting Accuracy', '±0.15'),
    p('孔距精度 mm', 'Hole Pitch Accuracy', '±0.15'),
    p('切角角度', 'Mitre Angle', '45°'),
    p('角度切割精度', 'Angle Accuracy', '-0.3°~0°'),
    p('换模时间', 'Changeover Time', '3H'),
    p('无故障运行率', 'Uptime', '98%'),
    p('装机容量 KW', 'Installed Capacity', '28'),
    p('外形尺寸mm(长×宽×高)', 'Dimensions (L×W×H)', '10700×6200×2400'),
    p('气源电力源', 'Air Supply', '2000L/min 5.0-6.0kgf/cm²'),
    p('设备电源', 'Power Supply', '380V 50HZ'),
    p('控制系统电源', 'Control Power', 'DC24V'),
    p('设备重量 T', 'Net Weight', '9.5'),
  ],
  'YK-FC-3D': [
    p('名称', 'Name', '复合材料短边自动生产线', 'Composite short-edge automatic line'),
    p('加工范围 mm', 'Processing Range', '850-1500'),
    p('生产节拍(支/秒)', 'Production Cycle', '1.7'),
    p('换模时间', 'Changeover Time', '0.5H'),
    p('无故障运行率', 'Uptime', '98%'),
    p('装机容量 KW', 'Installed Capacity', '11'),
    p('外形尺寸mm(长×宽×高)', 'Dimensions (L×W×H)', '10700×12700×2400'),
    p('气源电力源', 'Air Supply', '500L/min 5.0-6.0kgf/cm²'),
    p('设备电源', 'Power Supply', '380V 50HZ'),
    p('控制系统电源', 'Control Power', 'DC24V'),
    p('设备重量 T', 'Net Weight', '8.3'),
  ],
  'YK-FC-3J': [
    p('名称', 'Name', '复合材料角码装配机', 'Composite corner-key assembly machine'),
    p('加工范围 mm', 'Processing Range', '850-1500'),
    p('生产节拍(支/秒)', 'Production Cycle', '2.5'),
    p('换模时间', 'Changeover Time', '0.5H'),
    p('无故障运行率', 'Uptime', '98%'),
    p('装机容量 KW', 'Installed Capacity', '6'),
    p('外形尺寸mm(长×宽×高)', 'Dimensions (L×W×H)', '4500×3800×1500'),
    p('气源电力源', 'Air Supply', '200L/min 5.0-8.0kgf/cm²'),
    p('设备电源', 'Power Supply', '380V 50HZ'),
    p('控制系统电源', 'Control Power', 'DC24V'),
    p('设备重量 T', 'Net Weight', '1.5'),
  ],
  'YK-3E': [
    p('名称', 'Name', '长边自动码垛机', 'Long-edge automatic stacker'),
    p('加工范围 mm', 'Processing Range', '1500-2600'),
    p('生产节拍(支/秒)', 'Production Cycle', '1.7'),
    p('换模时间', 'Changeover Time', '0.5H'),
    p('无故障运行率', 'Uptime', '98%'),
    p('装机容量 KW', 'Installed Capacity', '11'),
    p('外形尺寸mm(长×宽×高)', 'Dimensions (L×W×H)', '7000×6300×2500'),
    p('气源电力源', 'Air Supply', '500L/min 5.0-6.0kgf/cm²'),
    p('设备电源', 'Power Supply', '380V 50HZ'),
    p('控制系统电源', 'Control Power', 'DC24V'),
    p('设备重量 T', 'Net Weight', '4.2'),
  ],
  'YK-3F': [
    p('名称', 'Name', '短边自动码垛机', 'Short-edge automatic stacker'),
    p('加工范围 mm', 'Processing Range', '850-1500'),
    p('生产节拍(支/秒)', 'Production Cycle', '2'),
    p('换模时间', 'Changeover Time', '0.5H'),
    p('无故障运行率', 'Uptime', '98%'),
    p('装机容量 KW', 'Installed Capacity', '11'),
    p('外形尺寸mm(长×宽×高)', 'Dimensions (L×W×H)', '5000×7200×2500'),
    p('气源电力源', 'Air Supply', '500L/min 5.0-6.0kgf/cm²'),
    p('设备电源', 'Power Supply', '380V 50HZ'),
    p('控制系统电源', 'Control Power', 'DC24V'),
    p('设备重量 T', 'Net Weight', '3.7'),
  ],
  'YK-AL-1': [
    p('名称', 'Name', '自动上料机', 'Automatic feeding machine'),
    p('适用边框原材料尺寸', 'Raw Material Size', '长 3900-7500mm，宽 30-45mm，高 11-35mm', 'L 3900-7500mm, W 30-45mm, H 11-35mm'),
    p('最大重量(含托盘)', 'Max Load (incl. pallet)', '3000kg'),
    p('托盘原材料存放数量', 'Pallet Capacity', '360 支', '360 pcs'),
    p('上料节拍', 'Feeding Cycle', '2 秒/支', '2s per pc'),
    p('上料缓冲区', 'Feed Buffer', '≥50 支', '≥50 pcs'),
    p('设备稼动率', 'Uptime', '≥85%'),
    p('外形尺寸mm(长×宽×高)', 'Dimensions (L×W×H)', '8000×6500×3000'),
  ],
  'YK-OL-2I': [
    p('名称', 'Name', '在线视觉检测系统', 'Inline vision inspection system'),
    p('检测方式', 'Inspection Mode', '产线在线全检', 'Inline full inspection'),
    p('检测项目', 'Inspection Items', '长度、扭曲度、漏加工及碰伤、划伤、变形等十余类', 'Length, twist, missed ops, dents, scratches, deformation and more'),
    p('生产节拍(支/秒)', 'Production Cycle', '≤1.7'),
    p('换型时间', 'Changeover Time', '≤20 分钟', '≤20 min'),
    p('分拣方式', 'Sorting', 'OK/NG 自动分拣', 'Automatic OK/NG sorting'),
    p('外形尺寸mm(长×宽×高)', 'Dimensions (L×W×H)', '3550×2900×2500'),
  ],
  'YK-OF-3I': [
    p('名称', 'Name', '离线视觉检测系统', 'Offline vision inspection system'),
    p('检测方式', 'Inspection Mode', '离线全尺寸检测', 'Offline full-size inspection'),
    p('检测项目', 'Inspection Items', '长度、角度、卡槽、冲孔、铆压等', 'Length, angle, slots, punching, riveting, etc.'),
    p('生产节拍', 'Cycle Time', '约 1 分钟/件', '~1 min per pc'),
    p('检测报告', 'Reports', '自动打印,结果长期可追溯', 'Auto-printed, long-term traceable'),
    p('外形尺寸mm(长×宽×高)', 'Dimensions (L×W×H)', '3900×1550×2500'),
  ],
  型材拉弯机: [
    p('名称', 'Name', '型材拉弯机', 'Profile stretch-bending machine'),
    p('适用型材宽度 mm', 'Profile Width', '900-3200'),
    p('拉弯速度', 'Bending Speed', '0-100mm/s'),
    p('单件节拍', 'Cycle Time', '约 40 秒', '~40s'),
    p('成形精度 mm', 'Forming Accuracy', '0.02'),
    p('弯曲角度范围', 'Bending Angle Range', '5°-85°'),
    p('装机容量 KVA', 'Installed Capacity', '75'),
    p('设备电源', 'Power Supply', '380V±10% 50-60HZ'),
    p('无故障运行率', 'Uptime', '99.8%'),
    p('外形尺寸mm(长×宽×高)', 'Dimensions (L×W×H)', '6300×1200×1800'),
  ],
  自动锁螺母生产线: [
    p('名称', 'Name', '自动锁螺母生产线', 'Automatic nut-insertion line'),
    p('工艺支持', 'Processes', 'FSW 搅拌摩擦焊 / CMT 冷金属过渡焊', 'FSW / CMT welding'),
    p('应用领域', 'Application', '汽车白车身轻量化结构件', 'BIW lightweight structures'),
    p('生产方式', 'Production Mode', '自动上料 + 锁螺母 + 焊接集成', 'Integrated feeding, nut insertion and welding'),
  ],
}

// 发展历程(真实大事记)
export const milestones = [
  { year: '2004', text: { zh: '上海寅铠精密机械制造有限公司成立，深耕汽车焊装装备。', en: 'Yinkai founded in Shanghai, focusing on automotive welding equipment.' } },
  { year: '2005', text: { zh: '通过德国莱茵 TÜV 认证，获 ISO9001 质量管理体系认证。', en: 'ISO9001 quality management system certified by TÜV Rheinland.' } },
  { year: '2011', text: { zh: '迁入嘉定安亭新厂区，厂房面积一万多平方米。', en: 'Relocated to the new plant in Anting, Jiading, covering 10,000+ m².' } },
  { year: '2024', text: { zh: '发布光伏边框在线/离线视觉检测新品，设备出口美国市场。', en: 'Launched inline/offline vision inspection products; equipment exported to the US.' } },
  { year: '2026', text: { zh: '持续拓展光伏边框自动化产线全球市场。', en: 'Continuing to expand the global market for PV frame automation lines.' } },
]

// 公司简介(About 页,双语段落)
export const intro = [
  {
    title: { zh: '公司概况', en: 'Company Profile' },
    text: {
      zh: '上海寅铠精密机械制造有限公司成立于2004年6月，位于上海市嘉定区安亭镇园区路567号，厂房及工业园占地面积约10000平方米，现有员工150余人，是一家专注于工业自动化装备研发、制造与服务的高新技术企业。公司起步于汽车焊装设备领域，凭借在汽车自动化行业多年积累的设计、制造与集成经验，形成了扎实的技术底蕴和项目管理能力。2005年，公司通过德国莱茵TÜV现场审核，获得ISO9001质量管理体系认证，企业管理与国际先进水平全面接轨。',
      en: 'Founded in June 2004 in Anting, Jiading, Shanghai, Yinkai operates a plant and industrial park of about 10,000 m² with 150+ employees, dedicated to the R&D, manufacturing and service of industrial automation equipment. Starting from automotive welding equipment, the company built solid technical expertise and project management capabilities. In 2005, it passed the TÜV Rheinland audit and obtained ISO9001 certification.',
    },
  },
  {
    title: { zh: '深耕汽车焊装', en: 'Automotive Heritage' },
    text: {
      zh: '公司成立初期深耕汽车焊装装备领域，主营汽车白车身焊接生产线交钥匙工程，涵盖焊装线、分拼线、工装夹具、检具与输送线及机器人系统集成，先后服务于上海大众、上海通用、上汽、长城、吉利、PSA、华晨、北汽等主流主机厂，并与ABB、KUKA、COMAU、西门子等知名企业长期合作。2007-2019年年均交付8-10个项目，累计超百项；2014年完成北汽、华晨白车身整线项目。2011年迁入新厂区，配备FARO激光跟踪仪等设备，精度控制在±0.1毫米级，为进军光伏领域奠定了坚实基础。',
      en: 'In its early years, Yinkai specialized in turnkey automotive BIW welding lines — welding, hemming, fixtures, gauges, conveyors and robot integration — serving SVW, SGM, SAIC, Great Wall, Geely, PSA, Jinbei, BAIC and partners such as ABB, KUKA and COMAU. From 2007 to 2019 it delivered 8-10 projects per year, over 100 in total, including full BIW lines for BAIC and Jinbei in 2014. In 2011 the company moved to its new plant with FARO laser trackers, holding precision at ±0.1 mm.',
    },
  },
  {
    title: { zh: '战略转型光伏', en: 'Strategic PV Expansion' },
    text: {
      zh: '2017年，公司成立光伏事业部，正式进入光伏边框自动化设备领域，开启了从汽车自动化向光伏新能源装备的战略拓展。依托汽车行业的丰富经验，公司自主研发、生产并销售优质的光伏边框自动化设备，逐步发展成为国内领先的光伏边框自动化设备制造商，致力于推动光伏边框行业全自动无人化工厂发展。',
      en: 'In 2017, Yinkai founded its PV division and entered the photovoltaic frame automation field, a strategic expansion from automotive automation. Leveraging its automotive expertise, the company developed high-quality PV frame automation equipment and has become a leading domestic manufacturer, committed to fully-unmanned PV frame factories.',
    },
  },
  {
    title: { zh: '核心产品', en: 'Core Products' },
    text: {
      zh: '公司主要产品涵盖光伏边框铝型材自动化生产线、复合材料自动化生产线、自动码垛机、自动上料机及自动视觉检测系统等，集自动上料、送料、切割、冲孔、铆压于一体，以柔性化、模块化设计为核心。从早期设备到第六代光伏边框自动化生产线，生产节拍和加工精度不断提升；2024年持续推进视觉检测项目的研发与推广。公司光伏业务已服务于爱康集团等客户，并在行业内获得广泛认可。',
      en: 'Main products cover PV frame aluminum/composite automatic lines, palletizers, feeders and vision inspection systems, integrating feeding, conveying, cutting, punching and riveting with flexible modular design. From early models to the 6th-generation line, cycle time and precision keep improving; in 2024 vision inspection R&D advanced further. PV clients include Akcome and more.',
    },
  },
  {
    title: { zh: '资质与愿景', en: 'Qualifications & Vision' },
    text: {
      zh: '公司拥有多项专利，获得高新技术企业、上海市“专精特新”中小企业、安全生产标准化三级企业等荣誉，并参与国家/行业标准制定，具备从工艺规划、设计、制造到装配调试、售后服务的全流程一体化能力。公司秉持“成为全球工业自动化产业的一流供应商”的愿景，以“寅领行业，铠创未来”为使命，坚持“敬畏客户、勇于创新、尊重个人、结果导向”的核心价值观，持续为全球客户提供智能、可靠、高效的自动化解决方案。',
      en: 'Yinkai holds multiple patents and honors including National High-Tech Enterprise and Shanghai "Specialized & Innovative" SME, and participates in national/industry standard setting, offering full-process capabilities from planning and design to manufacturing, commissioning and after-sales service. With the vision of becoming a first-class global supplier of industrial automation, the mission of "Leading the industry, Creating the future", and values of customer respect, innovation, individual respect and result orientation, Yinkai keeps delivering intelligent, reliable and efficient automation solutions worldwide.',
    },
  },
]

// 公司荣誉(About 页,按重要程度排序;honor4/honor5 中英文认证并列)
import honor01 from '../assets/honors/honor-01.jpg'
import honor02 from '../assets/honors/honor-02.jpg'
import honor03 from '../assets/honors/honor-03.jpg'
import honor04 from '../assets/honors/honor-04.jpg'
import honor05 from '../assets/honors/honor-05.jpg'
import honor06 from '../assets/honors/honor-06.jpg'
import honor07 from '../assets/honors/honor-07.jpg'

export const honors = [
  {
    image: honor01,
    name: { zh: '综合资质证书', en: 'Certificates Overview' },
    desc: { zh: '高新技术企业、安全生产标准化、SEC 年度确认及多项专利证书。', en: 'High-tech enterprise, work safety standardization, SEC annual confirmation and multiple patents.' },
  },
  {
    image: honor02,
    name: { zh: '上海市"专精特新"中小企业', en: 'Shanghai "Specialized & Innovative" SME' },
    desc: { zh: '上海市经济和信息化委员会认定,聚焦细分领域的专业化标杆。', en: 'Recognized by Shanghai SME Commission as a specialized and innovative enterprise.' },
  },
  {
    image: honor03,
    name: { zh: '质量管理体系认证', en: 'QMS Certification' },
    desc: { zh: '通过 SEC 质量管理体系认证,质量管理与国际接轨。', en: 'Certified quality management system (SEC), aligned with international standards.' },
  },
  {
    image: honor04,
    name: { zh: 'ISO Quality Certification', en: 'ISO Quality Certification' },
    desc: { zh: '面向国际客户的质量管理体系认证(英文版)。', en: 'Quality management system certification for international clients.' },
  },
  {
    image: honor05,
    name: { zh: '安全生产标准化三级企业', en: 'Work Safety Standardization Level 3' },
    desc: { zh: '机械行业安全生产标准化三级企业认证。', en: 'Level-3 work safety standardization (machinery industry).' },
  },
  {
    image: honor06,
    name: { zh: '实用新型专利证书', en: 'Utility Model Patents' },
    desc: { zh: '拥有多项实用新型专利,覆盖光伏边框生产与检测设备。', en: 'Multiple utility model patents covering PV frame production and inspection equipment.' },
  },
  {
    image: honor07,
    name: { zh: '专利登记簿副本', en: 'Patent Register' },
    desc: { zh: '国家知识产权局专利登记簿副本,专利权属清晰可查。', en: 'Patent register copies from CNIPA with clear ownership records.' },
  },
]

// 发展历程时间线(About 页纵向图文时间线,双语;image 为可选配图)
import imgT2004 from '../assets/timeline/t-2004.jpg'
import imgT2007 from '../assets/timeline/t-2007.png'
import imgT2011 from '../assets/timeline/t-2011.png'
import imgT2014 from '../assets/timeline/t-2014.png'
import imgT2017 from '../assets/timeline/t-2017.jpg'
import imgT2018 from '../assets/timeline/t-2018.png'
import imgT2022 from '../assets/timeline/t-2022.jpg'
import imgT2023 from '../assets/timeline/t-2023.png'
import imgT2024 from '../assets/timeline/t-2024.png'
import imgT2026 from '../assets/timeline/t-2026.jpg'
import imgCompany from '../assets/banner-company.webp'

export const timeline = [
  { year: '2004', image: imgT2004, title: { zh: '寅铠成立', en: 'Yinkai Founded' }, desc: { zh: '公司于上海成立，切入汽车白车身焊装装备领域。', en: 'Founded in Shanghai, entering automotive BIW welding equipment.' } },
  { year: '2005', image: null, title: { zh: 'TÜV 认证', en: 'TÜV Certified' }, desc: { zh: '通过德国莱茵 TÜV 认证，获 ISO9001 质量管理体系认证。', en: 'ISO9001 certified by TÜV Rheinland.' } },
  { year: '2007-2010', image: imgT2007, title: { zh: '快速交付期', en: 'Rapid Delivery' }, desc: { zh: '年均交付 8-10 个项目，绑定主流主机厂配套体系。', en: '8-10 projects per year, tied into major OEM supply chains.' } },
  { year: '2011', image: imgT2011, title: { zh: '新厂区启用', en: 'New Plant' }, desc: { zh: '迁入嘉定安亭新厂区，厂房面积一万多平方米。', en: 'Relocated to a 10,000+ m² plant in Anting, Jiading.' } },
  { year: '2014', image: imgT2014, title: { zh: '整线交付', en: 'Full-Line Delivery' }, desc: { zh: '交付北汽、华晨白车身焊接生产线等整线项目。', en: 'Delivered full BIW lines for BAIC and Jinbei.' } },
  { year: '2017', image: imgT2017, title: { zh: 'YK-15 启航', en: 'YK-15 Kickoff' }, desc: { zh: '启动 YK-15 研发，探索非标自动化产品化路径。', en: 'Started YK-15 R&D, moving toward productized automation.' } },
  { year: '2018-2019', image: imgT2018, title: { zh: '累计破百', en: '100+ Projects' }, desc: { zh: 'YK-2/YK-3/YK-44 相继推出，累计交付项目突破 100。', en: 'YK-2/YK-3/YK-44 released; cumulative projects topped 100.' } },
  { year: '2020', image: null, title: { zh: 'YK-53 发布', en: 'YK-53 Released' }, desc: { zh: 'YK-53 系列推出，光伏边框产线持续迭代。', en: 'YK-53 series launched, iterating PV frame lines.' } },
  { year: '2022', image: imgT2022, title: { zh: '2.5 秒节拍', en: '2.5s Cycle' }, desc: { zh: 'YK-5 系列实现 2.5 秒级节拍突破。', en: 'YK-5 series achieved a 2.5-second cycle breakthrough.' } },
  { year: '2023', image: imgT2023, title: { zh: 'YK-62 发布', en: 'YK-62 Released' }, desc: { zh: 'YK-62 新一代机型推出。', en: 'Next-generation YK-62 model introduced.' } },
  { year: '2024', image: imgT2024, title: { zh: '检测+出海', en: 'Inspection & Export' }, desc: { zh: 'YK-OL-2I/YK-OF-3I 视觉检测系统发布，设备出口美国。', en: 'YK-OL-2I/YK-OF-3I vision systems released; exported to the US.' } },
  { year: '2026', image: imgT2026, title: { zh: '面向全球', en: 'Going Global' }, desc: { zh: '持续拓展光伏边框自动化产线全球市场。', en: 'Continuing to expand PV frame automation worldwide.' } },
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
