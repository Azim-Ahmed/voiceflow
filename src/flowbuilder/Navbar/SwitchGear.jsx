const SwitchGear = ({ isOn, handleToggle, loading }) => {
  return (
    <input
      type="checkbox"
      checked={isOn}
      onChange={handleToggle}
      loading={loading}
    />
  );
};

export default SwitchGear;
