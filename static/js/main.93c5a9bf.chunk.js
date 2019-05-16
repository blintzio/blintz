(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{44:function(e,n,t){e.exports=t(61)},56:function(e,n,t){},61:function(e,n,t){"use strict";t.r(n);var r=t(40),a=t(10),o=t(20),l=t(42),s=t(39),i=t(41),u=t(2),c=t.n(u),d=t(32),m=t.n(d),f=t(15),h=t(16),g=t(23),p=t(17),v=t(9),b=t(22),y=t(33);var E=function(e){function n(e){var t;return Object(f.a)(this,n),(t=Object(g.a)(this,Object(p.a)(n).call(this,e))).state={configUrl:""},t.handleChange=t.handleChange.bind(Object(v.a)(t)),t.handleSubmit=t.handleSubmit.bind(Object(v.a)(t)),t}return Object(b.a)(n,e),Object(h.a)(n,[{key:"handleChange",value:function(e){this.setState({configUrl:e.target.value})}},{key:"handleSubmit",value:function(e){var n=this;fetch(this.state.configUrl).then(function(e){if(!e.ok)throw Error("Request rejected with status ".concat(e.status));return e.json()}).then(function(e){var t=e.repositories,r=e.columns,a=function(e){var n={ok:!1,error:"Unexpected error"};if("undefined"===typeof e)return n.error="No repositories defined",n;if(!Array.isArray(e))return n.error="'repositories' must be an array",n;for(var t=0;t<e.length;++t){var r=e[t].owner,a=e[t].name;if("string"!==typeof r)return n.error="'owner' is not a string for repository at index ".concat(t),n;if(0===r.length)return n.error="'owner' is the empty string for repository at index ".concat(t),n;if("string"!==typeof a)return n.error="'name' is not a string for repository at index ".concat(t),n;if(0===a.length)return n.error="'name' is the empty string for repository at index ".concat(t),n}return n.ok=!0,n.error="",n}(t);a.ok&&(a=function(e){var n={ok:!1,error:"Unexpected error"};if(!Array.isArray(e))return n.error="'columns' must be an array",n;if("undefined"===typeof e)return n.error="No columns defined",n;for(var t=0;t<e.length;++t){var r=e[t].name,a=e[t].state,o=e[t].label;if("string"!==typeof r)return n.error="'name' is not a string for column at index ".concat(t),n;if(0===r.length)return n.error="'name' is the empty string for column at index ".concat(t),n;if("string"!==typeof a)return n.error="'state' is not a string for column at index ".concat(t),n;if("open"!==a&&"closed"!==a)return n.error="'state' must have the value 'open' or 'closed' for column at index ".concat(t),n;if("string"!==typeof o&&null!==o)return n.error="'label' must be a string or null for column at index ".concat(t),n;if("string"===typeof o&&0===o.length)return n.error="'label' is the empty string for column at index ".concat(t),n}return n.ok=!0,n.error="",n}(r)).ok?n.props.onConfig(t,r):alert("".concat(a.error))}).catch(function(e){return alert(e)})}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("label",null,"Configuration:",c.a.createElement("input",{type:"text",value:this.configUrl,onChange:this.handleChange})),c.a.createElement("input",{type:"button",value:"Configure",onClick:this.handleSubmit}))}}]),n}(c.a.Component);var R=function(e){return null===e.url?"unknown":c.a.createElement("img",{src:e.url,alt:"",className:"avatar"})};var N=function(e){return c.a.createElement("div",{className:"card"},c.a.createElement("div",{className:"cardHeader"},c.a.createElement("div",{className:"cardNumber"},e.number),c.a.createElement("div",{className:"cardRepository"},e.repository),c.a.createElement("div",{className:"cardAssignee"},c.a.createElement(R,{url:e.avatarUrl}))),c.a.createElement("div",{className:"cardBody"},c.a.createElement("div",{className:"cardTitle"},e.title)),c.a.createElement("div",{className:"cardFooter"},c.a.createElement("div",{className:"cardLabels"},e.labels.edges.map(function(e){var n=e.node,t={padding:"2px",marginLeft:"5px",backgroundColor:"#"+n.color,borderRadius:"5px",height:"20px"};return c.a.createElement("div",{key:n.id,style:t},n.name)})),c.a.createElement("div",{className:"cardURL"},c.a.createElement("a",{href:e.url},"github"))),c.a.createElement("div",{className:"cardConnectedPRs"},null===(n=e.connectedPRs)?null:n.map(function(e){return"undefined"===typeof e.repository?null:c.a.createElement("div",{key:e.id,className:"connectedPR"},c.a.createElement("div",{className:"connectedPRNumber"},e.number),c.a.createElement("div",{className:"connectedPRName"},e.repository.nameWithOwner),c.a.createElement("div",{className:"connectedPRURL"},c.a.createElement("a",{href:e.url},"github")))})));var n};var k=function(e){var n=e.issues.concat(e.pullRequests);return(n=n.filter(function(e){return null!=e})).sort(function(e,n){return new Date(n.createdAt)-new Date(e.createdAt)}),c.a.createElement("div",{className:"column"},c.a.createElement("h2",null,e.name),c.a.createElement("div",{className:"columnCards"},n.map(function(e){var n=null;"undefined"!==typeof e.assignees&&e.assignees.edges.length>0&&(n=e.assignees.edges[0].node.avatarUrl);var t=null;return"undefined"!==typeof e.timelineItems&&(t=e.timelineItems.edges.map(function(e){return e.node.source})),c.a.createElement(N,{key:e.id,avatarUrl:n,connectedPRs:t,number:e.number,labels:e.labels,repository:e.repository.nameWithOwner,title:e.title,url:e.url})})))},C=t(34),O=t.n(C);function w(){var e=Object(y.a)(["\n    query GetIssuesMultiRepo {\n      ","\n    }\n    fragment IssueWithoutRef on Issue {\n      assignees(last:1) {\n        edges {\n          node {\n            avatarUrl\n          }\n        }\n      }\n      createdAt\n      closed\n      id\n      labels(first:10) {\n        edges {\n          node {\n            color\n            id\n            name\n          }\n        }\n      }\n      number\n      repository {\n        nameWithOwner\n      }\n      title\n      url\n    }\n    fragment PullRequestWithoutRef on PullRequest {\n      closed\n      createdAt\n      id\n      labels(first:10) {\n        edges {\n          node {\n            color\n            id\n            name\n          }\n        }\n      }\n      number\n      repository {\n        nameWithOwner\n      }\n      title\n      url\n    }\n  "]);return w=function(){return e},e}function j(e,n){return"\n    ".concat(this.repos[n].name,": repository(owner:").concat(this.repos[n].owner,", name:").concat(this.repos[n].name,") {\n      issues(last:20) {\n        edges {\n          node {\n            ...IssueWithoutRef\n            timelineItems(last:20, itemTypes:CROSS_REFERENCED_EVENT) {\n              edges {\n                node {\n                  ... on CrossReferencedEvent {\n                    source {\n                      ... on PullRequest {\n                        ...PullRequestWithoutRef\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n      pullRequests(last:20, states:OPEN) {\n        edges {\n          node {\n            ...PullRequestWithoutRef\n          }\n        }\n      }\n    }\n  ")}function q(e,n){for(var t=0;t<e.labels.edges.length;++t){if(n===e.labels.edges[t].node.name)return!0}return!1}function x(e){if("open"===this.column.state&&e.closed)return!1;if(null===this.column.label){for(var n in this.column.label)if(q(e,n))return!1;return!0}return q(e,this.column.label)}var P=function(e){function n(e){var t;return Object(f.a)(this,n),(t=Object(g.a)(this,Object(p.a)(n).call(this,e))).state={repos:[],columns:[],query:null},t.updateConfig=t.updateConfig.bind(Object(v.a)(t)),t}return Object(b.a)(n,e),Object(h.a)(n,[{key:"updateConfig",value:function(e,n){var t=this.state.repos,r=this.state.columns,a=this.state.query;null!==e&&(t=e,a=function(e){return O()(w(),Array(e.length).fill().map(j,{repos:e}).join(" "))}(e)),null!==n&&(r=n),this.setState({repos:t,columns:r,query:a})}},{key:"updateColumns",value:function(){var e=this;return null===this.state.query?null:c.a.createElement(o.b,{query:this.state.query},function(n){var t=n.loading,r=n.error,a=n.data;if(t)return"Loading...";if(r)return"Error: ".concat(r.message);for(var o=e.state.repos,l=e.state.columns,s={},i={},u=0;u<o.length;++u){for(var d=0;d<a[o[u].name].issues.edges.length;++d){var m=a[o[u].name].issues.edges[d].node;s[m.id]=m}for(var f=0;f<a[o[u].name].pullRequests.edges.length;++f){var h=a[o[u].name].pullRequests.edges[f].node;i[h.id]=h}}for(var g in s)for(var p=s[g],v=0;v<p.timelineItems.edges.length;++v){var b=p.timelineItems.edges[v].node.source.id;b in i&&delete i[b]}for(var y={},E=0;E<l.length;++E){var R=l[E];null!==R.label&&(R.label in y&&console.warn("The label ".concat(R.label," is used more than once")),y[R.label]=!0)}var N=e.state.columns.map(function(e,n){return c.a.createElement(k,{key:n.toString(),name:e.name,issues:Object.values(s).filter(x,{labels:y,column:e}),pullRequests:Object.values(i).filter(x,{labels:y,column:e})})});return c.a.createElement("div",{className:"board"},N)})}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement(E,{onConfig:this.updateConfig}),this.updateColumns())}}]),n}(c.a.Component);t(56);localStorage.setItem("token","04619dfbf08b43723a3430e99d0b5eb3979aace4");var I=Object(l.a)({uri:"https://api.github.com/graphql"}),U=Object(s.a)(function(e,n){var t=n.headers,a=localStorage.getItem("token");return{headers:Object(r.a)({},t,{authorization:a?"Bearer ".concat(a):""})}}),S=new a.c({link:U.concat(I),cache:new i.a});m.a.render(c.a.createElement("div",null,c.a.createElement(o.a,{client:S},c.a.createElement(P,{apolloClient:S}))),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.93c5a9bf.chunk.js.map