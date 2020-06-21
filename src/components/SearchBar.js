import React from 'react';
import Autosuggest from 'react-autosuggest';
import './SearchBar.css';



const suggestionsList = [
	{
		name: 'island',
	},
	{
		name: 'islands',
	},
	{
		name: 'islands of thailand',
	},
	{
		name: 'islands of greece',
	},
	{
		name: 'coral reef',
	},
	{
		name: 'coral',
	},
	{
		name: 'corgi',
	},
];

const getSuggestions = value => {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;

	return inputLength === 0 ? [] : suggestionsList.filter(list =>
		list.name.toLowerCase().slice(0, inputLength) === inputValue
	);
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
	<div>
		{suggestion.name}
	</div>
);

class SearchBar extends React.Component {
	constructor() {
		super();
		this.state = {
			value: '',
			suggestions: []
		};
	}

	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	shouldRenderSuggestions(value) {
		return value.trim().length > 2;
	}

	onFormSubmit = (event) => {
		event.preventDefault();
		this.props.userSubmit(this.state.value);
	};

	render() {
		const { value, suggestions } = this.state;

		const inputProps = {
			placeholder: 'Search photos',
			value,
			onChange: this.onChange
		};

		return (
			<div className="mx-auto py-3" style={{ width: "60%" }}>
				<form onSubmit={this.onFormSubmit}>
					<Autosuggest
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						inputProps={inputProps}
						shouldRenderSuggestions={this.shouldRenderSuggestions}
					/>
				</form>
			</div>
		);
	}
}

export default SearchBar;