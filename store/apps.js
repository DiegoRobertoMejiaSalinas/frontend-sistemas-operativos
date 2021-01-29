export const state = () => ({
  calculator: false,
  notepad: false,
  browser: false
});

export const mutations = {
    SET_CALCULATOR(state, valueBoolean){
        state.calculator = valueBoolean
    },
    SET_NOTEPAD(state, valueBoolean){
        state.notepad = valueBoolean
    },
    SET_BROWSER(state, valueBoolean){
        state.browser = valueBoolean
    }
}
