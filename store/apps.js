export const state = () => ({
  calculator: false
});

export const mutations = {
    SET_CALCULATOR(state, valueBoolean){
        state.calculator = valueBoolean
    }
}
