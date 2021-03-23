import React from 'react';

const MainLayout = ({children}) => {
  return (
    <>
      <h1 className="Search__title">
        🔥 Github Gists App
      </h1>
      <main>{children}</main>
    </>
  )
}

export default MainLayout;