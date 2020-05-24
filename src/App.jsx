import React from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component';

export default function App() {
  const Component = loadable(() => import('./RenderComponent'));
  return <Component />;
}

ReactDOM.render(<App />, document.getElementById('app'));
