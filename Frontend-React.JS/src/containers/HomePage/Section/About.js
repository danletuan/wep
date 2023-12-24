import React, {Component} from 'react';
import {connect} from 'react-redux';


class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Mixigang Number One
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/bk7u2A0ZZxg"
                                title="(Restream) Tuổi thơ &quot;Báo Đời&quot; của Độ Tày và chuyện mua Z1000 tặng sinh nhật vợ."
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>(Restream) Tuổi thơ "Báo Đời" của Độ Tày và chuyện mua Z1000 tặng sinh nhật vợ.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
