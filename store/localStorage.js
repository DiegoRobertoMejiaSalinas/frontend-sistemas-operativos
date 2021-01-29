export const state = () => ({
  userId: null,
  user: null
});

export const mutations = {
  SET_USER_ID(state, id){
    state.userId= id;
  },
  SET_USER(state, user){
    state.user = user;
  },

}

export const actions = {
  logout(context){
    context.commit("SET_USER_ID", null)
    context.commit("SET_USER", null)
  }
}