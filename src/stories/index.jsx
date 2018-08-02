/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import TestComponent from './test_component';
import ConditionBuilder from '../components/condition_builder';
import ConditionViewer from '../components/condition_viewer';

storiesOf('TestComponent', module).add('test', () => <TestComponent />);
storiesOf('ConditionBuilder', module).add('default', () => <ConditionBuilder />);
storiesOf('ConditionViewer', module).add('empty', () => <ConditionViewer condition={[]} />);
storiesOf('ConditionViewer', module).add('simple', () => <ConditionViewer condition={["gte", ["const", 4], ["const", 3]]} /> )
storiesOf('ConditionViewer', module).add('nested', () => <ConditionViewer condition={["or", ["gte", ["const", 4], ["const", 3]], ["eq", ["lookup", "c.val", 0], ["const", 2]]]} /> )
storiesOf('ConditionViewer', module).add('with hole', () => <ConditionViewer condition={["or", null, ["gte", null, ["const", 3]]]} /> )