import React, { Component } from 'react'
import { View, Text, Navigator, TouchableOpacity, StyleSheet, ListView } from 'react-native'

import { historyStyles } from './Styles'

class History extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };

        this.handlePress = this.handlePress.bind(this)
    }

    handlePress () {
        this.props.navigator.pop()
    }

    handleDelete(id) {
        this.props.onHistoryItemDelete(id)
    }

    render() {
        return (
            <View style={{ padding: 20 }}>
            {/*<ListView*/}
                {/*dataSource={this.state.dataSource}*/}
                {/*renderRow={(rowData) => <Text>{rowData}</Text>}*/}
            {/*/>*/}
                {this.props.history.map(memoryItem =>
                    <View key={memoryItem._id} id={memoryItem._id} style={historyStyles.root} >
                        <Text onPress={() => this.handleDelete(memoryItem._id)} style={historyStyles.text}>
                            Date: {memoryItem.date}
                        </Text>
                        <Text onPress={() => this.handleDelete(memoryItem._id)} style={historyStyles.text}>
                            Operation: {memoryItem.operation}
                        </Text>
                    </View>
                )}
            <TouchableOpacity onPress={this.handlePress}>
                <View style={historyStyles.back}>
                    <Text style={historyStyles.backText}>Back</Text>
                </View>
            </TouchableOpacity>
            </View >
        );
    }
}

export default History
