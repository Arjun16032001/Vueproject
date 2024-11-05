<template>
    <header class="header">
            <nav class="nav">
                <router-link to="/products" class="nav-link">Products</router-link>
                <router-link to="/kart" class="nav-link">Kart</router-link>
                <span class="badge">{{ count }}</span>
            </nav>
        </header>
        <main class="main-content">
          kart {{ String(kart) }}
        <router-view />
      </main>
</template>
<script setup>
import { eventBus } from '@/eventBus';
import { ref,computed, inject } from 'vue';

const kart = ref([]);

eventBus.on('sndnav',(val)=>{
     console.log('Bal', val)
    kart.value = val
}
);

eventBus.on('set-kart',(val)=>{
    kart.value = val
}
);

// const kart = inject('sndkart')



const count = computed(() => kart.value.length);
</script>

<style>
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