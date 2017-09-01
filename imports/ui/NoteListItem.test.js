import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import moment from 'moment';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function () {

    it('should render title and timestamp', function () {
      const title = 'My Title Here';
      const updatedAt = 1504228182868;
      const wrapper = mount( <NoteListItem note={{ title, updatedAt }}/> );

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe(moment(updatedAt).format('M/DD/YY'));
    });

    it('should set default title if no title set', function () {
      const title = '';
      const updatedAt = 1504228182868;
      const wrapper = mount( <NoteListItem note={{ title, updatedAt }}/> );

      expect(wrapper.find('h5').text()).toBe('Untitled Note');
    });

  });
}
