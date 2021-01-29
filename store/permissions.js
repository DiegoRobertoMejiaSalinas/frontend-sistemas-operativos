export const state = () => ({
  property: false,
  permissions: false,
  owner: "",
  folderName: "",
  id: null,
  user: null,
  content: "",
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
  SET_ID(state, value){
    state.id = value
  },
  SET_USER_DATA(state, user){
    state.user= user
  },
  SET_CONTENT(state, content){
    state.content = content
  },
  SET_OWNER(state, string) {
    state.owner = string;
  },
  SET_FOLDER_NAME(state, string){
    state.folderName= string
  },
  SET_RULES(state, rules) {
    state.rules = rules;
  }
};
