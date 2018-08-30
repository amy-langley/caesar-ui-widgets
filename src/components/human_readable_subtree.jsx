import React from 'react';
import PropTypes from 'prop-types';

const comparisonHtml = {
  lte: '&le;',
  gte: '&ge;',
  gt: '&gt;',
  lt: '&lt;',
  eq: '=',
};

function HumanReadableSubtree(props) {
  const { zipper } = props;

  if (
    !zipper.item
    || zipper.item.value === null
    || zipper.item.value === undefined
  ) {
    return (
      <span>
        [Empty]
      </span>
    );
  }

  switch (zipper.item.value) {
    case 'not':
      return (
        <span>
          not&nbsp;
          <HumanReadableSubtree zipper={zipper.childAt(0)} />
        </span>
      );
    case 'upcase':
    case 'downcase':
    case 'int':
    case 'float':
      return (
        <span>
          <HumanReadableSubtree zipper={zipper.childAt(0)} />
          &nbsp;as&nbsp;
          { zipper.item.value }
        </span>
      );
    case 'lookup':
      return (
        <span>
          lookup&nbsp;
          <HumanReadableSubtree zipper={zipper.childAt(0)} />
          &nbsp;(default&nbsp;
          <HumanReadableSubtree zipper={zipper.childAt(1)} />
          )
        </span>
      );
    case 'or':
    case 'and':
      return (
        <span>
          <HumanReadableSubtree zipper={zipper.childAt(0)} />
          &nbsp;
          { zipper.item.value }
          &nbsp;
          <HumanReadableSubtree zipper={zipper.childAt(1)} />
        </span>
      );
    case 'lte':
    case 'gte':
    case 'gt':
    case 'lt':
    case 'eq':
      return (
        <span>
          <HumanReadableSubtree zipper={zipper.childAt(0)} />
          &nbsp;
          <span dangerouslySetInnerHTML={{ __html: comparisonHtml[zipper.item.value] }} />
          &nbsp;
          <HumanReadableSubtree zipper={zipper.childAt(1)} />
        </span>
      );
    case 'const':
      return (
        <span>
          const
          &nbsp;
          <HumanReadableSubtree zipper={zipper.childAt(0)} />
        </span>
      );
    default:
      break;
  }

  return (
    <span>
      { JSON.stringify(zipper.to_a(), null, '  ')}
    </span>
  );
}

HumanReadableSubtree.propTypes = {
  zipper: PropTypes.shape({
    item: PropTypes.object.isRequired,
    childAt: PropTypes.func.isRequired,
  }).isRequired,
};

export default HumanReadableSubtree;
