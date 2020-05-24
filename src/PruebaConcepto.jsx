import React, { useEffect, Fragment } from 'react';
import shortid from 'shortid';

export default function PruebaConcepto(props) {
  const { children } = props; // eslint-disable-line react/prop-types
  useEffect(() => {
    console.dir('Mounting...'); // eslint-disable-line no-console
    return () => {
      console.dir('Unmounting...'); // eslint-disable-line no-console
    };
  }, []);
  return <Fragment key={shortid.generate()}>{children}</Fragment>;
}
