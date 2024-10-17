import { createStore } from "vuex";

export default createStore({
  state: {
    cursos: [
      {
        id: 1,
        img: "https://i.blogs.es/545cf8/es6-logo/450_1000.png",
        nombre: "JavaScript Avanzado",
        costo: 30000,
        duracion: "2 meses",
        cupos: 20,
        inscritos: 10,
        completado: false,
        fecha_registro: "06-03-2022",
        descripcion: "Curso con las nuevas actualizaciones de JavaScript.",
      },
      {
        id: 2,
        img: "https://lineadecodigo.com/wp-content/uploads/2014/04/css.png",
        nombre: "CSS para principiantes",
        costo: 10000,
        duracion: "1 mes",
        cupos: 35,
        inscritos: 23,
        completado: false,
        fecha_registro: "05-03-2022",
        descripcion: "Aprendiendo estilos con CSS desde el nivel más básico.",
      },
      {
        id: 3,
        img: "https://1000marcas.net/wp-content/uploads/2020/11/JavaScript-logo.jpg",
        nombre: "JavaScript Básico de 0 a 100",
        costo: 20000,
        duracion: "2 meses",
        cupos: 25,
        inscritos: 0,
        completado: true,
        fecha_registro: "05-03-2022",
        descripcion: "Programando para la web con JavaScript.",
      },
      {
        id: 4,
        img: "https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png",
        nombre: "HTML Básico",
        costo: 10000,
        duracion: "1 mes",
        cupos: 35,
        inscritos: 0,
        completado: true,
        fecha_registro: "31-01-2022",
        descripcion:
          "Aprende HTML 5 y crea tus primeras páginas web paso a paso con decenas de ejercicios.",
      },
      {
        id: 5,
        img: "https://logosandtypes.com/wp-content/uploads/2020/08/vue.svg",
        nombre: "Vue JS de 0 a 100",
        costo: 85500,
        duracion: "5 meses",
        cupos: 35,
        inscritos: 35,
        completado: false,
        fecha_registro: "06-03-2022",
        descripcion:
          "Aprende desde cero como usar VueJS, cómo usarlo en aplicaciones pequeñas y ver lo que ofrece el framework.",
      },
      {
        id: 6,
        img: "https://miro.medium.com/max/512/1*9U1toerFxB8aiFRreLxEUQ.png",
        nombre: "Estilos con SASS",
        costo: 45000,
        duracion: "1 mes",
        cupos: 40,
        inscritos: 35,
        completado: false,
        fecha_registro: "06-03-2022",
        descripcion:
          "Con SASS aprenderás a escribir mejor código de CSS con todas las funciones necesarias.",
      },
    ],
  },
  getters: {
    obtenerCursos: (state) => {
      return state.cursos.map((curso) => {
        return {
          ...curso,
          // Formateo de fecha
          fecha_registro: new Date(curso.fecha_registro.split('-').reverse().join('-')).toLocaleDateString(
            "es-ES",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }
          ),
        };
      });
    },

    // devuelve un curso específico según su id
    obtenerCursoPorId: (state) => (id) =>
      state.cursos.find((curso) => curso.id === id),

    // suma la cantidad total de alumnos inscritos en todos los cursos
    totalInscritos: (state) => {
      return state.cursos.reduce((total, curso) => total + curso.inscritos, 0);
    },

    // calcula la cantidad total de cupos restantes
    cuposRestantes: (state) => {
      const totalPermitido = 109; // total de cupos permitidos
      const totalInscritos = state.cursos.reduce(
        (total, curso) => total + curso.inscritos,
        0
      );
      return totalPermitido - totalInscritos; // retorna los cupos restantes
    },

    // cuenta cuántos cursos han sido completados
    totalCursosTerminados: (state) => {
      return state.cursos.filter((curso) => !curso.completado).length;
    },

    // cuenta cuántos cursos están activos
    totalCursosActivos: (state) => {
      return state.cursos.filter((curso) => curso.completado).length;
    },

    // cuenta el total de cursos disponibles
    totalCursos: (state) => {
      return state.cursos.length;
    },
  },
  mutations: {
    agregarCurso(state, curso) {
      // Formateo de fecha
      curso.fecha_registro = new Date(curso.fecha_registro.split('-').reverse().join('-')).toLocaleDateString("es-ES", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      state.cursos.push(curso);
    },
    editarCurso(state, cursoEditado) {
      // Formateo de fecha
      cursoEditado.fecha_registro = new Date(cursoEditado.fecha_registro.split('-').reverse().join('-')).toLocaleDateString("es-ES", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const index = state.cursos.findIndex(curso => curso.id === cursoEditado.id);
      if (index !== -1) {
        state.cursos[index] = cursoEditado;
      }
    },
    // elimina un curso según su id
    eliminarCurso(state, cursoId) {
      state.cursos = state.cursos.filter((curso) => curso.id !== cursoId);
    },
  },
  actions: {
    // acción para agregar un curso
    agregarCurso({ commit }, curso) {
      commit("agregarCurso", curso);
    },
    // acción para eliminar un curso
    eliminarCurso({ commit }, cursoId) {
      commit("eliminarCurso", cursoId);
    },
    // acción para editar un curso
    editarCurso({ commit }, cursoEditado) {
      commit("editarCurso", cursoEditado);
    },
  },
  modules: {},
});
