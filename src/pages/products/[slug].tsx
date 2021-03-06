import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// dynamic imports
const ToCartModalLazy = dynamic(
    () => import('@/component/toCartModal'),
    { loading: () => <p>Carregando.... </p> }
)


export default function Products(){
    const route = useRouter()

    const [ addToCartVisible, setAddToCartVisible ] = useState(false);
    
    function handleAddtoCart(){
        setAddToCartVisible(true)
    }

    return(
        <div>
            <h1>{route.query.slug}</h1>
            <button onClick={handleAddtoCart}>Add to cart</button>

            { addToCartVisible && <ToCartModalLazy /> }
            
        </div>
    )
}