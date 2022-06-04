import React, {Component} from 'react';
import $ from "jquery";
import {STRINGS} from "../../../utils/base";

class SearchInput extends Component {

    mainSearchInput = React.createRef();

    componentDidMount() {
        $(this.mainSearchInput.current).on("keyup", e => {
            if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault();
                window.location.href = `${STRINGS.ROUTES.SEARCH.DEFAULT}?q=${e.target.value}`;
            }
        });
    }

    render() {
        return (
            <div className="toggle-menu ">
                <div className="toggle-label mobileSearchBar" style={{margin: "0px 6px"}}>
                    <i className="ic-search"/>
                </div>
                <div className="toggle-panel">
                    <div className="main-search-area">
                        <div className="search-input-area">
                            <input ref={this.mainSearchInput} className="search-input" autoFocus={true}/>
                            <div className="search-input-border"/>
                            <div className="search-input-label">
                                Type users name, content words to find
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default SearchInput;