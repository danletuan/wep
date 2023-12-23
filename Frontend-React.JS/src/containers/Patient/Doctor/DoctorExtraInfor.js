import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import './DoctorExtraInfor.scss';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }








    async componentDidMount() {



        this.setState({


        })





    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {

        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>DIA CHI KHAM</div>
                    <div className='name-clinic'>PHONG KHAM</div>
                    <div className='detail-address'>BACH MAI</div>
                </div>

                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            GIA KHAM 250.
                            <span onClick={() => this.showHideDetailInfor(true)}>
                                XEM CHI TIET
                            </span>
                        </div>
                    }

                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>
                                GIA KHAM:
                            </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>Gia kham</span>
                                    <span className='right'>250.00d</span>

                                </div>
                                <div className='note'>
                                    Duoc uu tien kham trc khi dat lich. Gia kham 250
                                </div>

                            </div>
                            <div className='payment'>
                                Ng benh co the thanh toan bang tien mat hoac the
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    AN BANG GIA
                                </span>
                            </div>
                        </>


                    }
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
