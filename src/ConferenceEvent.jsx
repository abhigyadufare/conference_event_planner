import "./ConferenceEvent.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity } from "./venueSlice";

const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);
    const venueItems = useSelector((state) => state.venue);
    const dispatch = useDispatch();

    const handleToggleItems = () => {
        console.log("handleToggleItems called");
        setShowItems(!showItems);
    };

    const handleAddToCart = (index) => {
        dispatch(incrementQuantity(index));
    };

    const handleRemoveFromCart = (index) => {
        dispatch(decrementQuantity(index));
    }

    return (
        <>
            <navbar className="navbar_event_conference">
                <div className="company_logo">Conference Expense Planner</div>
                <div className="left_navbar">
                    <div className="nav_links">
                        <a href="#venue">Venue</a>
                        <a href="#addons">Add-ons</a>
                        <a href="#meals">Meals</a>
                    </div>
                    <button className="details_button">Show Details</button>
                </div>
            </navbar>
            <div className="main_container">
                {!showItems 
                    ? 
                    (
                    <div className="items-information">
                        <div id="venue" className="venue_container container_main">
                            <div className="text">
                                <h1>Venue Room Selection</h1>
                            </div>
                            <div className="venue_selection">
                                {venueItems.map((item, index) => (
                                    <div className="venue_main" key={index}>
                                        <div className="img">
                                            <img src={item.img} alt={item.name} />
                                        </div>
                                        <div className="text">{item.name}</div>
                                        <div>${item.cost}</div>
                                        <div className="button_container">
                                            {item.name === "Auditorium Hall (Capacity:200)" ? (
                                                <>
                                                    <button
                                                        className={item.quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
                                                        onClick={() => handleRemoveFromCart(index)}
                                                    >
                                                        &#8211;
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        className={item.quantity === 3 ? "btn-success btn-disabled" : "btn-success btn-plus"}
                                                        onClick={() => handleAddToCart(index)}
                                                    >
                                                        &#43;
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className={item.quantity === 0 ? "btn-warning btn-disabled" : "btn-warning btn-plus"}
                                                        onClick={() => handleRemoveFromCart(index)}
                                                    >
                                                        &#8211;
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        className={item.quantity === 10 ? "btn-success btn-disabled" : "btn-success btn-plus"}
                                                        onClick={handleAddToCart(index)}
                                                    ></button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="total_cost">Total Cost:</div>
                        </div>
                        <div id="addons" className="venue_container container_main">
                            <div className="text">
                                <h1>Add-ons Selection</h1>
                            </div>
                            <div className="addons_selection"></div>
                            <div className="total_cost">Total Cost:</div>
                        </div>
                        <div id="meals" className="venue_container container_main">
                            <div className="text">
                                <h1>Meals Selection</h1>
                            </div>
                            <div className="meals_selection"></div>
                            <div className="total_cost">Total Cost:</div>
                        </div>
                    </div>
                    ) : (
                    <div></div>
                    )
                }
            </div>
        </>
    )
}

export default ConferenceEvent