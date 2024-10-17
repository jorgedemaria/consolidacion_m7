<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <h2 class="text-xl font-bold mb-4">
        {{ editing ? "Editar Curso" : "Agregar Curso" }}
      </h2>

      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-2 gap-4">
          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Nombre del curso</label>
            <input
              v-model="curso.nombre"
              type="text"
              class="border rounded w-full py-2 px-3 text-sm text-sm"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">URl de la imagen</label>
            <input
              v-model="curso.img"
              type="text"
              class="border rounded w-full py-2 px-3 text-sm"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Cupos</label>
            <input
              v-model.number="curso.cupos"
              type="number"
              class="border rounded w-full py-2 px-3 text-sm"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Inscritos</label>
            <input
              v-model.number="curso.inscritos"
              type="number"
              class="border rounded w-full py-2 px-3 text-sm"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Duración</label>
            <input
              v-model.number="curso.duracion"
              type="text"
              class="border rounded w-full py-2 px-3 text-sm"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Fecha de registro</label>
            <input
              v-model="curso.fecha_registro"
              type="date"
              class="border rounded w-full py-2 px-3 text-sm"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">Costo</label>
            <input
              v-model.number="curso.costo"
              type="number"
              class="border rounded w-full py-2 px-3 text-sm"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-bold mb-2">¿Completado?</label>
            <div class="flex items-center">
              <input
                v-model="curso.completado"
                type="radio"
                value="true"
                id="completado-sí"
                class="mr-2 text-sm"
              />
              <label for="completado-sí" class="mr-4">Sí</label>

              <input
                v-model="curso.completado"
                type="radio"
                value="false"
                id="completado-no"
                class="mr-2"
              />
              <label for="completado-no">No</label>
            </div>
          </div>

          <div class="mb-4 col-span-2">
            <label class="block text-sm font-bold mb-2">Descripción</label>
            <input
              v-model="curso.descripcion"
              type="text"
              class="border rounded w-full py-2 px-3 text-sm text-sm"
              required
            />
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-500 mb-4">
          {{ errorMessage }}
        </div>

        <div class="flex justify-end">
          <button
            @click="closeModal"
            type="button"
            class="bg-gray-400 hover:bg-sky-800 text-white px-4 py-2 rounded mr-2 text-sm hover:bg-sky-800"
          >
            Cancelar
          </button>

          <button
            v-if="!editing"
            @click="limpiarFormulario"
            type="button"
            class="bg-yellow-500 hover:bg-sky-800 text-white px-4 py-2 rounded mr-2 text-sm"
          >
            Limpiar Formulario
          </button>

          <button
            type="submit"
            class="bg-sky-600 text-white px-4 py-2 rounded text-sm hover:bg-sky-800"
          >
            {{ editing ? "Guardar Cambios" : "Agregar Curso" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    isOpen: Boolean,
    cursoInicial: {
      type: Object,
      default: () => ({
        nombre: "",
        costo: 0,
        duracion: "",
        completado: false,
        inscritos: 0,
        cupos: 0,
        fecha_registro: "",
      }),
    },
    editing: Boolean,
  },
  data() {
    return {
      curso: { ...this.cursoInicial },
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions(["agregarCurso", "editarCurso"]),
    closeModal() {
      this.$emit("close");
    },
    handleSubmit() {
      if (this.curso.inscritos > this.curso.cupos) {
        this.errorMessage =
          "Error: La cantidad de inscritos no puede ser mayor que los cupos disponibles.";
        return;
      }

      this.errorMessage = "";
      if (this.curso.completado === "true") {
        this.curso.inscritos = 0;
      }

      // Comprobar si la fecha de registro es válida
      if (!this.isValidDate(this.curso.fecha_registro)) {
        this.errorMessage = "Error: Fecha de registro no válida.";
        return;
      }

      if (this.editing) {
        this.editarCurso(this.curso);
      } else {
        this.curso.id = Date.now();
        this.agregarCurso(this.curso);
      }

      this.closeModal();
    },
    limpiarFormulario() {
      this.curso = { ...this.cursoInicial };
      this.setFechaRegistro();
      this.errorMessage = "";
    },
    setFechaRegistro() {
      if (!this.editing) {
        this.curso.fecha_registro = new Date().toISOString().slice(0, 10);
      }
    },
    isValidDate(dateString) {
      const date = new Date(dateString);
      return date instanceof Date && !isNaN(date);
    },
  },
  watch: {
    cursoInicial: {
      immediate: true,
      handler(newVal) {
        this.curso = { ...newVal };
        this.setFechaRegistro(); 
      },
    },
  },
};
</script>



<style scoped></style>
