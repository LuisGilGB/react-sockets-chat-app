const OutgoingMessage = ({ content }) => {
  return (
    <>
      <div className="outgoing_msg">
        <div className="sent_msg">
          <p>{content}</p>
          <span className="time_date"> 11:01 AM | June 9</span>
        </div>
      </div>
    </>
  );
};

export default OutgoingMessage;
