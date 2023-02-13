<template>
  <div class="ground">
    <Header />
    <Memo />
    <Footer />
  </div>
</template>
  
<script>
import Header from './HeaderView.vue'
import Memo from './MemoView.vue'
import Footer from './FooterView.vue'

export default {
  components: {
    Header,
    Memo,
    Footer
  }
}
</script>