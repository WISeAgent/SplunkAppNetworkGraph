//-----------------------------------------------------------------------------
//=                                                                           =
//= Copyright (c) 2000-2022 WANG Infonology Systems Pty Ltd, Sydney Austalia  =
//=              --->  http://www.wiseagent.com.au  <---                      =
//= Author : Wenjie Wang (wenjie.wang@wiseagent.com.au)                       =
//= Change Hisory                                                             =
//= 20220423 Wenjie Wang     Initial                                          =
//=                                                                           =
//-----------------------------------------------------------------------------
import React from 'react';
import { cloneDeep, remove } from 'lodash';
import DataSet from '@splunk/datasource-utils/DataSet';
import EventsViewer from '@splunk/react-events-viewer/components/EventsViewer';
import { totalPageCount, getPage } from '@splunk/react-events-viewer/utils/pagination';
import { dataSourceData } from './constants';

export default class VizEventViewer extends React.Component {
    constructor(...args) {
        super(...args);

        const requestParams = { count: 10, offset: 0, requestTotalCount: true };

        this.state = {
            showPagination: true,
            pageLengthOptions: [10, 20, 50],
            formattingOptions: ['Row Numbers', 'Wrap Results'],
            requestParams,
            events: dataSourceData,
            currentTableStyle: 'list',
            rowNumbers: false,
            wrapResults: true,
            selectedRows: [],
        };
    }

    /**
     * Simulates fetching events from the server.
     * This will not be necessary when the component is powered by datasources which will be responsible for
     * fetching the results with correct count and offset.
     * @param resultsPayload - Dataset with fields and columns
     * @param offset - page number
     * @param count - pageLength
     * @returns {*}
     */
    fetchPage = (resultsPayload, { offset, count }) => {
        const { results } = resultsPayload.toJSONArray();
        const totalPages = totalPageCount(results, { count });
        const pageNumber = Math.abs(offset / count) + 1;
        const adjustedPage = Math.min(pageNumber, totalPages);

        const pageResults = getPage(results, {
            count,
            offset: adjustedPage,
        });
        return DataSet.fromJSONArray(resultsPayload.fields, pageResults);
    };

    handleRequestParamsChange = (datasourceType, newRequestParams) => {
        if (this.state.requestParams.count !== newRequestParams.count) {
            this.resetAllToggles();
        }
        this.setState({ requestParams: newRequestParams });
    };

    handleOptionsChange = (option) => {
        this.setState(option);
    };

    resetAllToggles = () => {
        this.setState({ selectedRows: [] });
    };

    /**
     * Handler to execute when all events of a page are toggled
     */
    handleTogglePage = (events, pageNumber, status) => {
        this.setState((state) => {
            const selectedRows = cloneDeep(state.selectedRows);

            if (status === 'all' || status === 'some') {
                events.forEach((event, index) => {
                    remove(selectedRows, (row) => row.index === index && row.pageNumber === pageNumber);
                });
            } else {
                events.forEach((event, index) => {
                    remove(selectedRows, (row) => row.index === index && row.pageNumber === pageNumber);
                    selectedRows.push({ event, index, pageNumber });
                });
            }

            return { selectedRows };
        });
    };

    /**
     * Handler to execute when an event on a page is toggled
     */
    handleToggleRow = (event, index, pageNumber) => {
        this.setState((state) => {
            const selectedRows = cloneDeep(state.selectedRows);

            if (selectedRows.find((row) => row.index === index && row.pageNumber === pageNumber)) {
                remove(selectedRows, (row) => row.index === index && row.pageNumber === pageNumber);
                return { selectedRows };
            }
            selectedRows.push({ event, index, pageNumber });
            return { selectedRows };
        });
    };

    render() {
        const {
            showPagination,
            pageLengthOptions,
            formattingOptions,
            requestParams,
            currentTableStyle,
            events,
            rowNumbers,
            wrapResults,
        } = this.state;
        const options = {
            showPagination,
            pageLengthOptions,
            formattingOptions,
            currentTableStyle,
            rowNumbers,
            wrapResults,
        };
        const dataSources = {
            primary: {
                requestParams,
                data: this.fetchPage(events, requestParams),
                meta: { totalCount: events.columns[0].length },
            },
        };
        const selection = {
            onTogglePage: this.handleTogglePage,
            onToggleRow: this.handleToggleRow,
            rows: this.state.selectedRows,
            actions: [{ label: 'Add to Notable', name: 'addToNotable' }],
            // eslint-disable-next-line no-alert
            onActionClicked: (e, { action }) => alert(action),
        };
        return (
            <EventsViewer
                options={options}
                onOptionsChange={this.handleOptionsChange}
                dataSources={dataSources}
                onRequestParamsChange={this.handleRequestParamsChange}
                selection={selection}
                // eslint-disable-next-line no-alert
                onFieldClicked={(e, { field }) => alert(`field: ${field}`)}
                onFieldValueClicked={
                    // eslint-disable-next-line no-alert
                    (e, { field, value }) => alert(`field: ${field}\nvalue: ${value}`)
                }
                // eslint-disable-next-line no-alert
                onTimeClicked={(e, { time }) => alert(`time: ${time}`)}
            />
        );
    }
}