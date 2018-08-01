/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import TestComponent from './test_component';
import ConditionBuilder from '../components/condition_builder';
import ConditionViewer from '../components/condition_viewer';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
storiesOf('TestComponent', module).add('test', () => <TestComponent />);
storiesOf('ConditionBuilder', module).add('default', () => <ConditionBuilder />);
storiesOf('ConditionViewer', module).add('empty', () => <ConditionViewer condition={[]} />);
storiesOf('ConditionViewer', module).add('simple', () => <ConditionViewer condition={["gte", ["const", 4], ["const", 3]]} /> )
storiesOf('ConditionViewer', module).add('nested', () => <ConditionViewer condition={["or", ["gte", ["const", 4], ["const", 3]], ["eq", ["lookup", "c.val", 0], ["const", 2]]]} /> )

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
