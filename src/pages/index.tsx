import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Title, Products } from '../styles/pages/Home'
import { GetServerSideProps } from 'next';

interface IRecomended {
  id: string;
  title: string;
}

interface IHome {
  recomendedProducts: IRecomended[]
}

export default function Home( { recomendedProducts }: IHome ) {

  return (
    <div>
        <Title>Hello world!</Title>
        { recomendedProducts.map( product => (
          <div key={product.id}>
            <Products >{product.title}</Products>
          </div>
        ))}
    </div>
  )
}


export const getServerSideProps: GetServerSideProps<IHome> = async () => {
  const response = await axios.get('http://localhost:3333/recommended')
  const recomendedProducts = response.data
  return { 
    props: {
      recomendedProducts
    }
  }

}