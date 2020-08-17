import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'

import './stylesheet/App.css'
import './stylesheet/bootstrap.min.css'
import ProductLanding from './components/ProductLanding'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="black-bg">
            <Route path="/products" component={ProductLanding} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
