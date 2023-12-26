import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from 'react-slick';


class Handbook extends Component {

    render() {
        return (
            <div className='section-share'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook1'></div>
                                {/*<div>Cẩm nang 1</div>*/}
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook2'></div>
                                {/*<div>Cẩm nang 2</div>*/}
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook3'></div>
                                {/*<div>Cẩm nang 3</div>*/}
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook4'></div>
                                {/*<div>Cẩm nang 4</div>*/}
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
