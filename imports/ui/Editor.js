import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      isOpen: false
    }
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('notes.update', this.props.note._id, { title });
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', this.props.note._id, { body });
  }
  handleRemoval() {
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.push('/dashboard');
    this.handleModalClose();
  }
  handleModalClose() {
    this.setState({
      isOpen: false
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      })
    }
  }
  render() {
    if (this.props.note) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.title} placeholder="Untitled Note" onChange={ this.handleTitleChange.bind(this) }/>
          <textarea className="editor__body" value={this.state.body} placeholder="Your note here" onChange={ this.handleBodyChange.bind(this) }></textarea>
          <div>
            <button className="button button--secondary" onClick={() => this.setState({isOpen: true})}>Delete Note</button>
            <Modal
              isOpen={this.state.isOpen}
              contentLabel="Delete Note"
              onRequestClose={this.handleModalClose.bind(this)}
              className="boxed-view__box"
              overlayClassName="boxed-view boxed-view--modal">
              <h1>Delete Note</h1>
              <p>Are you sure want to delete this note?</p>
              <button className="button" onClick={this.handleRemoval.bind(this)}>OK</button>
              <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
            </Modal>
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            { this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}
          </p>
        </div>
      );
    }
  }
};

Editor.propTypes = {
  selectedNoteId: PropTypes.string,
  note: PropTypes.object,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
