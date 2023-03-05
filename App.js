import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import './App.css';

// Action Types
const UPDATE_VALUE = 'UPDATE_VALUE';

// Action Creators
const updateValue = (value) => ({
  type: UPDATE_VALUE,
  payload: value,
});

// Reducer
const initialState = {
  value: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};

// Store
const store = createStore(reducer);

// Component B
class ComponentB extends React.Component {
  handleChange = (event) => {
    const { dispatch } = this.props;
    dispatch(updateValue(event.target.value));
  };

  render() {
    return (
      <div>
        <label>
          Input Value:
          <input type="text" onChange={this.handleChange} />
        </label>
      </div>
    );
  }
}

// Component C
const ComponentC = ({ value }) => (
  <div>
    Value from Store: {value}
  </div>
);

const mapStateToProps = (state) => ({
  value: state.value,
});

const ConnectedComponentC = connect(mapStateToProps)(ComponentC);

// Component A
const ComponentA = () => (
  <div>
    <h1>Component A</h1>
    <ComponentB />
    <ConnectedComponentC />
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <ComponentA />
    </Provider>
  );
}

export default App;
