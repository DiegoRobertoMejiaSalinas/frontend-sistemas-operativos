export const state = () => ({
  property: false,
  permissions: false,
  owner: "",
  rules: {
    writableRoot: false,
    readableRoot: false,
    writableUser: false,
    readableUser: false,
    writableGuest: false,
    readableGuest: false
  }
});

export const mutations = {
  SET_PROPERTY(state, value) {
    state.property = value;
  },
  SET_PERMISSIONS(state, value) {
    state.permissions = value;
  },
  SET_OWNER(state, string) {
    state.owner = string;
  },
  SET_RULES(state, rules) {
    state.rules = rules;
  }
};
