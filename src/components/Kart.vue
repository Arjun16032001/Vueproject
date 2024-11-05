<template>
    <div>
      <h1 class="head_kart">Kart</h1>
      <button @click="handleChange">
    Increase by 1
  </button>
      <div style="margin-left: 5cm;">
        <div class="h2_krat">
        <h2 >Cart Items:</h2>
        <ul>
          <li v-for="(item, idx) in localProducts" :key="item.id" v-if="show_kart">
            {{ item.name }} - ${{ item.basePrice }} * {{item.count}}&nbsp;&nbsp;
            <button type="button" @click="() => {
              const updatedValue = localProducts.filter((item, index) => index !== idx)
            eventBus.emit('set-kart', updatedValue)
          }" >Delete</button> 
          </li>
        </ul>
        <br>
        <p >Total: ${{ total() }}</p>
      </div>
        <br>
        <div class="pay_but">
        <button type="button" @click="handlePay" style="margin-left: 3.4cm;">Pay</button>&nbsp;
        <button type="button" @click="clearAll" >Clear All</button>
        <!-- <button type="button" @click="() => console.log(JSON.parse(localStorage.getItem('cartList')))" >Test</button> -->
      </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref, defineEmits,onMounted,onUnmounted, inject, computed } from 'vue';
  import { eventBus } from '../eventBus';
  
  const show_kart =ref(true);
  
  // Create a local state for products to modify it directly
 

//   onMounted(() => {
//     console.log('mounted')
//   eventBus.on('add-kart', (val) => {
//     console.log('Received event payload:', val); 
//     if (val && val.kart && val.kart.value) {
//       localProducts.value = val.kart.value; 
//       console.log('Updated localProducts:', localProducts.value);
//     } else {
//       console.warn('Unexpected payload structure:', val); 
//     }
//   });
// });

// onUnmounted(()=>{
  
//     console.log('unmount')
// }
// )

 const kart = inject('sndkart')

 const localProducts = computed(() => kart.value);


//   const localProducts = ref([...JSON.parse(localStorage.getItem('cartList'))]);
//   const givenProducts = ref(localProducts.value.filter(item => item.count > 0));

// const givenProducts = computed(()=>{
//   return []
//   //  return localProducts.filter(item => item.count > 0)
// })
  
  const emit = defineEmits(['sampleEmit'])
  
  function handleChange(){
    emit('sampleEmit', 123, 23423)
  }
  
  function total() {
    return localProducts.value.reduce((accumulator, item) => 
      accumulator + item.basePrice * item.count, 0);
  }
  
  function handlePay(){
    alert("Payment completed");
    // givenProducts.value.forEach(item =>{ item.count=0;});
    // return givenProducts.value.splice(0,localProducts.value.length);
    localProducts.value.splice(0); 
    show_kart.value=false
    eventBus.emit('sndnav',localProducts.value)
  }
  
  // function del_item(idx) {
  //   givenProducts.value = givenProducts.value.filter((product, indx) => indx !== idx);
  //   givenProducts.value[idx].count = 0;
    
  // }
  
  
  // function clearAll() {
  //   localProducts.forEach(item => {
  //     item.count = 0;
  //   });
  //   console.log('All counts cleared:', localProducts);
  //   show_kart.value=false;
  // }

  function clearAll() {
  localProducts.value.splice(0); 
  console.log('kart', localProducts);
  eventBus.emit('sndnav',localProducts.value)
}
  </script>
  <style>
  .head_kart{
    font-weight: bold;
    font-size: 3cm;
    margin-left: 9cm;
    color: #4CAF50;
    line-height: 4cm;
    margin-top: 1cm;
  }
  
  .h2_krat{
    color: #4CAF50;
    margin-left: 6cm;
    width: 10cm;
    line-height: 1cm;
  }
  .h2_krat h2 {
    margin-left: 2cm;
    font-size: 0.8cm;
    line-height: 2cm;
  }
  .h2_krat p {
    margin-left: 2.7cm;
  }
  
  .pay_but{
    margin-left: 5cm;
  }
  
  </style>
  