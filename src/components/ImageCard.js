import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";

class ImageCard extends Component {
    constructor(props) {
        super(props);
        this.state = { spans: 0 };
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        this.imageRef.current.addEventListener('load', this.setSpans);
    }

    setSpans = () => {
        const height = this.imageRef.current.clientHeight;
        const spansRows = Math.ceil(height / 10);
        this.setState({ spans: spansRows });
    }

    state = { show: false };

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        return (
            <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
                <div >
                    <img onClick={this.showModal}
                        ref={this.imageRef}
                        src={this.props.image.urls.regular}
                        alt={this.props.image.alt_description} />
                </div>
                <div>
                    <Modal show={this.state.show}
                        onHide={this.hideModal}
                        size="lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {this.props.image.user.first_name}<span> </span>
                                {this.props.image.user.last_name}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img
                                ref={this.imageRef}
                                src={this.props.image.urls.regular}
                                alt={this.props.image.alt_description}
                                style={{ width: '80%', margin: 'auto' }}
                            />
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default ImageCard;
