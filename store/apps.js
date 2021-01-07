export const state = () => ({
  calculator: false,
  notepad: false
});

export const mutations = {
    SET_CALCULATOR(state, valueBoolean){
        state.calculator = valueBoolean
    },
    SET_NOTEPAD(state, valueBoolean){
        state.notepad = valueBoolean
    }
}
