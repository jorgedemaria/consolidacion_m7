<template>
  <div class="max-w-xs rounded bg-white overflow-hidden shadow-xl m-4">
    <div class="p-2">
      <img
        :src="curso.img"
        class="w-full h-28 object-contain mt-6"
        :alt="curso.nombre"
      />
    </div>
    <div class="px-4 py-2">
      <h2 class="font-bold text-sky-600 text-lg px-3 mb-4">
        {{ curso.nombre }}
      </h2>
      <p class="text-gray-700 text-base italic px-3 mb-2">Información:</p>
      <div class="flex justify-between">
        <div class="p-3 rounded">
          <p class="text-sm"><strong>Costo:</strong> ${{ curso.costo }} CLP</p>
          <p class="text-sm"><strong>Duración:</strong> {{ curso.duracion }}</p>
        </div>
        <div class="p-3">
          <p class="text-sm"><strong>Cupos:</strong> {{ curso.cupos }}</p>
          <p class="text-sm">
            <strong>Inscritos:</strong> {{ curso.inscritos }}
          </p>
        </div>
      </div>
      <div class="p-3">
        <p class="text-sm">
          <strong>Fecha de registro:</strong> {{ curso.fecha_registro }}
        </p>
      </div>
      <div class="p-3">
        <p class="text-sm">
          <strong>Descripción:</strong> {{ curso.descripcion }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    curso: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
