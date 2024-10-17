<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center mt-6 max-w-6xl mx-auto"
  >
    <CursoCard v-for="curso in cursos" :key="curso.id" :curso="curso" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CursoCard from "@/components/CursoCard.vue";

export default {
  components: {
    CursoCard,
  },
  computed: {
    ...mapGetters(["obtenerCursos"]),
    cursos() {
      return this.obtenerCursos;
    },
  },
};
</script>

<style scoped></style>
