import { useState } from "react";
import Category from "../../Components/Category/Category";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";
import Header from "../../Components/Header/Header";

function Home(){

    const [category , setCategory] = useState('All')
    // console.log(category)
    return (
        <div>
            <Header />
            <br/>
            <Category category={category} setCategory={setCategory} />
            <FoodDisplay category={category} textField={''}/>
        </div>
    )
}

export default Home;