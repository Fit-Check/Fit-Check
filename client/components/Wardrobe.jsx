import React from 'react';
import { useState, useEffect } from 'react';
import Clothes from './Clothes.jsx';

//  { log: 'Error caught in verifyToken middleware',
//    status: 400,
//    message: { err: 'Invalid token.' }
//  } error from global error handler
// -> error located in auth.mjs

const Wardrobe = ({ userId, setUserId, token, setToken }) => {
  const [wardrobe, setWardrobe] = useState([]);
  const [size, setSize] = useState(0);
  // on mount (useEffect) send get request to server to obtain all wardrobe data
  console.log(userId, token, 'userID and Token');
  function fetchData() {
    console.log('inside fetchData');
    fetch(`/clothes/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.json())
      .then((result) => {
        console.log(result, 'result');
        setWardrobe([...result.top, ...result.bottom]);
      })
      .catch((err) => {
        console.log('error after fetch', err);
      });
  }
  useEffect(() => {
    console.log('I was triggered');
    console.log(token, 'useEffect token');
    if (token) fetchData();
  }, [token]); // not sure on this

  // useEffect(() => {
  //   if (refetch) fetchData();
  // }, [refetch]);
  // `Bearer ${token string}`

  // loop through wardrobe state array
  const clothingArr = [];
  for (let i = 0; i < wardrobe.length; i++) {
    clothingArr.push(<Clothes clothing={wardrobe[i]} key={i}></Clothes>);
  }
  return (
    <div className='wardrobeBox'>
      <h2>~ In Your Closet ~</h2>
      {wardrobe.length ? (
        <div className='grid'>{clothingArr}</div>
      ) : (
        <h3>You have no clothes. Go buy some clothes!</h3>
      )}
    </div>
  );
};

export default Wardrobe;
