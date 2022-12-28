import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { LOGGER, resizeTabbableContainer } from '../../../utils/base';
import { API } from '../../../utils/services';
import { Index as PostItem } from '../MainMenu/Home/news/post';
import $ from 'jquery';

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  componentDidMount() {
    resizeTabbableContainer();
    this.getPostById();
  }

  getPostById = () => {
    const id = this.props.match.params.id;
    LOGGER.log((TAG) => console.log(TAG, id));
    API.POSTS.getPostsById(id)
      .then(({ status, error, data }) => {
        if (status) {
          this.setState({ post: data });
        } else LOGGER.log((TAG) => console.log(TAG, error));
      })
      .catch(({ error }) => {
        LOGGER.log((TAG) => console.log(TAG, error));
      });
  };

  render() {
    const { post } = this.state;
    const { showHead } = this.props;
    return (
      <div className="tabbable-container">
        {typeof showHead === 'undefined' && (
          <div className="cont-header">
            <div ref={this.tabMenu} className="menu">
              <NavLink
                className="li on"
                to={`${
                  this.props.match.url ? this.props.match.url : this.props.match
                }`}
              >
                Post details
              </NavLink>
            </div>
            <span className="ln" />
          </div>
        )}
        <div className="cont-body">
          <div className="lf-col">
            <div className="newsFeed">
              <div className="newsList">
                {!$.isEmptyObject(post) && (
                  <PostItem
                    key={post.feed_id}
                    post={post}
                    referenceUsers={[]}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
