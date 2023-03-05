import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ComponentA from './ComponentA';

describe('ComponentA', () => {
  const mockStore = configureStore();
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      inputValue: '',
    });

    component = render(
      <Provider store={store}>
        <ComponentA />
      </Provider>,
    );
  });

  it('updates the input value in the redux store', () => {
    const input = component.getByTestId('input-field');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(store.getState().inputValue).toEqual('new value');
  });

  it('renders the input value in Component C', () => {
    store = mockStore({
      inputValue: 'test value',
    });
    component.rerender(
      <Provider store={store}>
        <ComponentA />
      </Provider>,
    );

    const componentC = component.getByTestId('component-c');
    expect(componentC.textContent).toEqual('test value');
  });
});