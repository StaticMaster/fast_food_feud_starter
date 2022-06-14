import * as React from "react"
// IMPORT ANY NEEDED COMPONENTS HERE
import { createDataSet } from "./data/dataset"
import "./App.css"
import Header from "./components/Header/Header"
import Instructions from "./components/Instructions/Instructions"
import Chip from "./components/Chip/Chip"
import { useState } from "react"
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

export function App() {
  console.log(data)
  const [
    category, setCategory
  
  ]
  = React.useState(null)

  const[
    restaurant, setRestaurant
  ]
  = React.useState(null)

  const[

    selectedMenuItem, setSelectedMenuItem
  ]
  = React.useState(null)
const  currentMenuItems=data.filter(
    (item)=> {return item.food_category===category && item.restaurant===restaurant}

  )

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {/* YOUR CODE HERE */}
          {categories.map((cat, index) => (<Chip label={cat} key={index} isActive={category==cat?true:false} onClick = {() => {setCategory(cat);setSelectedMenuItem(null)}}/>))}

        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
       {<Header title ={appInfo.title} tagline={appInfo.tagline} description={appInfo.description}/>
 }

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">{/* YOUR CODE HERE */}  
          {restaurants.map((rest, index) => (<Chip label={rest} key={index} isActive={restaurant==rest?true:false} onClick ={() =>{ setRestaurant(rest);setSelectedMenuItem(null)} }/>))}
          </div>
        </div>

        {/* INSTRUCTIONS GO HERE */}
        <Instructions instructions={appInfo.instructions.start}></Instructions>

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {
              currentMenuItems.map((current,index) => (<Chip label={current.item_name} key={index} isActive={selectedMenuItem&&selectedMenuItem.item_name===current.item_name
              } onClick={() => setSelectedMenuItem(current)}/>))
            }

          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">
          
            {selectedMenuItem?
              <NutritionalLabel item={selectedMenuItem}/>
             : null}
        </div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
