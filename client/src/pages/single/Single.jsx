import "./single.css"
import Header from '../../components/header/Header'
import SinglePost  from './../../components/singlePost/SinglePost';



export default function Single() {
  return (
    <>
    <Header/>
    <div className='single'>
        <SinglePost/>

    </div>
    </>
  )
}
