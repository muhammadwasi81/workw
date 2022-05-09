import React, {Component} from 'react';

class Viewer extends Component {


    render() {
        const {path}=this.props;
        return (
        // <iframe title='iframe' src={`${this.state.path}`} style={{width: '327%', border: 'none'}}/>
        // <div></div>
        <iframe title='iframe' allowfullscreen={true} src={`${path? path : ''}`} style={{height:'85%',width:'100%'}}/>

        );
    }
}

export default Viewer;
