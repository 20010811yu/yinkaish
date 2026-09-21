<template>
  <footer class="footer">    <div class="container footer__grid">
      <div class="footer__brand">
        <div class="footer__logo-row">
          <img src="../assets/logo.png" alt="logo" class="footer__logo-img" />
          <strong>{{ $t('brand.full') }}</strong>
        </div>
        <p class="footer__slogan">{{ $t('footer.slogan') }}</p>
      </div>

      <div class="footer__col">
        <h4>{{ $t('footer.quickLinks') }}</h4>
        <ul>
          <li><router-link to="/services">{{ $t('nav.services') }}</router-link></li>
          <li><router-link to="/about">{{ $t('nav.about') }}</router-link></li>
          <li><router-link to="/news">{{ $t('nav.news') }}</router-link></li>
          <li><router-link to="/careers">{{ $t('nav.careers') }}</router-link></li>
        </ul>
      </div>

      <div class="footer__col">
        <h4>{{ $t('footer.contact') }}</h4>
        <ul>
          <li>{{ $t('contact.address') }}</li>
          <li>Tel: {{ $t('contact.phone') }}</li>
          <li>{{ $t('contact.phoneCao') }}</li>
          <li>{{ $t('contact.phoneZhu') }}</li>
          <li>{{ $t('contact.email') }}</li>
        </ul>
      </div>

      <div class="footer__col">
        <h4>{{ $t('footer.follow') }}</h4>
        <div class="footer__qr">
          <figure class="footer__qr-item">
            <img :src="wechatQr" :alt="$t('footer.wechat')" />
            <figcaption>{{ $t('footer.wechat') }}</figcaption>
          </figure>
          <figure class="footer__qr-item">
            <img :src="douyinQr" :alt="$t('footer.douyin')" />
            <figcaption>{{ $t('footer.douyin') }}</figcaption>
          </figure>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container">
        <p>{{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import wechatQr from '../assets/qrcode/wechat.jpg'
import douyinQr from '../assets/qrcode/douyin.jpg'
// 纯展示组件,文案经 i18n 全局注入
</script>

<style scoped>
.footer {
  background: linear-gradient(180deg, #057842 0%, #04512f 100%);
  color: rgba(255, 255, 255, 0.85);
  margin-top: auto;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.5fr 0.9fr 1.3fr 1fr;
  gap: 40px;
  padding: 56px 24px 40px;
}

.footer__logo-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 1rem;
  line-height: 1.45;
}

.footer__logo-img {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.footer__slogan {
  margin-top: 12px;
  font-size: 0.875rem;
}

.footer__col h4 {
  color: #fff;
  font-size: 0.9375rem;
  margin-bottom: 14px;
}

.footer__col li {
  font-size: 0.875rem;
  margin-bottom: 8px;
}

.footer__col a:hover {
  color: #fff;
}

.footer__qr {
  display: flex;
  gap: 14px;
}

.footer__qr-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.footer__qr-item img {
  width: 96px;
  height: 96px;
  padding: 4px;
  background: #fff;
  border-radius: 10px;
  object-fit: cover;
  display: block;
}

.footer__qr-item figcaption {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.85);
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  padding: 18px 0;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.6);
}

/* 平板 4 列收为 2 列 */
@media (max-width: 1024px) {
  .footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer__grid {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 40px 24px 32px;
  }
}
</style>
