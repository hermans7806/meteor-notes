import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export class NoteList extends React.Component {
  handleSearchChange(e) {
    Session.set('searchText', e.target.value);
  }
  render() {
    return (
      <div className="item-list">
        <NoteListHeader/>
        <input className="item-list__search" type="text" placeholder="Search for title" onChange={ this.handleSearchChange.bind(this) }/>
        { this.props.notes.length === 0 ? <NoteListEmptyItem/> : undefined }
        { this.props.notes.map((note) => <NoteListItem key={note._id} note={note}/>) }
      </div>
    );
  }
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');
  const search = Session.get('searchText') ? Session.get('searchText')+'*' : '';

  return {
    notes: Notes.find({title:{$regex: search}}, { sort: { updatedAt: -1 } }).fetch().map((note) => {
      return {
        ...note,
        selected: (note._id === selectedNoteId ? true : false)
      };
    })
  };
}, NoteList);
