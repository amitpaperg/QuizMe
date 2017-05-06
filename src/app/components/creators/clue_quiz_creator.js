import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from '../../utils/firebase';


import { fetchUser, updateUser, createClueQuiz } from '../../actions/firebase_actions';
import Loading from '../helpers/loading';

class ClueQuizCreator extends Component {

    constructor(props) {
        super(props);
        this.props.fetchUser();
        this.state = {
            message: '',
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        const user = this.props.currentUser;
        const answer = this.refs.answer.value;
        const wiki = this.refs.wiki.value;
        this.props.createClueQuiz(user.email, answer, wiki).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                this.setState({
                    message: 'Updated successfuly!',
                });
            }
        }
    );
    }

    render() {
        if (!this.props.currentUser) {
            return <Loading />;
        }

        return (
            <div className="col-md-6">
                <form id="frmClueQuiz" role="form" onSubmit={this.onFormSubmit}>
                    <h2>Create a Quiz - Guess Answer Based on Clues</h2>
                    <p>{this.state.message}</p>
                    <br />
                    <div className="form-group">
                        <label htmlFor="answer">Answer: </label>
                        <input
                          type="text"
                          className="form-control" id="answer" ref="answer" placeholder="Answer" name="answer"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="wiki">Wikipedia Page: </label>
                        <input
                          type="url"
                          className="form-control" ref="wiki" id="wiki" placeholder="Wkipedia Page for the Answer"
                          name="wiki"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        );
    }

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser, updateUser, createClueQuiz }, dispatch);
}


function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}


export default connect(mapStateToProps, mapDispatchToProps)(ClueQuizCreator);
