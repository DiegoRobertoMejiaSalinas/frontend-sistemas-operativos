export const state = () => ({
  folderToModify: null,
  typeEditor: "Crear",
  openEditor: false,
  type: ""
});

export const mutations = {
  CLOSE_EDITOR(state) {
    state.openEditor = false;
  },
  OPEN_EDITOR(state) {
    state.openEditor = true;
  },
  CLEAN_FOLDER_TO_MODIFY(state) {
    state.folderToModify = null;
  },
  SET_FOLDER_TO_MODIFY(state, data) {
    state.folderToModify = data;
  },
  SET_TYPE_EDITOR(state, string) {
    state.typeEditor = string;
  },
  SET_TYPE(state, string) {
    state.type = string;
  }
};

export const actions = {
  closeEditor(context) {
    context.commit("CLEAN_FOLDER_TO_MODIFY");
    context.commit("CLOSE_EDITOR");
    context.commit("SET_TYPE_EDITOR", "Crear");
  },
  openEditor(context) {
    context.commit("CLEAN_FOLDER_TO_MODIFY");
    context.commit("OPEN_EDITOR");
  },
 

  //   SPECIFIC CASES
  createFolder(context) {
    context.commit("SET_TYPE_EDITOR", "Crear Directorio");
    context.commit("SET_TYPE", "folder");
    context.commit("CLEAN_FOLDER_TO_MODIFY");
    context.commit("OPEN_EDITOR");
  },
  createFile(context) {
    context.commit("SET_TYPE_EDITOR", "Crear Archivo");
    context.commit("SET_TYPE", "file");
    context.commit("CLEAN_FOLDER_TO_MODIFY");
    context.commit("OPEN_EDITOR");
  },
  editFolder(context, file) {
    // context.commit("SET_TYPE", "folder");
    context.commit("SET_TYPE_EDITOR", "Editar Folder " + file.name);
    context.commit("OPEN_EDITOR");
  },
  editFile(context, file) {
    // context.commit("SET_TYPE", "file");
    context.commit("SET_TYPE_EDITOR", "Editar Archivo " + file.name);
    context.commit("OPEN_EDITOR");
  },
  setType(context, string) {
    context.commit("SET_TYPE", string);
  },
  setFolder(context, item) {
    context.commit("SET_FOLDER_TO_MODIFY", item);
  },
};
