import React, {Component} from 'react'
import {CommonUtils} from "../../../utils";
import {connect} from 'react-intl'
import './RemedyModal.scss'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }

    render() {
        let {isOpenModal, closeRemedyModal, dataModal, sendRemedy} = this.props
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='md'
                centered={}
            >
                <div className='modal-header'>
                    <h5 className="modal-title">Gửi hoá đơn khám bệnh thành công</h5>
                    <button type='button' className='close' aria-label='Close' onClick={closeRemedyModal}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className="col-6 form-control">
                            <label>Email bệnh nhân</label>
                            <input className='form-control' type='email' value={this.state.email}
                                   onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={() => this.handleSendRemedy()}>Send</Button>{' '}
                    <Button color='secondary' onClick={closeRemedyModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )

    }
}

const mapStateProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateProps, mapDispatchToProps)(RemedyModal)