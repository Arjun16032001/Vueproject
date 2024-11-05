<!-- src/components/Layout.vue -->
<template>
    <div class="layout">
        <Nav />
    </div>
  </template>
  
  <script setup>
   import { ref,computed, onMounted, provide } from 'vue';
   import { eventBus } from '@/eventBus';
   import Nav from './Nav.vue';

   

// const localProducts = ref([...JSON.parse(localStorage.getItem('cartList'))]);
// // console.log('kart',localProducts.value)


const count = computed(() => kart.value.length);

const kart = ref([]);

provide('sndkart',kart)


eventBus.on('set-kart', (val) => {
  console.log('set kart', val)
    kart.value = val


    console.log('kar vlue', kart)
  });

// eventBus.emit('sndnav',kart.value)


// eventBus.on('add-kart', (val) => {
//     console.log('Received event payload:', val); 
//     if (val && val.kart && val.kart.value) {
//       localProducts.value = val.kart.value; 
//       console.log('Updated localProducts:', localProducts.value);
//     } else {
//       console.warn('Unexpected payload structure:', val); 
//     }
//   });

  
  
  </script>
  
  <style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Ensure the layout takes the full height */
  }
  
  .header {
  background-color: #4CAF50; 
  padding: 10px; 
  color: white; 
  display: flex; 
  justify-content: flex-end; 
  width: 100%; /* Ensure the header takes the full width */
  position: fixed; /* Make the header fixed at the top */
  top: 0; /* Align the header at the top of the page */
  left: 0; /* Align to the left edge */
  z-index: 1000; /* Ensure it stays on top of other content */
}

  
  .nav {
    display: flex; /* Enable flexbox for navigation links */
  }
  
  .nav-link {
    margin: 0 15px; /* Margin between links */
    color: white; /* Link color */
    text-decoration: none; /* Remove underline */
  }
  
  .nav-link:hover {
    text-decoration: underline; /* Underline on hover */
  }
  
  .main-content {
    flex: 1; /* Take up available space */
    padding: 20px; /* Padding for main content */
  }
  
  .footer {
    background-color: #333; /* Footer background */
    color: white; /* Footer text color */
    text-align: center; /* Center footer text */
    padding: 10px 0; /* Padding for footer */
  }

  .notification {
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  padding: 5px 15px;
  position: relative;
  display: inline-block;
  border-radius: 2px;
}

.notification:hover {
  background: red;
}

.badge {
  position: absolute;
  top: -2px;
  right: 4px;
  padding: 3px 5px;
  border-radius: 50%;
  background: red;
  color: white;
}
  </style>
  