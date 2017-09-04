import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export class NoteListHeader extends React.Component {
  onClick(e) {
    this.props.meteorCall('notes.insert');
  }
  render() {
    return (
      <div>
        <button onClick={this.onClick.bind(this)}>Create Note</button>
      </div>
    );
  }
};

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, NoteListHeader);
