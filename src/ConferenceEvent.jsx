import React, { useState } from "react";
import "./ConferenceEvent.css";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity } from "./venueSlice";
import { decrementAvQuantity, incrementAvQuantity } from "./avSlice";
import TotalCost from "./TotalCost";

const MyConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const dispatch = useDispatch();
  
  const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;

  const handleToggleItems = () => {
    console.log("handleToggleItems called");
    setShowItems(!showItems);
  }

  const handleAddToCart = (index) => {
    if (
      venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
      venueItems[index].quantity >= 3
    ) {
      return;
    } else if (venueItems[index].quantity >= 10) {
      return;
    }
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  const handleIncrementAvQuantity = (index) => {
    dispatch(incrementAvQuantity(index));
  };

  const handleDecrementAvQuantity = (index) => {
    dispatch(decrementAvQuantity(index));
  }

  const calculateTotalCost = (section) => {
    let totalCost = 0;
    if (section === "venue") {
        venueItems.forEach((item) => {
            totalCost += item.cost * item.quantity;
        });
    } else if (section === "av") {
        avItems.forEach(item => {
            totalCost += item.cost * item.quantity;
        });
    }
    
    return totalCost;
  };

  const venueTotalCost = calculateTotalCost("venue");
  const avTotalCost = calculateTotalCost("av");

  const navigateToProducts = (idType) => {
    if (idType == '#venue' || idType == '#addons' || idType == '#meals') {
      if (showItems) { // Check if showItems is false
        setShowItems(!showItems); // Toggle showItems to true only if it's currently false
      }
    }
  }

  return (
    <>
      <navbar className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue" onClick={() => navigateToProducts("#venue")}>Venue</a>
            <a href="#addons" onClick={() => navigateToProducts("#addons")}>Add-ons</a>
            <a href="#meals" oncClick={() => navigateToProducts("#meals")}>Meals</a>
          </div>
          <button
            className="details_button"
            onClick={() => setShowItems(!showItems)}
          >
            Show Details
          </button>
        </div>
      </navbar>
      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            <div id="venue" className="venue_container container_main">
              <div className="text">
                <h1>Venue Room Selection</h1>
              </div>
              <div className="venue_selection">
                {venueItems.map((item, index) => (
                  <div key={index} className="venue_main">
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      {item.name === "Auditorium Hall (Capacity:200)" ? (
                        <>
                          <button
                            className={
                              item.quantity === 0
                                ? "btn-warning btn-disabled"
                                : "btn-minus btn-warning"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {item.quantity}
                          </span>
                          <button
                            className={
                              remainingAuditoriumQuantity === 0
                                ? "btn-success btn-disabled"
                                : "btn-success btn-plus"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className={
                              item.quantity === 0
                                ? "btn-warning btn-disabled"
                                : "btn-minus btn-warning"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {item.quantity}
                          </span>
                          <button
                            className={
                              item.quantity === 10
                                ? "btn-success btn-disabled"
                                : "btn-success btn-plus"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: {venueTotalCost}</div>
            </div>
            <div id="addons" className="venue_container container_main">
              <div className="text">
                <h1>Add-ons Selection</h1>
              </div>
              <div className="addons_selection">
                {avItems.map((item, index) => (
                    <div key={index} className="av_data venue_main">
                        <div className="img">
                            <img src={item.img} alt={item.name} />
                        </div>
                        <div className="text">{item.name}</div>
                        <div>${item.cost}</div>
                        <div className="button_container">
                            <button className="btn-warning" onClick={() => handleDecrementAvQuantity(index)}>&ndash;</button>
                            <span className="quantity-value">{item.quantity}</span>
                            <button className="btn-success" onClick={() => handleIncrementAvQuantity(index)}>&#43;</button>
                        </div>
                    </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: {avTotalCost}</div>
            </div>
            <div id="meals" className="venue_container container_main">
              <div className="text">
                <h1>Meals Selection</h1>
              </div>
              <div className="meals_selection"></div>
              <div className="total_cost">Total Cost: </div>
            </div>
          </div>
        ) : (
          <div className="total_amount_detail">
            <TotalCost totalCosts={totalCosts} handleClick={handleToggleItems} />
          </div>
        )}
      </div>
    </>
  );
};

export default MyConferenceEvent;
