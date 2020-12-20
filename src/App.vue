<template>
 <v-app id="app">
      <v-container>
        <router-view></router-view>

      </v-container>

    
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
  }),
};
</script>
