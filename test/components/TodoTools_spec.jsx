import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoTools from '../../src/components/TodoTools';
import { expect } from 'chai';

const {
  renderIntoDocument,
  Simulate,
  scryRenderedDOMComponentsWithTag,
} = TestUtils;

describe('TodoTools', () => {
  it('displays the number of items left', () => {
    const nbItems = 3;
    const component = renderIntoDocument(
      <TodoTools nbActiveItems={nbItems} />
    );
    const tools = scryRenderedDOMComponentsWithTag(component, 'footer');
    expect(tools[0].textContent).to.contain(3);
  });

  it('highlights the active filter', () => {
    const filter = 'completed';
    const component = renderIntoDocument(
      <TodoTools filter={filter} />
    );
    const filters = scryRenderedDOMComponentsWithTag(component, 'a');
    expect(filters[0].classList.contains('selected')).to.equal(false);
    expect(filters[1].classList.contains('selected')).to.equal(false);
    expect(filters[2].classList.contains('selected')).to.equal(true);
  });

  it('calls a callback when the user clicks on Clear Completed buttons', () => {
    let cleared = false;
    const clearCompleted = () => (cleared = true);
    const component = renderIntoDocument(
        <TodoTools clearCompleted={clearCompleted} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(cleared).to.equal(true);
  });
});
