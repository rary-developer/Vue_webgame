<template>
  <div>
    <!-- state가 waiting을 가리킨다  v-bind:class class에 state를 가리킨다. -->
    <!-- <div id="screen" v-bind:class="state">{{}}</div> -->
    <!-- 축약형 -->
    <div id="screen" :class="state" @click="onClickScreen()">{{message}}</div>
    <!-- 단순 감싸는 용도일 경우 div 대신 template(없는 태그로 친다)-->
    <!-- <template v-if="result.length"> -->
    <div>
      <div>평균 시간 : {{}}</div>
      <button @click="onReset">리셋</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: [],
      state: 'wating',
      mwssage: '클릭해서 시작하세요.',
    };
  },
  methods: {
    onReset(){

    },
    onClickScreen(){
      if(this.state === 'wating'){
        this.state = 'ready';
      }else if(this.state === 'ready'){
        this.state = 'now';
      }else if(this.state === 'now'){
        this.state = 'wating';
      }
    },
  }
};
</script>

<style scoped>
/* scoped 를 사용하면 해당 컴포넌트 안에서만 유효한 css가 적용된다 */
  #screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
  }
  #screen.wating {
    background-color: aqua;
  }
  #screen.ready {
    background-color: red;
    color: white;
  }
  #screen.now{
    background-color: greenyellow;
  }
</style>