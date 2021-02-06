import React, {Component} from 'react';
import Result from './Result';
import Actions from './Actions';


class Counter extends Component {

        state =  {
            count:0
        }

    render() {

        const handlePlusCount = () => {
            this.setState({
                count: this.state.count+=1
            })
        }

        const handleMinusCount = () => {
            this.setState({
                count: this.state.count-=1
            })
        }

        return (
            <div>
            <Result count={this.state.count}/>
            <Actions handlePlusCount={handlePlusCount} handleMinusCount={handleMinusCount}/>
            </div>
        )
    }
}

export default Counter;