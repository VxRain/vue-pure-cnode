<template>
  <div class="footer">
    <!-- <p>#Footer</p> -->
    <p>
      Code by
      <a href="#">VxRain</a>
    </p>
    <p>
      API by
      <a href="#">https://cnodejs.org/api/</a>
    </p>
    <p>假装这里有版权声明和赞助商链接</p>
    <p>让页脚不至于那么空</p>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.footer {
  flex: 1;
  min-height: 150px;
  padding: 10px 5%;
  color: #ababab;
  /*  */
  background: #fff;
}
.footer a,
footer a:link,
footer a:visited {
  color: #08c;
  text-decoration: none;
}
.footer a:hover {
  color: #005580;
  text-decoration: underline;
}
</style>