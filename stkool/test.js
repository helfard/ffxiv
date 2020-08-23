const address = new Vue({
    // ページのセットアップ
    el: '#test',
    data: {
        test: 'TEST'
    },
    mounted: function() {
  //    document.title = INFO.title; // タイトルをセット
      document.getElementById('test').textContent = this.test;
    }
  });