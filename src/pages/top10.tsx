import { GetStaticProps } from 'next';
import axios from 'axios';


interface IProduct {
    id: string;
    title: string;
}

interface Top10Props {
    products: IProduct[] 
}

export default function Top10({ products }: Top10Props ){
    return (
        <div>
            <h1>TOP 10</h1>
            <ul>
                {products.map( product => (
                    <li key={product.id}>{product.title}</li>
                )) }
                
            </ul>
        </div>
    )
} 

export const getStaticProps: GetStaticProps<Top10Props> = async ( context ) => {
    const response = await axios.get('http://localhost:3333/products');
    const products = await response.data
    return {
        props: {
            products,
        },
        revalidate: 5,
    }    
}