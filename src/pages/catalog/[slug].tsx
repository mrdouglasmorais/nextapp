import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router';
import axios from 'axios';

interface IProduct {
    id: string;
    title: string;
}

interface ICategory {
    products: IProduct[] 
}

export default function Products( { products } : ICategory){
    const route = useRouter()
    return (
        <div>
            <h1>{route.query.slug}</h1>
            <ul>
                {products.map( product => (
                    <li key={product.id}>{product.title}</li>
                )) }
            
            </ul>    
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await axios.get(`http://localhost:3333/categories`)
    const categories = response.data

    const paths = categories.map( category => {
        return {
            params: { slug: category.id }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<ICategory> = async ( context ) => {
    const { slug } = context.params

    const response = await axios.get(`http://localhost:3333/products?category_id=${slug}`)
    const products = response.data

    return {
        props: {
            products
        },
        revalidate: 60,
    }
}