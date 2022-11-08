import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form.jsx';
import Wardrobe from './Wardrobe.jsx';
import { useParams } from 'react-router-dom';

export default function Dashboard() {
  const { user_id } = useParams();
  const [token, setToken] = useState('');
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  console.log(user_id);
  return (
    <>
      <div className='optionContainer'>
        <div className='fitCheckContainer'>
          <Link to='/fitCheck'>
            <button className='btnGoFit'>Go to Fitcheck</button>
          </Link>
        </div>
        <Form
          userId={user_id}
          token={token}
          refetch={refetch}
          setRefetch={setRefetch}
        />
      </div>
      <br></br>
      <Wardrobe userId={user_id} token={token} />
    </>
  );
}
