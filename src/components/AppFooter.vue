<template>
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__brand">
        <div class="footer__logo-row">
          <span class="footer__logo">银凯</span>
          <strong>Yinkai Tech</strong>
        </div>
        <p class="footer__slogan">{{ $t('footer.slogan') }}</p>
      </div>

      <div class="footer__col">
        <h4>{{ $t('footer.quickLinks') }}</h4>
        <ul>
          <li><router-link to="/about">{{ $t('nav.about') }}</router-link></li>
          <li><router-link to="/services">{{ $t('nav.services') }}</router-link></li>
          <li><router-link to="/news">{{ $t('nav.news') }}</router-link></li>
          <li><router-link to="/careers">{{ $t('nav.careers') }}</router-link></li>
        </ul>
      </div>

      <div class="footer__col">
        <h4>{{ $t('footer.contact') }}</h4>
        <ul>
          <li>{{ $t('contact.address') }}</li>
          <li>{{ $t('contact.phone') }}</li>
          <li>{{ $t('contact.email') }}</li>
        </ul>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container">
        <p>{{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #12233f;
  color: rgba(255, 255, 255, 0.82);
  margin-top: auto;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.2fr;
  gap: 40px;
  padding: 56px 24px 40px;
}

.footer__logo-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 17px;
}

.footer__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--c-primary), var(--c-primary-dark));
  color: #fff;
  font-size: 14px;
}

.footer__slogan {
  margin-top: 12px;
  font-size: 14px;
}

.footer__col h4 {
  color: #fff;
  font-size: 15px;
  margin-bottom: 14px;
}

.footer__col li {
  font-size: 14px;
  margin-bottom: 8px;
}

.footer__col a:hover {
  color: #fff;
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding: 18px 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
}

@media (max-width: 768px) {
  .footer__grid {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 40px 24px 32px;
  }
}
</style>
