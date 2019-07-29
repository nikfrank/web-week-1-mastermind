import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store, { initState } from './store';

import './enzyme-config';
import { mount } from 'enzyme';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App/></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the App with a code', ()=> {
  const p = mount(<Provider store={store}><App/></Provider>);

  expect(p.find('CodeInput')).toHaveLength( 1 );

  const nextCode = initState.code.map((digit, i)=> (
    i ? digit : (digit + 1) % 6
  ));  // [2, 2, 3, 4]

  expect( store.getState().code ).toEqual( initState.code );

  p.find('.up0').at(0).simulate('click');

  expect( store.getState().code ).toEqual( nextCode );
});


it('guesses the code', ()=> {
  const p = mount(<Provider store={store}><App/></Provider>);

  const guessButton = p.find('button.guess');

  expect( guessButton ).toHaveLength( 1 );

  const initState = store.getState();

  guessButton.at(0).simulate('click');

  const stateAfterClick = store.getState();

  expect( stateAfterClick.guesses.length ).toEqual(
    initState.guesses.length + 1
  );

  const guessDivs = p.find('.guess-container');

  expect( guessDivs ).toHaveLength( stateAfterClick.guesses.length );

  const guessDots = p.find('.guess-container div');

  //expect( guessDots )
});







//
