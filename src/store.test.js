import store from './store';

it('boots the store', ()=> {
  const initState = store.getState();

  expect(typeof initState).toEqual('object');
});
