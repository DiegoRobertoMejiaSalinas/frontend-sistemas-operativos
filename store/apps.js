export const state = () => ({
  calculator: false,
  notepad: false,
  browser: false,
  chess: false,
  checkers: false,
  cutTheRope: false,
  bubbles: false,
  solitarie: false,
  maps: false,
  excel: false,
  word: false
});

export const mutations = {
  SET_CALCULATOR(state, valueBoolean) {
    state.calculator = valueBoolean;
  },
  SET_NOTEPAD(state, valueBoolean) {
    state.notepad = valueBoolean;
  },
  SET_BROWSER(state, valueBoolean) {
    state.browser = valueBoolean;
  },
  SET_CHESS(state, valueBoolean) {
    state.chess = valueBoolean;
  },
  SET_CHECKERS(state, valueBoolean) {
    state.checkers = valueBoolean;
  },
  SET_CUT_THE_ROPE(state, valueBoolean) {
    state.cutTheRope = valueBoolean;
  },
  SET_BUBBLES(state, valueBoolean) {
    state.bubbles = valueBoolean;
  },
  SET_SOLITARIE(state, valueBoolean) {
    state.solitarie = valueBoolean;
  },
  SET_EXCEL(state, valueBoolean) {
    state.excel = valueBoolean;
  },
  SET_WORD(state, valueBoolean) {
    state.word = valueBoolean;
  },
  SET_MAPS(state, valueBoolean) {
    state.maps = valueBoolean;
  }
};
