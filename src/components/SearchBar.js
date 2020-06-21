import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

class SearchBar extends React.Component {
	state = { val: '' };

	onInputChange = (event) => {
		this.setState({ val: event.target.value });
	};

	onFormSubmit = (event) => {
		event.preventDefault();
		this.props.userSubmit(this.state.val);
	};

	render() {
		return (
			<div className="mx-auto py-3" style={{ width: "60%" }}>
				<Form>
					<Form.Row>
						<Col>
							<form onSubmit={this.onFormSubmit} className="flexContainer">
								<Form.Control placeholder="Search photos" className="rounded-pill" size="lg" type="text" value={this.state.val} onChange={this.onInputChange} />
							</form>
						</Col>
					</Form.Row>
				</Form>
			</div>
		);
	}
}

export default SearchBar;