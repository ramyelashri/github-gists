import React from 'react';
import TopBar from 'components/TopBar';

const Main = ({children}) => {
  return (
    <>
      <TopBar/>
      <main>{children}</main>
    </>
  )
}

export default Main;