import React, {Component} from 'react';
import {connect} from "react-redux";

class DefaultClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        this.setState({})

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {

        return (
            <div></div>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
