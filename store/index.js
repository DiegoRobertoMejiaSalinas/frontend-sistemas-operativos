export const state = () => ({
  number: 2,
  openExplorer: false,
  activeFolder: null,

  typeClipboard: "",
  clipboard: null,
  idClipboard: null
});

export const mutations = {
  CHANGE_NUMBER(state, value) {
    state.number = value;
  },
  CLOSE_EXPLORER(state) {
    state.openExplorer = false;
  },
  OPEN_EXPLORER(state) {
    state.openExplorer = true;
  },
  SET_FOLDER(state, data) {
    state.activeFolder = data;
  },
  CLEAN_FOLDER(state) {
    state.activeFolder = null;
  },
  SET_TYPE_CLIPBOARD(state, string) {
    state.typeClipboard = string;
  },
  SET_CLIPBOARD(state, item) {
    state.clipboard = item;
    state.idClipboard = item.id;
  },
  CLEAN_CLIPBOARD(state) {
    state.clipboard = null;
    state.idClipboard = null;
  }
};

export const actions = {
  changeNumber(context, value) {
    context.commit("CHANGE_NUMBER", value);
  },
  closeExplorer(context) {
    context.commit("CLEAN_FOLDER");
    context.commit("CLOSE_EXPLORER");
  },
  openExplorer(context, folder) {
    context.commit("SET_FOLDER", folder);
    context.commit("OPEN_EXPLORER");
  },
  setFolder(context, folder) {
    context.commit("SET_FOLDER", folder);
  },
  setClipboard(context, folder) {
    context.commit("SET_CLIPBOARD", folder);
  },
  cleanClipboard(context) {
    context.commit("CLEAN_CLIPBOARD");
  },
  cutClipboard(context, folder) {
    context.commit("SET_TYPE_CLIPBOARD", "cut");
    context.commit("SET_CLIPBOARD", folder);
  },
  copyClipboard(context, folder) {
    context.commit("SET_TYPE_CLIPBOARD", "copy");
    context.commit("SET_CLIPBOARD", folder);
  }
};
