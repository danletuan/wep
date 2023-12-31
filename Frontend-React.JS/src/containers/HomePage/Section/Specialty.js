import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../HomePage.scss';
import Slider from 'react-slick';
import { getAllSpecialty } from '../../../services/userService'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router-dom'

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
}

    render() {
        let { dataSpecialty } = this.state
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id='homepage.specialty-popular'/>
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id='homepage.more-infor'/>
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                {/*<div>Cẩm nang 1</div>*/}
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                {/*<div>Cẩm nang 1</div>*/}
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                {/*<div>Cẩm nang 1</div>*/}
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                {/*<div>Cẩm nang 1</div>*/}
                            </div>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='section-customize specialty-child' key={index}
                                             onClick={() => this.handleViewDetailSpecialty(item)}>
                                            <div className='bg-image section-specialty'
                                                style={{ backgroundImage: `url(${item.image})`}}
                                            />
                                            <div className='specialty-name'>{item.name}</div>
                                        </div>
                                    )
                                })}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
