export const state = () => ({
  number: 2,
  openExplorer: false,
  activeFolder: null
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
  }
};
