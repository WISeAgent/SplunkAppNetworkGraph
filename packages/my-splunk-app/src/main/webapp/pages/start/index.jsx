//-----------------------------------------------------------------------------
//=                                                                           =
//= Copyright (c) 2000-2022 WANG Infonology Systems Pty Ltd, Sydney Austalia  =
//=              --->  http://www.wiseagent.com.au  <---                      =
//= Author : Wenjie Wang (wenjie.wang@wiseagent.com.au)                       =
//= Change Hisory                                                             =
//= 20220418 Wenjie Wang     Initial                                          =
//=                                                                           =
//-----------------------------------------------------------------------------
import React from 'react';

import layout from '@splunk/react-page';
import MyReactComponent from '@splunk/my-react-component';
import { SplunkThemeProvider } from '@splunk/themes';

import { defaultTheme, getThemeOptions } from '@splunk/splunk-utils/themes';

import { StyledContainer, StyledGreeting } from './StartStyles';

const themeProviderSettings = getThemeOptions(defaultTheme() || 'enterprise');

layout(
    <SplunkThemeProvider {...themeProviderSettings}>
        <StyledContainer>
            <StyledGreeting>My Network Graph</StyledGreeting>
            <MyReactComponent name="MyReactComponent" />
        </StyledContainer>
    </SplunkThemeProvider>
);
