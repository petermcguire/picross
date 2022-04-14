import React from 'react';
import Game from '../Game/Game';
import { useNavigate } from 'react-router-dom';
import './Settings.css'

function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
}

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dim: '5'
        };
    }

    render() {
        return (
            <div>
                Choose game dimension:
                <select onChange={(event) => this.setState({dim: event.target.value})}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                <br />
                <button onClick={
                    () => {
                        this.props.navigate('game/' + this.state.dim);
                    }
                }>
                    GO
                </button>
            </div>
        )
    }
}

export default withNavigation(Settings);
// export default Settings;