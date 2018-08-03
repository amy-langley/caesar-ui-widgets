/* eslint-disable */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Zipper } from '../lib/zipper';

import TestComponent from './test_component';
import ConditionBuilder from '../components/condition_builder';
import ConditionViewer from '../components/condition_viewer';
import HumanReadableSubtree from '../components/human_readable_subtree';

storiesOf('TestComponent', module).add('test', () => <TestComponent />);

storiesOf('ConditionBuilder', module).add('default', () => <ConditionBuilder />);

storiesOf('ConditionViewer', module).add('empty', () => <ConditionViewer zipper={Zipper.from_a([])} />);
storiesOf('ConditionViewer', module).add('simple', () => <ConditionViewer zipper={Zipper.from_a(["gte", ["const", 4], ["const", 3]])} /> )
storiesOf('ConditionViewer', module).add('nested', () => <ConditionViewer zipper={Zipper.from_a(["or", ["gte", ["const", 4], ["const", 3]], ["eq", ["lookup", "c.val", 0], ["const", 2]]])} /> )
storiesOf('ConditionViewer', module).add('with hole', () => <ConditionViewer zipper={Zipper.from_a(["or", null, ["gte", null, ["const", 3]]])} /> )

storiesOf('HumanReadableSubtree', module).add('empty', () => <HumanReadableSubtree zipper={Zipper.from_a([])} /> )
storiesOf('HumanReadableSubtree', module).add('simple', () => <HumanReadableSubtree zipper={Zipper.from_a(["not", ["gte", ["const", 4], ["const", 3]]])} /> )
storiesOf('HumanReadableSubtree', module).add('nested', () => <HumanReadableSubtree zipper={Zipper.from_a(["or", ["gte", ["const", 4], ["const", 3]], ["eq", ["lookup", "c.val", 0], ["int", ["const", 2]]]])} /> )