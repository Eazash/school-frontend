export default function ({route, store, redirect}) {
  if (route.name !== 'login' && !store.getters.authenticated){
    return redirect("/login");
  } if (route.name === "login" && store.getters.authenticated) {
    return redirect("/");
  }
}