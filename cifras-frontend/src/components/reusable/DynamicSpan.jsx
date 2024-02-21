const DynamicSpan = ({ name }) => {
  return (
    <span style={{ marginLeft: 16, fontSize: '1rem', color: '#333', border: '1px solid red' }}>{name}</span>
  );
};

export default DynamicSpan;