import React, { Component } from 'react';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";

class ImageCard extends Component {
    constructor(props) {
        super(props);
        this.state = { spans: 0, loadingState: true };
        this.imageRef = React.createRef();
        this.location = 'No location set'
    }

    componentDidMount() {
        this.imageRef.current.addEventListener('load', this.setSpans);
        this.processLocation();
    }

    setSpans = () => {
        const height = this.imageRef.current.clientHeight;
        const spansRows = Math.ceil(height / 10);
        this.setState({ spans: spansRows });
    }
    
    processLocation = async (term) => {
        const response = await axios.get(`https://api.unsplash.com/photos/${this.props.image.id}`, {
            params: { query: term },
            headers: {
                Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
            }
        })

        let responseData = response.data

        this.setState({ location: responseData.results })
        if(responseData.location.title) {
            this.location = responseData.location.title 
        }
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
                                <img className="px-2 rounded-circle" src={this.props.image.user.profile_image.small} alt='avatar'/>
                                {this.props.image.user.first_name}<span> </span>
                                {this.props.image.user.last_name}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img ref={this.imageRef}
                                src={this.props.image.urls.regular}
                                alt={this.props.image.alt_description}
                                style={{ width: '100%'}}
                            />
                        </Modal.Body>
                        <Modal.Footer className="justify-content-start">
                        <span>{this.location}</span>
                        </Modal.Footer> 
                    </Modal>
                </div>
            </div>
        )
    }
}

export default ImageCard;
