<template>
    <form @submit.prevent="searchProducts" class="search_bar" style="position: absolute; top: 70px; right: 20px; display: flex; align-items: center;width: 8cm;">
      <input type="text" placeholder="search" id="search" v-model="search" style="padding: 8px; margin-right: 10px;">
      <button type="submit" style="padding: 8px 15px;">Search</button>
      <button type="button" style="padding: 8px 15px;" @click="goBack" v-if="show_back">Back</button>
    </form>
    <button @click="() => console.log(productsList)">TTUIIU</button>
  
    <div v-if="show_products">

        <!-- <button @click="() => {
               eventBus.emit('addcartlength', {value: 10});
        }">add cart length</button> -->
      <h1 style="text-align: center;font-size: 1.6cm;color:#4CAF50 ;">Product List</h1>&nbsp;
      <div class="filter_section">
        <label style="padding: 10px; margin-right: 10px; position: absolute; top: 60px;">Filter</label>
        <select v-model="selectedFilter" @change="sortProducts" style="padding: 10px; margin-right: 10px; position: absolute; top: 100px;">
          <option value="ascending">Name a-z</option>
          <option value="descending">Name z-a</option>
          <option value="pricelow">Price low-high</option>
          <option value="pricehigh">Price high-low</option>
        </select>
      </div>
      <div class="grid-container" v-if="show_all">
        <div class="card" v-for="product in (foundProduct.length > 0 ? foundProduct : products)" :key="product.id">
          <img class="card-img-top" :src="product.featuredImage" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Price: {{ product.basePrice }}</li>
            <li class="list-group-item">Brand: {{ product.brand }}</li>
            <li class="list-group-item">{{ product.productCategory }}</li>
          </ul>
          <button type="button" style="margin-left: -0.2cm; margin-bottom: 0.5cm;" @click="addToKart(product)">Add to kart</button>
          <!-- <button type="button" style="margin-left: -0.2cm; margin-bottom: 0.5cm;" @click="() => {
            eventBus.emit('addToKart', {
                product: product
            })
          }">Add to kart</button> -->
  
      
          <div class="counter">
            <button @click="increment(product)">+</button>
            <div>{{ product.count }}</div>
            <button @click="decrement(product)">-</button>
            <button @click="reset(product)">Reset</button>
          </div>
        </div>
      </div>
     
    </div>
    
  </template>
  
  <script setup>
  import { ref, onMounted,defineProps, inject } from 'vue';
  import axios from 'axios';
  import { eventBus } from '../eventBus';
  
  const products = ref([]);
  const selectedFilter = ref('ascending');
  const search = ref('');
  const foundProduct = ref([]);
  const show_all = ref(true);
  const show_back = ref(false);
  // const kart = ref([]);
  const show_kart = ref(false);
  const show_products = ref(true);
  

