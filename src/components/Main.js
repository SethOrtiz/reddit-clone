import React, { Component } from "react";
import FormContainer from "../redux/containers/FormContainer";
import { Container, Row, Col } from "reactstrap";
import CommentContainer from "../redux/containers/CommentContainer";
import FilterPosts from "./FilterPosts";
class Main extends Component {
  componentDidMount = () => {
    this.props.getPosts();
  };

  render() {
    const { error, loading, posts } = this.props;
    return (
      <Container>
        <Row>
          <Col lg="8">
            <Container>
              <div>
                {error && (
                  <div>
                    <img
                      src="https://thumbs.gfycat.com/BewitchedShamefulDobermanpinscher-max-1mb.gif"
                      alt="error animated gif"
                      style={{ width: "256px" }}
                    />
                  </div>
                )}
                {loading && (
                  <div>
                    <img
                      src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif"
                      alt="loading spinner"
                      style={{ width: "256px" }}
                    />
                  </div>
                )}
                {posts.length > 0 && (
                  <div>
                    {posts.map(post => {
                      return (
                        <CommentContainer
                          key={post.id}
                          {...post}
                          postId={post.id}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </Container>
          </Col>
          <Col lg="4">
            <Container className="mt-3 card-lux ">
              <FilterPosts />
              <FormContainer />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
