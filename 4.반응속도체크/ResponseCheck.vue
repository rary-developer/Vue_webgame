<template>
  <div>
    <!-- state가 waiting을 가리킨다  v-bind:class class에 state를 가리킨다. -->
    <!-- <div id="screen" v-bind:class="state">{{}}</div> -->
    <!-- 축약형 -->
    <div id="screen" :class="state" @click="onClickScreen()">{{message}}</div>
    <!-- 단순 감싸는 용도일 경우 div 대신 template(없는 태그로 친다)-->
    <!-- <template v-if="result.length"> 태그는 존재-->
    <div>
      <!-- <div v-show="result.length"> 태그까지 사라짐-->
      <div v-show="result.length">평균 시간 : {{average}}ms</div>
      <button @click="onReset">리셋</button>
    </div>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;
export default {
  data() {
    return {
      result: [],
      state: 'wating',
      mwssage: '클릭해서 시작하세요.',
    };
  },
  // computed는 값이 캐싱되기때문에 새로 호출할 필요없이 그전에 캐싱되어있는 값을 호출하기때문에 사용한다.(웹의 불필요한 시간 단축)
  // 일반 데이터를 가공해서 사용할때
  // 성능 최적화
  computed: {
    average(){
      //값을 더해서 누적시킨후 해당 값을 배열의 길이만큼 나누어 평균값을 도출하는 함수
      return this.result.reduce((a,c)=> a+c,0) / this.result.length||0;
    }
  },
  methods: {
    onReset(){
      this.result = [];
    },
    onClickScreen(){
      if(this.state === 'wating'){
        this.state = 'ready';
        this.message = '초록색이 되면 클릭하세요.'
        timeout = setTimeout(()=>{
          this.state = 'now';
          this.message = '지금클릭';
          startTime = new Date();
        }, Math.floor(Math.random() * 1000)+ 2000); //2~3초 뒤
      }else if(this.state === 'ready'){
        clearTimeout(timeout);
        this.state = 'wating';
        this.message = '너무 성급하시군요!! 초록색이 된 후에 클릭하세요.';
      }else if(this.state === 'now'){
        endTime = new Date();
        this.state = 'wating';
        this.message = '클릭해서 시작하세요.'
        this.result.push(endTime - startTime);
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