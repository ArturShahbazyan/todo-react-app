import React, {Component} from 'react';
import Result from './Result';
import Actions from './Actions';


class Counter extends Component {

        state =  {
            count:0
        }


         handlePlusCount = () => {
            this.setState({
                count: this.state.count+1
            })
        }

         handleMinusCount = () => {
            this.setState({
                count: this.state.count-1
            })
        }

    render() {

        return (
            <div>
            <Result count={this.state.count}/>
            <Actions handlePlusCount={this.handlePlusCount} handleMinusCount={this.handleMinusCount}/>
            </div>
        )
    }
}

export default Counter;