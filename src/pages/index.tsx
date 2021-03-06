import { GetServerSideProps } from 'next';
import { Title, Products } from '@/styles/pages/Home';
import api from '@/services/api'
import SEO from '@/component/SEO'
// import math from './lib/math'

interface IRecomended {
  id: string;
  title: string;
}

interface IHome {
  recomendedProducts: IRecomended[]
}

export default function Home( { recomendedProducts }: IHome ) {

  async function handleSum(){
    const math = (await import('@/lib/math')).default
    alert(math.sum(3, 5))
  }
  // import dinâmico

  return (
    <div>
        <SEO title="Home" shoudExcludeTitleSuffix />
        <Title>Hello world!</Title>
        { recomendedProducts.map( product => (
          <div key={product.id}>
            <Products >{product.title}</Products>
          </div>
        ))}
        <button onClick={handleSum} >Sum!</button>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps<IHome> = async () => {
  const response = await api.get('http://localhost:3333/recommended')
  const recomendedProducts = response.data
  return { 
    props: {
      recomendedProducts
    }
  }

}