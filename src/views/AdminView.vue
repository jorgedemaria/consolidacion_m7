<template>
  <div class="flex justify-center mt-10"></div>
  <div class="">
    <div class="w-4/5 mx-auto">
      <div class="flex justify-between">
        <h1 class="text-2xl italic ml-36">ADMINISTRACIÓN</h1>
        <button
          @click="abrirModalAgregar"
          class="bg-sky-600 text-white text-sm px-2 py-2 mr-36 mb-6 rounded shadow-lg hover:bg-sky-800"
        >
          Agregar Curso
        </button>
      </div>

      <div class="flex justify-center">
        <div class="w-4/5">
          <table
            class="min-w-full bg-white border border-gray-200 shadow-xl mb-5"
          >
            <thead>
              <tr class="bg-sky-200 text-sky-800">
                <th class="py-4 px-4 border-b text-left">Curso</th>
                <th class="py-2 px-4 border-b text-left">Cupos</th>
                <th class="py-2 px-4 border-b text-left">Inscritos</th>
                <th class="py-2 px-4 border-b text-left">Duración</th>
                <th class="py-2 px-4 border-b text-left">Costo</th>
                <th class="py-2 px-4 border-b text-left">Terminado</th>
                <th class="py-2 px-4 border-b text-left">Fecha</th>
                <th class="py-2 px-4 border-b text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="curso in cursos"
                :key="curso.id"
                class="hover:bg-sky-100"
              >
                <td class="py-3 px-4 border-b text-sm">{{ curso.nombre }}</td>
                <td class="py-3 px-4 border-b text-sm">{{ curso.cupos }}</td>
                <td class="py-3 px-4 border-b text-sm">
                  {{ curso.inscritos }}
                </td>
                <td class="py-3 px-4 border-b text-sm">{{ curso.duracion }}</td>
                <td class="py-3 border-b text-sm">
                  <button
                    class="bg-green-500 text-white py-2 px-4 rounded-full"
                  >
                    ${{ curso.costo }}
                  </button>
                </td>
                <td class="py-3 pl-3 border-b text-sm">
                  <button
                    class="bg-green-500 text-white py-2 px-4 rounded-full"
                    v-if="curso.completado"
                  >
                    Sí
                  </button>
                  <button
                    class="bg-red-500 text-white py-2 px-4 rounded-full"
                    v-else
                  >
                    No
                  </button>
                </td>

                <td class="py-3 border-b text-sm">
                  <button
                    class="bg-green-500 text-white py-2 px-4 rounded-full"
                  >
                    ${{ curso.fecha_registro }}
                  </button>
                </td>
                <td class="py-3 px-4 border-b text-sm">
                  <button
                    @click="abrirModalEditar(curso)"
                    class="bg-gray-400 text-white px-2 py-1 rounded mr-2 text-sm hover:bg-sky-800"
                  >
                    Editar
                  </button>
                  <button
                    @click="confirmarEliminacion(curso.id)"
                    class="bg-sky-600 text-white px-2 py-1 rounded mr-2 text-sm hover:bg-sky-800"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="mt-4 space-y-2 w-1/2 mx-auto">
      <div
        class="alert bg-pink-100 text-pink-800 p-4 rounded text-sm border border-pink-300 shadow"
      >
        <strong>Cantidad total de alumnos permitidos:</strong> 109
      </div>
      <div
        class="alert bg-indigo-100 text-indigo-800 p-4 rounded mb-4 text-sm border border-indigo-300 shadow"
      >
        <strong>Cantidad total de alumnos inscritos:</strong>
        {{ totalInscritos }}
      </div>
      <div
        class="alert bg-yellow-100 text-yellow-800 p-4 rounded mb-4 text-sm border border-yellow-300 shadow"
      >
        <strong>Cantidad total de cupos restantes:</strong> {{ cuposRestantes }}
      </div>
      <div
        class="alert bg-green-100 text-green-800 p-4 rounded mb-4 text-sm border border-green-300 shadow"
      >
        <strong>Cantidad total de cursos terminados:</strong>
        {{ totalCursosTerminados }}
      </div>
      <div
        class="alert bg-blue-100 text-blue-800 p-4 rounded mb-4 text-sm border border-blue-300 shadow"
      >
        <strong>Cantidad total de cursos activos:</strong>
        {{ totalCursosActivos }}
      </div>
      <div
        class="alert bg-teal-100 text-teal-800 p-4 rounded mb-4 text-sm border border-teal-300 shadow"
      >
        <strong>Cantidad total de cursos:</strong> {{ totalCursos }}
      </div>
    </div>

    <CursoModal
      :isOpen="mostrarModal"
      :cursoInicial="cursoSeleccionado"
      :editing="editando"
      @close="cerrarModal"
    />

    <div
      v-if="mostrarConfirmacion"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 class="text-lg font-bold mb-4">
          ¿Estás seguro de que deseas borrar este curso?
        </h2>
        <div class="flex justify-end">
          <button
            @click="cancelarEliminacion"
            class="bg-gray-400 text-white px-4 py-2 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            @click="eliminarCurso(cursoIdAEliminar)"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CursoModal from "../components/CursoModal.vue";

export default {
  components: {
    CursoModal,
  },
  data() {
    return {
      mostrarModal: false,
      cursoSeleccionado: null,
      editando: false,
      mostrarConfirmacion: false,
      cursoIdAEliminar: null,
    };
  },
  computed: {
    ...mapGetters([
      "obtenerCursos",
      "totalInscritos",
      "cuposRestantes",
      "totalCursosTerminados",
      "totalCursosActivos",
      "totalCursos",
    ]),
    cursos() {
      return this.obtenerCursos;
    },
  },
  methods: {
    abrirModalAgregar() {
      this.cursoSeleccionado = {
        nombre: "",
        costo: 0,
        duracion: "",
        completado: false,
      };
      this.editando = false;
      this.mostrarModal = true;
    },
    abrirModalEditar(curso) {
      this.cursoSeleccionado = { ...curso };
      this.editando = true;
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    confirmarEliminacion(cursoId) {
      this.cursoIdAEliminar = cursoId;
      this.mostrarConfirmacion = true;
    },
    cancelarEliminacion() {
      this.mostrarConfirmacion = false;
      this.cursoIdAEliminar = null;
    },
    eliminarCurso(cursoId) {
      this.$store.dispatch("eliminarCurso", cursoId);
      this.mostrarConfirmacion = false;
      this.cursoIdAEliminar = null;
    },
  },
};
</script>

<style></style>
