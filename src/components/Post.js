import React, { Component } from "react";
import Moment from "react-moment";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Form,
  Input,
  Collapse,
  FormFeedback
} from "reactstrap";

import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

class Post extends Component {
  state = {
    collapse: false,
    newCommentValue: "",
    formError: "",
    valid: false,
    inValid: false
  };

  //////////////    fetch comments    //////////////////
  componentDidMount = () => {
    this.props.getPostComments();
  };

  ////////////////   show comments   /////////////////
  toggle = () => {
    this.setState(prevState => {
      return {
        collapse: !prevState.collapse
      };
    });
  };
  ///////////////  post a comment    ///////////////

  handleChange = e => {
    e.preventDefault();

    if (e.target.value.length === 0) {
      this.setState({
        newCommentValue: e.target.value,
        valid: false,
        inValid: false
      });
    } else {
      this.setState({
        newCommentValue: e.target.value,
        valid: true,
        inValid: false
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.newCommentValue) {
      let formError = { ...this.state.formError };
      formError = !this.state.newCommentValue
        ? "minimum 1 character required"
        : "";
      this.setState({
        valid: false,
        inValid: true,
        formError
      });
    } else {
      this.setState({
        valid: false,
        inValid: false,
        newCommentValue: ""
      });
      this.props.addComment(this.state.newCommentValue, this.props.postId);
    }
  };

  handleUpVote = () => {
    this.props.getUpVote(this.props.postId);
  };

  handleDownVote = () => {
    if (this.props.votes > 0) {
      this.props.getDownVote(this.props.postId);
    }
  };

  render() {
    const {
      error,
      loading,
      postFailure,
      posting,
      comments,
      postId
    } = this.props;

    const postComments = comments.filter(comment => comment.post_id === postId);
    return (
      <Row className="mt-3">
        <Col style={{ display: "flex" }}>
          <Card className="card-lux">
            <CardBody>
              Posted by {this.props.author}
              <br />
              <Moment style={{ color: "#343a40", fontSize: "0.8em" }} fromNow>
                {this.props.createdAt}
              </Moment>
            </CardBody>
            <CardImg
              top
              width="100%"
              src={this.props.img_url}
              alt="Card image"
            />
            <CardBody style={{ backgroundColor: "#f9f9f9" }}>
              <CardTitle style={{ fontWeight: "500", fontSize: "1.2em" }}>
                {this.props.title}
              </CardTitle>
              <CardText style={{ fontWeight: "300", fontSize: "0.9em" }}>
                {this.props.content}
              </CardText>
              <hr />
              <Button
                onClick={this.toggle}
                className="lux"
                style={{ width: "50%" }}
                color="light"
              >
                <FaComment /> {postComments.length} {postComments.length === 1 ? 'Comment' : 'Comments' }
              </Button>
              <span style={{ marginLeft: "10%" }}>
                <span style={{ marginRight: "2%" }}>
                  {" "}
                  Votes {this.props.votes >= 0 ? this.props.votes : 0}
                </span>
                <Button
                  onClick={this.handleUpVote}
                  className="lux"
                  style={{ width: "10%" }}
                  color="dark"
                  outline
                >
                  <FaArrowUp />
                </Button>
                <Button
                  onClick={this.handleDownVote}
                  className="lux"
                  style={{ width: "10%" }}
                  color="dark"
                  outline
                >
                  <FaArrowDown />
                </Button>
              </span>
              <Collapse isOpen={this.state.collapse} id="commentContainer">
                <hr />
                <Form
                  style={{ marginTop: "1em" }}
                  onSubmit={this.handleSubmit}
                  noValidate
                >
                  <div style={{ width: "100%", display: "flex" }}>
                    <span style={{ width: "72.5%" }}>
                      <Input
                        type="text"
                        name="comment"
                        id="commentInput"
                        placeholder="Enter a comment here..."
                        value={this.state.newCommentValue}
                        onChange={this.handleChange}
                        className="lux-control"
                        valid={this.state.valid}
                        invalid={this.state.inValid}
                        required
                      />
                      <FormFeedback style={{ marginLeft: "1em" }}>
                        {this.state.formError}
                      </FormFeedback>
                    </span>
                    <span style={{ marginLeft: "7.5%", width: "20%" }}>
                      <Button
                        type="submit"
                        className="lux"
                        color="dark"
                        outline
                      >
                        Submit
                      </Button>
                    </span>
                  </div>

                  {postFailure && (
                    <div>
                      {console.log(error)}
                      <img
                        src="https://thumbs.gfycat.com/BewitchedShamefulDobermanpinscher-max-1mb.gif"
                        alt="error animated gif"
                        style={{ width: "50px" }}
                      />
                    </div>
                  )}
                  {posting && (
                    <div>
                      <img
                        src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif"
                        alt="loading spinner"
                        style={{ width: "10px" }}
                      />
                    </div>
                  )}
                </Form>
                <ul className="mt-2">
                  {error && (
                    <div>
                      {console.log(error)}
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
                  {postComments.length > 0 && (
                    <div>
                      {postComments.reverse().map(comment => {
                        return <><div key={comment.id}>{comment.content}</div> <hr style={{backgroundColor: 'rgba(52, 58, 64, 0.2)'}}/></>;
                      })}
                    </div>
                  )}
                </ul>
              </Collapse>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default Post;

