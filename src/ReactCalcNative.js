import React, {Component} from 'react'
import {View, AppRegistry, Navigator} from 'react-native'

import axios from 'axios'
import moment from 'moment'

import Calculator from './Calculator'
import History from './History'

class ReactCalcNative extends Component {

    constructor(props) {
        super(props)

        this.state = {
            history: [],
            // showHistory: false,
            // shouldRender: false
        }

        this._renderScene = this._renderScene.bind(this)
        this.addHistoryItem = this.addHistoryItem.bind(this);
        this.deleteHistoryItem = this.deleteHistoryItem.bind(this);
    }

    componentDidMount() {
        axios.get('https://calcmemoryapi.herokuapp.com/api/memory/latest?=3')
            .then(res => res.data)
            .then(history => this.setState({ history }))
            .catch(error => console.log(error))
    }

    _renderScene(route, navigator) {
        if (route.id === 1) {
            return <Calculator
                        navigator={navigator}
                        history={this.state.history}
                        onHistoryItemAdd={this.addHistoryItem} />
        } else if (route.id === 2) {
            return <History
                        navigator={navigator}
                        history={this.state.history}
                        onHistoryItemDelete={this.deleteHistoryItem} />
        }
    }

    addHistoryItem(item) {
        let a = +new Date()
        let formattedDate = moment(a).format('YYYY-MM-DD HH:mm:ss')

        let historyItem = {
            _id: a,
            date: formattedDate,
            operation: item
        }

        let history = [...this.state.history, historyItem];
        this.setState({ history })

        axios.post('https://calcmemoryapi.herokuapp.com/api/memory', historyItem)
            .then(res => console.log(res))
            .catch(error => this.handleError(error))
    }

    deleteHistoryItem(id) {
        let history = this.state.history.filter(memoryItem => memoryItem._id !== id);
        this.setState({ history })


        axios.post(`https://calcmemoryapi.herokuapp.com/api/memory/${id}`)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }



    render() {

        return (
            <Navigator initialRoute={{id: 1}} renderScene={this._renderScene}/>
        )
    }
}

export default ReactCalcNative

AppRegistry.registerComponent('ReactCalcNative', () => ReactCalcNative)