//   const props = defineProps({
//     productsList: {
//         type: Array,
//         required: true,
//     },
//     addProduct: {
//         type: null
//     }
// });
  

 const kart= inject('sndkart')
  
  function sampleAlert(value, value2) {
    // alert('sample',123)
    console.log('value', value, value2)
  }
  
  async function fetchProducts() {
    try {
      const response = await axios.get('https://dummyapi.online/api/products/');
      // products.value = response.data.map(product => ({ ...product, count: 0 })); 
      products.value = response.data.map(product => {
      // Check if the product is in `kart` and set count from `kart`
      const kartItem = kart.value.find(item => item.id === product.id);
      return {
        ...product,
        count: kartItem ? kartItem.count : 0 // Set to kart count if exists, otherwise 0
      };});
      sortProducts();
      console.log(products.value)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  //  sort products
  function sortProducts() {
    const arrayToSort = foundProduct.value.length > 0 ? foundProduct.value : products.value;
  
    if (selectedFilter.value === 'ascending') {
      arrayToSort.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedFilter.value === 'descending') {
      arrayToSort.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedFilter.value === 'pricelow') {
      arrayToSort.sort((a, b) => a.basePrice - b.basePrice);
    } else if (selectedFilter.value === 'pricehigh') {
      arrayToSort.sort((a, b) => b.basePrice - a.basePrice);
    }
  }
  
  // Search products
  function searchProducts() {
    if (search.value === '') {
      show_all.value = true;
      foundProduct.value = [];
      show_back.value = false;
      return;
    }
    foundProduct.value = products.value.filter(product =>
      product.name.toLowerCase().includes(search.value.toLowerCase())
    );
  
    show_all.value = foundProduct.value.length > 0;
    show_back.value = foundProduct.value.length > 0;
  }
  
  // Back button
  function goBack() {
    show_all.value = true;
    foundProduct.value = [];
    search.value = '';
    show_back.value = false;
    show_products.value = true;
    show_kart.value = false;
  }
  
  // Go to Kart
  function goKart() {
    show_kart.value = true;
    show_products.value = false;
    show_back.value = true;
  }
  
  // Add product to kart
  // function addToKart(product) {
//     let cartList = JSON.parse(localStorage.getItem("cartList"));
//     if(!cartList){
//         localStorage.setItem("cartList", JSON.stringify([product]))
//     }
//     else{
//         cartList = [...cartList, product];
//         localStorage.setItem("cartList", JSON.stringify(cartList))
//     }
//     const exists = kart.value.find(item => item.id === product.id);
  
//     if (!exists) {
      
//       kart.value.push(product);
//     }
//     eventBus.emit('add-kart',{kart});
// }

function addToKart(product) {
  
    const exists = kart.value.find(item => item.id === product.id);

    // const inc = kart.value.filter(item => item.count !== 0);

  
    if (!exists) {
      
      kart.value.push(product);
      console.log('kar',kart.value)
    }
    eventBus.emit('sndnav',kart.value);
  }

  


 
  
  
  // Increment count for a specific product
  function increment(product) {
    product.count++;
  }
  
  // Decrement count for a specific product
  function decrement(product) {
    product.count = Math.max(0, product.count - 1); // Prevent negative count
  }
  
  // Reset count for a specific product
  function reset(product) {
    product.count = 0;
    const kartItem = kart.value.findIndex(item => item.id === product.id);
    // console.log('asdasdasd',kartItem)
    kart.value.splice(kartItem,1)
    console.log('adasdad',kart.value)
    // kart.value=([])
      // eventBus.emit('set-kart',kart.value);
  }
  //  function reset(){
  //   kart.value=([])
  //   eventBus.emit('add-kart',{kart});
  //  }
 
  // Fetch products when component is mounted
  onMounted(fetchProducts);
  </script>
  
  <style>
  .grid-container {
    display: grid;
    grid-template-columns: 210px 210px 210px 210px 210px   ;
    gap: 25px;
    
  
  }
  
  .card-img-top {
    width: 100%; 
    height: auto; 
  }
  
  
  
  @media screen and (max-width:375px) {
    .your-element{
      max-height: 667px;
    }
  
    .grid-container {
    display: grid;
    grid-template-columns: 30px 30px   ;
    gap: 150px;
    margin-left: -0.7cm;
  
    }
  
    .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    width: 140px;
    margin: auto;
    text-align:center;
    font-family: arial;
    height:484px;
    
  }
  
  .card-img-top {
    width: 100%; 
    height: auto;
  }
    
  }
  
  
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    margin: auto;
    text-align:center;
    font-family: arial;
    height:484px;
    
  }
  
  .filter_section {
    margin-left: -1cm;
  }
  
  .search_bar{
    width: 4cm;
  }
  
  @media screen and (max-width:414px) {
    .grid-container {
    display: grid;
    grid-template-columns: 30px 30px   ;
    gap: 150px;
    margin-left: -0.3cm;
  
    }
  
    .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    width: 140px;
    margin: auto;
    text-align:center;
    font-family: arial;
    height:484px;
    
  }
  
  .card-img-top {
    width: 100%; 
    height: auto;
  }
    
  }
  
  
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    margin: auto;
    text-align:center;
    font-family: arial;
    height:484px;
    
  }
  
  @media screen and (max-width:200px) {
    .your-element{
      max-height: 667px;
    }
  
    .grid-container {
    display: grid;
    grid-template-columns: 40px   ;
    gap: 150px;
    margin-left: -0.7cm;
  
    }
  
    .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    width: 140px;
    margin: auto;
    text-align:center;
    font-family: arial;
    height:484px;
    
  }
  
  .card-img-top {
    width: 100%; 
    height: auto;
  }
    
  }
  
  
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    margin: auto;
    text-align:center;
    font-family: arial;
    height:550px;
    
  }
  
  .filter_section {
    margin-left: -1cm;
  }
  
  .search_bar{
    width: 4cm;
  }
  
  .popup{
    background-color: #555;
    color: white;
    padding: 16px 20px;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    position: fixed;
    bottom: 23px;
    right: 28px;
    width: 100px;
  }
  </style>
   
  
  
  