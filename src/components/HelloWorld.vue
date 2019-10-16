

<template>
  <div>
    <h1>{{ msg }}</h1>
    <div id="gan_view">
     
    </div>
   
  </div>
</template>

<script>
import gant from './gantt.js';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      gan_view: null
    }
  },
  methods : {
    init(){
      document.getElementById("gan_view").appendChild(gant);
      //dougan_view = gant;
      
    }
  } ,
  mounted () {
    this.init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
