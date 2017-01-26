import * as React from 'react';

export let CheckBox = props => {
  let { id, label, checked, onClick } = props;

  return (
    <div id={`${id}-container`}>
      <input
        id={`${id}`}
        type="checkbox"
        onClick={onClick}
        checked={checked}
      />
      <label htmlFor={`${id}`}>{ label }</label>
    </div>
  );
};

CheckBox.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

CheckBox.defaultProps = {
  onClick: () => {},
  checked: false,
  label: '',
};
