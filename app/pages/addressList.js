import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableHighlight,
    ListView,
    ActionSheetIOS,
    InteractionManager
} from 'react-native';

import {getUserList} from "../request/curls";
import {connect} from 'react-redux';


class AddressList extends Component{

    constructor(props){
        super(props)

        var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    componentDidMount(){

        const { dispatch } = this.props;

        InteractionManager.runAfterInteractions(() => {


            dispatch(getUserList())

        });
    }

    render(){

        var {addressReducer} = this.props;

        return(
            <View style={styles.container}>

                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(addressReducer.users)}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }

    // 返回一个Item
    renderRow(rowData){
        return(

            <TouchableHighlight  style={{flex:1}} onPress={this.clickitem.bind(this,rowData)}>
                <View style={styles.itemStyle}>
                    <Image source={require("../../images/xukaijie.jpg")} style={styles.imageStyle}/>
                    <View style={styles.subItemStyle}>
                        <Text style={{marginTop:5, fontSize:17}}>{rowData.name}</Text>
                        <Text style={{marginBottom:5, fontSize:13, color:'green'}}>{rowData.phone}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    clickitem(){

        var options=[
            "拨打电话","发送短信","取消"

        ];

        ActionSheetIOS.showActionSheetWithOptions({
            options:options,
            cancelButtonIndex:options.length-1,
            tintColor:"green"

        },function(index){


        })
    }
};

var styles = StyleSheet.create({
    container: {
        flex:1
    },

    itemStyle: {
        // 主轴方向
        flexDirection:'row',
        // 下边框
        borderBottomWidth:1,
        borderBottomColor:'gray',
    },

    imageStyle: {
        // 尺寸
        width:60,
        height:60,
        // 边距
        marginLeft:10,
        margin:10
    },

    subItemStyle: {
        // 对齐方式
        justifyContent:'space-around'
    }
});

export default connect((state) => {
    const { addressReducer } = state;
    return {
        addressReducer
    }
})(AddressList);