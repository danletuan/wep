import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import './BookingModal.scss';
import {Modal} from 'reactstrap'
import ProfileDoctor from "../ProfileDoctor";
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import {LANGUAGES} from "../../../../utils";
import Select from 'react-select';
import {postPatientBookAppointment} from "../../../../services/userService";
import {toast} from 'react-toastify';
import moment from 'moment'
import LoadingOverlay from 'react-loading-overlay'

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
            isShowLoading: false
        }
    }

    async componentDidMount() {
        this.props.getGenders()
    }

    buildDataGender = (data) => {
        let result = []
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dateTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.genders)) {
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value
        let stateCopy = { ...this.state }
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        })
    }

    buildTimeBooking = (dataTime) => {
        let {language} = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000). format('dddd - DD/MM/YYYY')
                : moment.unix(+dataTime.date / 1000).local('en'). format('ddd - MM/DD/YYYY')

            return `${time} - ${date}`
        }
        return ``
    }

    handleConfirmBooking = async () => {
        // validate input
        this.setState({
            isShowLoading: true
        })
        let date = new Date(this.state.birthday).getTime()
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        this.setState({
            isShowLoading: false
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!')
            this.props.closeModalBooking()
        } else {
            toast.error('Booking a new appointment error! ')
        }
    }

    render() {
        let {isOpenModal, closeModalBooking, dataTime} = this.props
        let doctorId = ''
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <Modal isOpen={false} className='booking-modal-container' size="lg" centered>
                        <div className='booking-modal-content'>
                            <div className='booking-modal-header'>
                            <span className='left'>
                                <FormattedMessage id='patient.booking-modal.title' />
                            </span>
                                <span className='right' onClick={this.closeModalBooking}>
                            <i className={'fas fa-times'}></i>
                        </span>
                            </div>
                            <div className='booking-modal-body'>
                                <div className='doctor-infor'>
                                    <ProfileDoctor
                                        doctorId={doctorId}
                                        isShowDescriptionDoctor={false}
                                        dataTime={dataTime}
                                        isShowLinkDetail={false}
                                        isShowPrice={true}
                                    />
                                </div>
                                <div className='row'>
                                    <div className='col-6 form-group'>
                                        <FormattedMessage id='patient.booking-modal.fullName' />
                                        <input className='form-control' value={this.state.fullName}
                                               onChange={(event) => {this.handleOnchangeInput(event, 'fullName')}}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <FormattedMessage id='patient.booking-modal.phoneNumber' />
                                        <input className='form-control' value={this.state.phoneNumber}
                                               onChange={(event) => {this.handleOnchangeInput(event, 'phoneNumber')}}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.email'/></label>
                                        <input className='form-control' value={this.state.email}
                                               onChange={(event) => {this.handleOnchangeInput(event, 'email')}}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.address'/></label>
                                        <input className='form-control' value={this.state.address}
                                               onChange={(event) => {this.handleOnchangeInput(event, 'address')}}
                                        />
                                    </div>
                                    <div className='col-12 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.reason'/></label>
                                        <input className='form-control' value={this.state.reason}
                                               onChange={(event) => {this.handleOnchangeInput(event, 'reason')}}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.birthday'/></label>
                                        <DatePicker  value={this.state.birthday}
                                                     onChange={this.handleOnchangeDatePicker}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.gender'/></label>
                                        <Select value={this.state.selectedGender}
                                                onChange={this.handleChangeSelect}
                                                options={this.state.genders}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='footer'>
                                <button className='btn-booking-confirm' onClick={this.closeModalBooking}>Xác nhận</button>
                                <button className='btn-booking-cancel'>Cancel</button>
                            </div>
                        </div>
                    </Modal>
                </LoadingOverlay>

            </>
            );
        }
    }
const mapStateToProps = state => {
    return {
        language: state.app.language,
        gender: state.admin.genders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
