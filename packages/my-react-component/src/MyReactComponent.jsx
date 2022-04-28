//-----------------------------------------------------------------------------
//=                                                                           =
//= Copyright (c) 2000-2022 WANG Infonology Systems Pty Ltd, Sydney Austalia  =
//=              --->  http://www.wiseagent.com.au  <---                      =
//= Author : Wenjie Wang (wenjie.wang@wiseagent.com.au)                       =
//= Change Hisory                                                             =
//= 20220418 Wenjie Wang     Initial                                          =
//=                                                                           =
//-----------------------------------------------------------------------------
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@splunk/react-ui/Button';
import { StyledContainer, StyledGreeting } from './MyReactComponentStyles';
import SearchJob from '@splunk/search-job';
//import VisNetwork from './vizNetwork';
import VizGraphvis from './vizGraphvis';
//import VizEventViewer from './VizEventViewer';

class MyReactComponent extends Component {
    static propTypes = {
        name: PropTypes.string,
    };

    static defaultProps = {
        name: 'My Network Graph',
    };
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
        this.fetchData();
    }

// ref: https://docs.splunk.com/Documentation/Splunk/8.2.6/RESTTUT/RESTsearches#Get_search_results
// resp.fields - array of field names
// resp.results - array of results
    // Later, if the results are no longer needed, and the search is not complete,
    // unsubscribe to release resources.
    //resultsSubscription.unsubscribe(); 
    fetchData() {
        var resultsSubscription;
        var mySearchJob = SearchJob.create({
            search: 'index=_internal | table clientip host user method uri | head 10',
            earliest_time: '-60m@m',
            latest_time: 'now',
        });
        console.log("fetchData-begin: [" + new Date().toISOString().slice(11,23) + "]");
        return new Promise((resolve) => {
            console.log("fetchData-Promise: [" + new Date().toISOString().slice(11,23) + "]");
            resultsSubscription = mySearchJob.getResults()
            .subscribe((results) => {
                console.log(`[${new Date().toISOString().slice(11,23)}] fetchData-results: ${results.fields.length}`);
                this.setState({counter:results.fields.length});
                resolve(results.fields.length);
            });
        });
    };
    render() {
        return (
            <StyledContainer>
                <div>TODO: table for results from search job: http://127.0.0.1:8000/en-GB/splunkd/__raw/services/search/jobs</div>
                <div>Return fields: {this.state.counter}</div>
                <VizGraphvis />
            </StyledContainer>
        );
    }
}

export default MyReactComponent;
