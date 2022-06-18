<template>
  <!-- <div id="computer" v-bind:style="{}"> -->
  <!-- v-bind와 :style은 객체형태로 사용 가능하다 . -->
  <!-- <div
    id="computer"
    :class="{state: true, hello: false }"
    :style="{backgroundImage:'', fontSzie:'14px'}"
  >-->
  <div>
    <!--    <div id="computer" :style="{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}"></div>-->
    <div id="computer" :style="computedStyleObject"></div>
    <div>
      <button @click="onClickButton('바위')">바위</button>
      <button @click="onClickButton('가위')">가위</button>
      <button @click="onClickButton('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 {{ score }}점</div>
    <lifecycle-example v-if="true"/>
  </div>
</template>

<script>
  const rspCoords = {
    바위: '0',
    가위: '-140px',
    보: '-284px',
  };
  const scores = {
    가위: 1,
    바위: 0,
    보: -1,
  };
  const computerChoice = (imgCoord) =>{
    return Object.entries(rspCoords).find(function(v){
      return v[1] === imgCoord;
    })[0];
  };

  let interval = null;
  export default {
    data() {
      return {
        imgCoord: rspCoords.바위,
        result: '',
        score: 0,
      }
    },
    computed: {
      computedStyleObject() {
        return {
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
        }
      },
    },
    methods: {
      changeHand(){
        interval = setInterval(()=>{
           if(this.imgCoord === rspCoords.바위){
             this.imgCoord = rspCoords.가위;
           }else if(this.imgCoord === rspCoords.가위){
             this.imgCoord = rspCoords.보;
           }else if(this.imgCoord === rspCoords.보){
             this.imgCoord = rspCoords.바위;
           }
         },100)
      },
      onClickButton(choice) {
        clearInterval(interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(this.imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0 ){
          this.result = '비겼습니다.';
        }else if([-1,2].includes(diff)){
          this.result = '이겼습니다';
          this.score += 1;
        }else{
          this.result = '졌습니다.';
          this.score -= 1;
        }
        setTimeout( () => {
          this.changeHand();
        },1000);
      }
    },
    //생성되기 전
    beforeCreate() {
      console.log("before created");
    },
    //생성될때 실행된다(화면에 나타나기 전)
    created() {
      console.log("created");
    },
    //화면에 그리기  전
    beforeMount() {
      console.log("before mount");
    },
    //화면에 그릴떄 mounted
    mounted() {
      console.log("mounted");
      // interval = setInterval(()=>{
      //   if(this.imgCoord === rspCoords.바위){
      //     this.imgCoord = rspCoords.가위;
      //   }else if(this.imgCoord === rspCoords.가위){
      //     this.imgCoord = rspCoords.보;
      //   }else if(this.imgCoord === rspCoords.보){
      //     this.imgCoord = rspCoords.바위;
      //   }
      // },100)
      // -> 변경 (중복)

      this.changeHand();
    },
    //업데이트되기 전
    beforeUpdate() {
      console.log("before update");
    },
    //화면이 바뀔때
    updated() {
      console.log("updated");
    },
    //화면에서 사라지기 전
    beforeDestroy() {
      console.log("before destory");
      //컴포넌트가 사라져도 interval은 계속해서 돌기때문에 clearInterval
      clearInterval(interval); //최종정리
    },
    //화면에 있다가 없어졌을때
    destroyed() {
      console.log("destroyed");
    },
  };
</script>

<style scoped>
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>