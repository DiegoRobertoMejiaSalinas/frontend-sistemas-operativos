import {
    appConfig
  } from "@/env.js"
  
  export default function ({
    context,
    app
  }) {
    return {
      httpEndpoint: appConfig.graphUrl,
      // getAuth:() => `Bearer ${token}`, // use this method to overwrite functions
      inMemoryCacheOptions: {
        addTypename: false
      }
    };
  }
  