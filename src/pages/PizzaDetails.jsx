import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const PizzaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get('https://62cbe0dea080052930a0692f.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('К сожалению, пицца не была найдена.');
        navigate('/');
      }
    };

    fetchPizza();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pizza) {
    return <Spinner />;
  }

  // TODO: write pleasant styles for PizzaDetails component
  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <h2>{pizza.price} ₴</h2>
    </div>
  );
};

export default PizzaDetails;
