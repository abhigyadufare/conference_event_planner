import "./ConferenceEvent.css";
import { useState } from "react";

const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);

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
                            <div className="venue_selection"></div>
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