import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store, { initState, actions } from './store';

import score from './score';

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
    i ? digit : (digit + 5) % 6
  ));  // [0, 2, 3, 4]

  expect( store.getState().code ).toEqual( initState.code );

  p.find('.dn0').at(0).simulate('click');

  expect( store.getState().code ).toEqual( nextCode );
});


it('guesses the code', ()=> {
  const p = mount(<Provider store={store}><App/></Provider>);

  const guessButton = p.find('button.guess');

  expect( guessButton ).toHaveLength( 1 );

  const state = store.getState();

  guessButton.at(0).simulate('click');

  const stateAfterClick = store.getState();

  expect( stateAfterClick.guesses ).toHaveLength(
    state.guesses.length + 1
  );

  const guessDivs = p.find('.guess-container');

  expect( guessDivs ).toHaveLength( stateAfterClick.guesses.length );

  const guessDots = p.find('.guess-container div');

  expect(
    guessDots.at(0).hasClass('dot-'+stateAfterClick.guesses[0][0])
  ).toEqual( true );

  expect(
    guessDots.at(1).hasClass('dot-'+stateAfterClick.guesses[0][1])
  ).toEqual( true );

  expect(
    guessDots.at(2).hasClass('dot-'+stateAfterClick.guesses[0][2])
  ).toEqual( true );

  expect(
    guessDots.at(3).hasClass('dot-'+stateAfterClick.guesses[0][3])
  ).toEqual( true );


  expect( stateAfterClick.scores ).toHaveLength(
    state.scores.length + 1
  );

  expect( stateAfterClick.scores.reverse()[0] )
    .toEqual( score(state.secret)(state.code) );

  const blacks = p.find('.black');
  const whites = p.find('.white');

  expect( blacks ).toHaveLength( stateAfterClick.scores[0][0] );
  expect( whites ).toHaveLength( stateAfterClick.scores[0][1] );
});

it('ends the game when the user guesses the secret', ()=> {
  const p = mount(<Provider store={store}><App/></Provider>);

  const state = store.getState();

  store.dispatch( actions.setCode(state.secret) );

  p.find('button.guess').at(0).simulate('click');

  const nextState = store.getState();

  expect( nextState.scores[ nextState.scores.length - 1 ])
    .toEqual([ 4, 0 ]);

  const nextGuessButton = p.find('button.guess');

  expect( nextGuessButton ).toHaveLength( 0 );

  const newGameButton = p.find('button.new-game');

  expect( newGameButton ).toHaveLength( 1 );

  p.find('button.new-game').at(0).simulate('click');

  const newGameState = store.getState();

  expect( newGameState.scores ).toHaveLength( 0 );
  expect( newGameState.guesses ).toHaveLength( 0 );

  expect( newGameState.secret ).not.toEqual( state.secret );
});







//
