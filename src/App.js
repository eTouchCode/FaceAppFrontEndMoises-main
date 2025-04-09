import React from 'react';
import { Provider } from 'react-redux';
import store from "./Store/store";
import RouterHome from './RouterHome';

const App = () => {
  return ( 
<Provider store={store}> 
      <div>
        <RouterHome />
      </div>
</Provider>   
  );
};

export default App;
