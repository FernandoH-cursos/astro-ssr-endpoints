<!-- UI -->
<template>
  <!-- Muestra  cuando 'isLoading' esta en true  -->
  <div v-if="isLoading">Loading...</div>

  <!-- Muestra  cuando 'likeCount === 0'  -->
  <button v-else-if="likeCount === 0" @click="likePost">Like Counter</button>

  <!-- Sino Muestra  los likes  -->
  <button v-else @click="likePost">
    Likes 
    <span>{{ likeCount }}</span>
  </button>
</template>

<!-- Logica TS-->
<script lang="ts" setup>

import { actions } from 'astro:actions';

import { ref, watch } from 'vue';

import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';

interface Props{
  postId: string;
}

const { postId } = defineProps<Props>();

//* Variables reactivas
const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);


//* Efecto secundario - Se ejecuta cada vez que 'likeCount' cambie.
// 'debounce' permite que al hacer click varias veces en el boton de likes no se hagan tantas resquests al servidor,se
// esperan 500 ms para hacer la peticion. 
watch(likeCount, debounce(async() => {
  await actions.updatePostLikes({postId,likes: likeClicks.value});

  // Resetear clicks a 0 para no cometer errores de calculo
  likeClicks.value = 0;
},500));


// Marcar como like un post
const likePost = () => {
  // Incrementar likes y clicks
  likeCount.value++;
  likeClicks.value++;

  // Mostrar confettis
  confetti({
    particleCount: 100,
    spread: 70,
    origin: {
      x: Math.random(),
      y: Math.random() - 0.2
    }
  });
}

// Obtener likes actuales del post
const getCurrentLikes = async () => {
  // Invocando Server action para obtener likes de un post 
  const {data} = await actions.getPostLikes(postId);

  likeCount.value = data!.likes;
  isLoading.value = false;
}

getCurrentLikes();
</script>

<!-- Estilos locales -->
<style scoped>

button{
  background-color: #5e51bc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all .3s;
}

button:hover{
  background-color: #4a3f9a;
}
</style>
