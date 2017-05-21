export default function ({store, params, redirect}) {
  console.log(params)
  if( !store.state.authUser || store.state.authUser.id != params.id )
    return redirect('/user/' + params.id)
}
