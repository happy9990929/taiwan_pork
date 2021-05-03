<template>
  <router-view />
  <footer class="footer">
    <div>
      資料來源:
      <a
        href="https://data.gov.tw/dataset/136370"
        target="_blank"
        class="footer_link"
        >政府資料開放平台</a
      >
    </div>
    <div class="copyright">© YIWEN WANG，僅供學習無商業用途</div>
    <a
      href="https://github.com/happy9990929"
      target="_blank"
      class="github_icon"
    >
      <i class="fab fa-github"></i>
    </a>
  </footer>
</template>

<style lang="scss">
@import "~animate.css/animate.min.css";
* {
  box-sizing: border-box;
}
body {
  font-family: "arial", "Microsoft JhengHei", "SimHei";
  line-height: 1.5;
  font-size: 4vw;
  @media screen and (min-width: 768px) {
    font-size: 18px;
  }
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
button {
  border: 0;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
}
.footer {
  padding-top: 15px;
  text-align: center;
  font-size: 18px;
}
.github_icon {
  margin-top: 10px;
  font-size: 32px;
  color: #000;
  transition: color 0.2s ease;
  &:hover {
    color: #b4be2b;
  }
}
.footer_link {
  color: #000000;
  transition: color 0.2s ease;
  &:hover {
    color: #b4be2b;
  }
}
.copyright {
  font-size: 0.8rem;
}
</style>
