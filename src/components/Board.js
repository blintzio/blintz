import React from 'react';

import Column from "./Column";

import gql from "graphql-tag";
import { Query } from "react-apollo";

const OWNER = 'ros2';
const REPOS = [
  'rcl',
  'rcl_interfaces',
  'rclpy'
];

function repo_query(anon, i) {
  return `
    ${this.repos[i]}: repository(owner:${OWNER}, name: ${this.repos[i]}) {
      issues(last:100) {
        edges {
          node {
            ...IssueWithoutRef
            timelineItems(last:100, itemTypes:CROSS_REFERENCED_EVENT) {
              edges {
                node {
                  ... on CrossReferencedEvent {
                    source {
                      ... on PullRequest {
                        ...PullRequestWithoutRef
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      pullRequests(last:100, states:OPEN) {
        edges {
          node {
            ...PullRequestWithoutRef
          }
        }
      }
    }
  `;
}

const GET_ISSUES_MULTI_REPO = gql`
  query GetIssuesMultiRepo {
    ${Array(REPOS.length).fill().map(repo_query, {repos: REPOS}).join(' ')}
  }
  fragment IssueWithoutRef on Issue {
    closed
    id
    labels(first:10) {
      edges {
        node {
          color
          id
          name
        }
      }
    }
    number
    repository {
      nameWithOwner
    }
    title
    url
  }
  fragment PullRequestWithoutRef on PullRequest {
    closed
    id
    labels(first:10) {
      edges {
        node {
          color
          id
          name
        }
      }
    }
    number
    repository {
      nameWithOwner
    }
    title
    url
  }
`;

function hasLabel(issue, label) {
  for (let i = 0; i < issue.labels.edges.length; ++i) {
    let edge = issue.labels.edges[i];
    if (label === edge.node.name) {
      return true;
    }
  }
  return false;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inbox: [],
      progress: [],
      review: [],
      done: [],
    };
  }

  updateColumns() {
    return (
       <Query query={GET_ISSUES_MULTI_REPO}>
         {({loading, error, data}) => {
           if (loading) return "Loading...";
           if (error) return `Error: ${error.message}`;

           let allIssues = {};
           let allPullRequests = {};
           for (let i = 0; i < REPOS.length; ++i) {
             for (let j = 0; j < data[REPOS[i]].issues.edges.length; ++j) {
               let issue = data[REPOS[i]].issues.edges[j];
               allIssues[issue.node.id] = issue;
             }
             for (let j = 0; j < data[REPOS[i]].pullRequests.edges.length; ++j) {
               let pullRequest = data[REPOS[i]].pullRequests.edges[j];
               allPullRequests[pullRequest.node.id] = pullRequest;
             }
           }

           // Filter out PRs that are "connected" to at least one issue
           for (let issueID in allIssues) {
             let issue = allIssues[issueID].node;
             for (let i = 0; i < issue.timelineItems.edges.length; ++i) {
               let pullRequestId = issue.timelineItems.edges[i].node.source.id;
               if (pullRequestId in allPullRequests) {
                 delete allPullRequests[pullRequestId];
               }
             }
           }

           return (
             <div className="board">
               <Column key="0" name="Inbox"
                 issues={
                   Object.values(allIssues).filter(issue => {
                     return (
                       !issue.node.closed &&
                       !hasLabel(issue.node, 'in progress') &&
                       !hasLabel(issue.node, 'in review'));
                   })
                 }
                 pullRequests={
                   Object.values(allPullRequests).filter(pr => {
                     return (
                       !pr.node.closed &&
                       !hasLabel(pr.node, 'in progress') &&
                       !hasLabel(pr.node, 'in review'));
                   })
                 }
               />
               <Column key="1" name="In progress"
                 issues={
                   Object.values(allIssues).filter(issue => {
                     return !issue.node.closed && hasLabel(issue.node, 'in progress');
                   })
                 }
                 pullRequests={
                   Object.values(allPullRequests).filter(pr => {
                     return !pr.node.closed && hasLabel(pr.node, 'in progress');
                   })
                 }
               />
               <Column key="2" name="In review"
                 issues={
                   Object.values(allIssues).filter(issue => {
                     return !issue.node.closed && hasLabel(issue.node, 'in review');
                   })
                 }
                 pullRequests={
                   Object.values(allPullRequests).filter(pr => {
                     return !pr.node.closed && hasLabel(pr.node, 'in review');
                   })
                 }
               />
               <Column key="3" name="Done" issues={
                 Object.values(allIssues).filter(issue => issue.node.closed)
               } />
             </div>
           );
         }}
       </Query>
    );
  }

  render() {
    return (
      <div>
        {this.updateColumns()}
      </div>
    );
  }
}

export default Board;
