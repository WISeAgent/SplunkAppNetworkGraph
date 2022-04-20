# A Splunk App to Visualize Your Search Data as Network Graph   

Splunk is a software platform to search, analyze and visualize the machine-generated data gathered. It makes machine data accessible, usable and valuable to everyone.  

A Splunk app is an extension of Splunk functionality which has its own in-built UI context to serve a specific need. Effectively, it is a web application with predefined set of UI components to visualize the search result.

Splunk UI supports react, which makes it a useful extention for developer to add more UI components for specialized visualization requirements.  Information extracted from Splunk presented as network graph will help network enginer/security analyst to get more insight from it.

This project implemented a Splunk App with network visualization.  It allows developer to create customized UI component to present your search result a network graph.

![SplunkApp-network](https://user-images.githubusercontent.com/853925/164152073-c0cf54c5-069f-4c1b-a521-789661b0ee9d.png)

# 🚀 Quick start
1. Clone the project & install dependencies
```
    $ git clone git@github.com:WISeAgent/SplunkAppNetworkGraph.git
    $ cd SplunkAppNetworkGraph
    $ yarn install
```
2. To run the demo component and view it from http://127.0.0.1:8080/

```
    $ yarn run setup
    $ cd packages/my-react-component
    $ yarn run start:demo
```
4. to build the Splunk App and deploy as symbolic link

```
    $ yarn install
    $ yarn run build
    $ yarn urn link:app
```

