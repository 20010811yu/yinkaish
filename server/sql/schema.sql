-- yinkai_web 官网数据库结构(MySQL 8.0+,utf8mb4)
-- 内容数据双语列统一用 _zh/_en 后缀;image 存素材文件名,由前端资源表解析为实际 URL

CREATE DATABASE IF NOT EXISTS yinkai_web
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE yinkai_web;

-- 新闻
CREATE TABLE IF NOT EXISTS news (
  id INT COMMENT '新闻编号(前端路由参数)',
  tag_zh VARCHAR(50) NOT NULL COMMENT '分类标签(中文) 如:公司动态',
  tag_en VARCHAR(50) NOT NULL COMMENT '分类标签(英文)',
  news_date DATE NOT NULL COMMENT '发布日期',
  title_zh VARCHAR(255) NOT NULL COMMENT '标题(中文)',
  title_en VARCHAR(255) NOT NULL COMMENT '标题(英文)',
  summary_zh VARCHAR(500) NOT NULL COMMENT '摘要(中文,列表页展示)',
  summary_en VARCHAR(500) NOT NULL COMMENT '摘要(英文)',
  content_zh MEDIUMTEXT NOT NULL COMMENT '正文(中文,按换行分段)',
  content_en MEDIUMTEXT NOT NULL COMMENT '正文(英文)',
  is_published TINYINT(1) NOT NULL DEFAULT 1 COMMENT '是否发布(1是 0否)',
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='新闻表-官网新闻动态,按日期倒序展示';

-- 职位
CREATE TABLE IF NOT EXISTS jobs (
  id INT COMMENT '职位编号',
  title_zh VARCHAR(100) NOT NULL COMMENT '职位名称(中文)',
  title_en VARCHAR(100) NOT NULL COMMENT '职位名称(英文)',
  dept_zh VARCHAR(100) NOT NULL COMMENT '所属部门(中文)',
  dept_en VARCHAR(100) NOT NULL COMMENT '所属部门(英文)',
  location_zh VARCHAR(100) NOT NULL COMMENT '工作地点(中文)',
  location_en VARCHAR(100) NOT NULL COMMENT '工作地点(英文)',
  desc_zh MEDIUMTEXT NOT NULL COMMENT '岗位描述(中文,含职责与要求,按换行分段)',
  desc_en MEDIUMTEXT NOT NULL COMMENT '岗位描述(英文)',
  is_active TINYINT(1) NOT NULL DEFAULT 1 COMMENT '是否在招(1是 0否)',
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='职位表-加入我们页招聘岗位,按编号排序展示';

-- 产品分类
CREATE TABLE IF NOT EXISTS product_categories (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '分类编号(主键,产品表外键引用)',
  slug VARCHAR(50) NOT NULL COMMENT '分类标识(前端路由/页面锚点用)',
  name_zh VARCHAR(100) NOT NULL COMMENT '分类名称(中文)',
  name_en VARCHAR(100) NOT NULL COMMENT '分类名称(英文)',
  desc_zh VARCHAR(500) NOT NULL COMMENT '分类简介(中文)',
  desc_en VARCHAR(500) NOT NULL COMMENT '分类简介(英文)',
  sort INT NOT NULL DEFAULT 0 COMMENT '排序值(越小越靠前)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='产品分类表-业务与产品页产品线分组';

-- 产品(图片存文件名,前端映射到打包资源)
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '产品编号(主键,参数表外键引用)',
  category_id INT NOT NULL COMMENT '所属分类编号(product_categories.id)',
  model VARCHAR(100) NOT NULL COMMENT '产品型号 如:YK-6A',
  tag_zh VARCHAR(100) NOT NULL COMMENT '产品标签(中文) 如:立冲长边',
  tag_en VARCHAR(100) NOT NULL COMMENT '产品标签(英文)',
  image VARCHAR(255) NOT NULL COMMENT '主图文件名(前端映射实际资源)',
  gallery JSON COMMENT '多图画廊文件名数组(可选,如 YK-OL-2I 的 1-5.png)',
  desc_zh MEDIUMTEXT NOT NULL COMMENT '产品简介(中文)',
  desc_en MEDIUMTEXT NOT NULL COMMENT '产品简介(英文)',
  sort INT NOT NULL DEFAULT 0 COMMENT '分类内排序值(越小越靠前)',
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES product_categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='产品表-各分类下产品型号卡片';

-- 产品参数(一对多挂产品)
CREATE TABLE IF NOT EXISTS product_params (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '参数行编号(主键)',
  product_id INT NOT NULL COMMENT '所属产品编号(products.id)',
  label_zh VARCHAR(100) NOT NULL COMMENT '参数名(中文) 如:加工范围 mm',
  label_en VARCHAR(100) NOT NULL COMMENT '参数名(英文)',
  value_zh VARCHAR(255) NOT NULL COMMENT '参数值(中文)',
  value_en VARCHAR(255) NOT NULL COMMENT '参数值(英文)',
  sort INT NOT NULL DEFAULT 0 COMMENT '产品内排序值(越小越靠前,按画册参数表顺序)',
  CONSTRAINT fk_params_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='产品参数表-产品详情参数行,一对多挂产品';

-- 公司荣誉
CREATE TABLE IF NOT EXISTS honors (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '荣誉编号(主键)',
  name_zh VARCHAR(100) NOT NULL COMMENT '荣誉名称(中文)',
  name_en VARCHAR(100) NOT NULL COMMENT '荣誉名称(英文)',
  desc_zh VARCHAR(500) NOT NULL COMMENT '荣誉说明(中文)',
  desc_en VARCHAR(500) NOT NULL COMMENT '荣誉说明(英文)',
  image VARCHAR(255) NOT NULL COMMENT '证书图片文件名(前端映射实际资源)',
  sort INT NOT NULL DEFAULT 0 COMMENT '排序值(越小越靠前,按重要程度)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='荣誉表-关于页荣誉相册证书';

-- 合作伙伴
CREATE TABLE IF NOT EXISTS partners (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '伙伴编号(主键)',
  slug VARCHAR(50) NOT NULL COMMENT '伙伴标识',
  name_zh VARCHAR(100) NOT NULL COMMENT '伙伴名称(中文)',
  name_en VARCHAR(100) NOT NULL COMMENT '伙伴名称(英文)',
  image VARCHAR(255) NOT NULL COMMENT 'logo 文件名(前端映射实际资源)',
  sort INT NOT NULL DEFAULT 0 COMMENT '排序值(越小越靠前,按源站顺序)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='合作伙伴表-首页伙伴 logo 墙';
