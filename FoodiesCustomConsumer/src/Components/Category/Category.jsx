import { useRef } from "react";
import { foods } from "../../assets/assets";
import './Category.css'

function Category({category,setCategory}){
    
    const listRef = useRef(null);
    // console.log(category)

    function scrollLeft(){
        if( listRef.current === null ) return;
        listRef.current.scrollBy({ left: -200 , behavior: 'smooth' });
    }

    
    function scrollRight(){
        if( listRef.current === null ) return;
        listRef.current.scrollBy({ left: 200 , behavior: 'smooth' });
    }

    return (
        <div className="category ms-5">
            <div className="container-flex">
                <div className="d-flex flex-row gap-1 me-4">
                    <h1 className="me-auto"> Explore Our Menu </h1>
                    <i className="bi bi-arrow-left-circle fs-3 scroll-icon" onClick={scrollLeft}></i>
                    <i className="bi bi-arrow-right-circle fs-3 scroll-icon" onClick={scrollRight}></i>
                </div>
                <p>Explore curated lists of dishes from top categories</p>
                <div className="d-flex flex-row gap-3 me-2 explore-menu-list" ref={listRef}>
                    {
                        foods.map( (items , index)=>{
                            return (
                                <div key={index} className='explore-menu-list-item' onClick={()=>setCategory((prev)=> prev === items.category?'All' : items.category)}>
                                    <img src={items.item} height={200} width={200} className={ category === items.category? 'rounded-circle active' : 'rounded-circle' }></img>
                                    <p className="mt-2 fw-bold text-center">{items.category}</p>
                                </div>
                            )
                        } )
                    }
                </div>
            </div>
            <hr></hr>
        </div>
    )
}

export default Category;