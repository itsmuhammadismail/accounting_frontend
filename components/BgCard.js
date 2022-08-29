const BgCard = ({ children, className }) => {
  return (
    <div className={`mx-[2rem] bg-white rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default BgCard;
