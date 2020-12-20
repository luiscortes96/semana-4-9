<template>
  <v-container>
    <v-carousel :show-arrows="false" height="300px">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>

    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col  v-for="(title, i) in titles"
        :key="i"
        :src="title.src">
          <v-card class="pa-2" outlined tile>
            <v-card class="mx-auto" max-width="300">
              <v-img
                class="white--text align-end"
                height="200px"
                :src=title.src
              >
              </v-img>
              <v-card-subtitle class="pb-0"> {{title.name}}</v-card-subtitle>
              <v-card-actions>
                <v-btn color="blue" text> Ver más </v-btn>
              </v-card-actions>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    items: [
      {
        src: "https://lh3.googleusercontent.com/proxy/6RCKVpwLoX5BoI6O9YvvqROpZ0qxgKsXx9O9Nfn0deoYbK5GKn8iW3dpWnAGTmATD-98eHJCn8Lc35QMWs_AfUF0sjfyILiTllvscSgxDP6dDSIOSu2LlsNQskIly8VuwfEYhhrvNKYQ-XXp9RBnIcK-AF4hDE3twjzT9hT07F-1wpXzRMXWmGglHwGA0jfL8os-97KnJxnr2EllIHjF",
      },
      {
        src: "https://nestor.marketing/wp-content/uploads/2020/10/marketing-digital-venezuela.jpg",
      },
      {
        src: "https://i0.wp.com/prometeusgs.com/wp-content/uploads/2019/02/KPIs-anal%C3%ADtica-de-datos.jpg?fit=1024%2C512&ssl=1"
            },
    ],
    titles: [
      {
        src: "https://www.ealde.es/wp-content/uploads/2019/05/gestion-de-personas-recursos-humanos.jpg",
        name:"Diagnóstico y gestión de    recursos humanos",
        url: "https://www.openmet.com/openmet_people/",
      },
      {
        src: "https://postgrado.upn.edu.pe/sites/default/files/styles/1200_x_628__fb_post_/public/upn_blog_epec_gestion-clientes_07-mar_0.jpg?itok=wD5ckeGS",
        name:"Diagnóstico y consultoría de la Satisfacción, Experiencia, Opinión y Perfil de Clientes",
        url: "https://www.openmet.com/openmet-customers/",
      },
      {
        src: "https://www.ionos.es/digitalguide/fileadmin/DigitalGuide/Teaser/data-mining-t.jpg",
        name:"Software de Analítica de datos profesional y Encuestas electrónicas",
        url: "https://www.openmet.com/openmet-feedback-manager/",
      },
    ],
  }),
};
</script>
