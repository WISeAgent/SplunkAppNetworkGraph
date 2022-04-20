import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@splunk/react-ui/Button';
import { StyledContainer, StyledGreeting } from './MyReactComponentStyles';
import SearchJob from '@splunk/search-job';

class MyReactComponent extends Component {
    static propTypes = {
        name: PropTypes.string,
    };

    static defaultProps = {
        name: 'User',
    };

    constructor(props) {
        super(props);
        this.state = { counter: 0 };
    }

    render() {
        const { name } = this.props;
        const { counter } = this.state;
		const mySearchJob = SearchJob.create({
			search: 'index=_internal | head 10',
			earliest_time: '-60m@m',
			latest_time: 'now',
		});
		var searchResult;
		const resultsSubscription = mySearchJob.getResults().subscribe(results => {
			// Do something with the results.
			searchResult = results
			console.log("resultsSubscription")
			console.log(results);
		});
		// Later, if the results are no longer needed, and the search is not complete,
		// unsubscribe to release resources.
		resultsSubscription.unsubscribe();

        const message =
            counter === 0
                ? 'You should try clicking the button.'
                : `You've clicked the button ${counter} time${counter > 1 ? 's' : ''}.`;

        return (
            <StyledContainer>
                <StyledGreeting>Hello again {name}!</StyledGreeting>
                <div>{message}</div>
				<div>Search: {searchResult}</div>
                <Button
                    label="Click here"
                    appearance="primary"
                    onClick={() => {
                        this.setState({ counter: counter + 1 });
                    }}
                />
            </StyledContainer>
        );
    }
}

export default MyReactComponent;
